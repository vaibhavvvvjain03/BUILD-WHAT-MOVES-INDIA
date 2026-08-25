/**
 * VANI Service Navigator
 *
 * A small, dependency-free intent matcher for the Parivahan service catalogue.
 * It is deliberately deterministic: its phrases and weights can be reviewed,
 * adjusted, and translated without requiring a model runtime.
 */

export interface ServiceMatchResult {
  matchedService: string | null;
  confidence: "high" | "medium" | "low";
  explanation: string;
  clarifyingQuestion?: string;
  alternativeMatches?: string[];
  /** Additional independently actionable intents found in the same message. */
  secondaryMatches?: string[];
}

export const PARIVAHAN_SERVICES = [
  "dl-renewal",
  "driving-licence",
  "duplicate-dl",
  "change-address-dl",
  "new-vehicle-registration",
  "transfer-ownership",
  "duplicate-rc",
  "pay-challan",
  "road-tax",
  "national-permit",
  "fancy-number",
  "international-driving-permit",
  "change-address-rc",
  "noc",
  "track-application",
] as const;

export type ParivahanService = (typeof PARIVAHAN_SERVICES)[number];

type IntentRule = {
  service: ParivahanService;
  phrases: string[];
  keywords: string[];
  explanation: string;
};

const LICENCE = "(?:licen[cs]e|dl|driving\\s+licen[cs]e)";
const VEHICLE = "(?:car|bike|vehicle|motorcycle|scooter|auto|four\\s*wheeler|two\\s*wheeler)";

const RULES: IntentRule[] = [
  {
    service: "transfer-ownership",
    phrases: [
      "second hand", "second-hand", "used car", "used bike", "transfer ownership",
      "ownership transfer", "change ownership", "vehicle in my name", "car in my name",
      "bike in my name", "bought a car", "bought a bike", "sold my car", "sold my bike",
      "gaadi transfer karna hai", "gadi transfer karna hai", "gaadi naam transfer",
    ],
    keywords: ["transfer", "ownership", "owner", "bought", "sold", "purchase", "name"],
    explanation: "You described a vehicle changing hands or needing to be put in a different owner's name",
  },
  {
    service: "dl-renewal",
    phrases: [
      "licence expired", "license expired", "renew my licence", "renew my license",
      "dl expired", "driving licence renewal", "driving license renewal", "licence renewal",
      "license renewal", "want my licence renewed", "want my license renewed", "expiry date",
      "license expire ho gaya", "licence expire ho gaya", "license expire ho gaya hai",
      "licence expire ho gaya hai", "mera license expire", "mera licence expire",
    ],
    keywords: ["renew", "renewal", "expired", "expiry", "expire"],
    explanation: "You mentioned renewing or an expired driving licence",
  },
  {
    service: "duplicate-dl",
    phrases: [
      "lost my licence", "lost my license", "licence lost", "license lost", "duplicate licence",
      "duplicate license", "stolen licence", "stolen license", "licence damaged", "license damaged",
    ],
    keywords: ["lost", "stolen", "duplicate", "damaged", "missing"],
    explanation: "You indicated that your driving licence is lost, stolen, missing, or damaged",
  },
  {
    service: "change-address-dl",
    phrases: [
      "change address", "address change", "moved to a new house", "moved house", "new address",
      "update my address", "shifted house", "shifted to", "relocated",
    ],
    keywords: ["address", "moved", "shifted", "relocated"],
    explanation: "You mentioned moving or updating your address",
  },
  {
    service: "change-address-rc",
    phrases: [],
    keywords: [],
    explanation: "You mentioned moving or updating your address for your vehicle",
  },
  {
    service: "new-vehicle-registration",
    phrases: [
      "new vehicle registration", "register my new car", "register my new bike", "first registration",
      "new car registration", "new bike registration", "number plate for new vehicle",
    ],
    keywords: ["register", "registration", "new car", "new bike", "number plate"],
    explanation: "You appear to need the first registration for a newly purchased vehicle",
  },
  {
    service: "duplicate-rc",
    phrases: [
      "lost rc", "duplicate rc", "rc lost", "registration certificate lost", "lost registration certificate",
      "stolen rc", "rc damaged", "duplicate registration certificate", "another rc",
    ],
    keywords: ["rc", "registration certificate", "duplicate", "lost", "stolen", "damaged"],
    explanation: "You indicated that the vehicle's Registration Certificate (RC) needs to be replaced",
  },
  {
    service: "pay-challan",
    phrases: [
      "pay challan", "pay a challan", "need to pay a challan", "traffic challan", "traffic fine", "pay a fine", "pay fine", "e challan",
      "e-challan", "challan payment", "police fine",
    ],
    keywords: ["challan", "fine", "penalty", "traffic"],
    explanation: "You mentioned a traffic fine or challan payment",
  },
  {
    service: "road-tax",
    phrases: ["road tax", "vehicle tax", "pay tax for my vehicle", "motor vehicle tax", "tax payment"],
    keywords: ["tax", "road", "vehicle"],
    explanation: "You mentioned paying a tax for your vehicle",
  },
  {
    service: "national-permit",
    phrases: [
      "national permit", "state permit", "commercial permit", "goods permit", "tourist permit",
      "transport permit", "permit for truck", "permit for taxi",
    ],
    keywords: ["permit", "commercial", "goods", "transport", "taxi", "truck"],
    explanation: "You mentioned a vehicle permit, including national, state, or commercial transport permits",
  },
  {
    service: "fancy-number",
    phrases: ["fancy number", "choice number", "vip number", "special number plate", "lucky number plate"],
    keywords: ["fancy", "choice", "vip", "lucky", "number"],
    explanation: "You asked for a preferred or special vehicle registration number",
  },
  {
    service: "international-driving-permit",
    phrases: [
      "international driving permit", "international licence", "international license", "drive abroad",
      "drive in germany", "drive in usa", "drive in uk", "drive overseas", "foreign country driving",
    ],
    keywords: ["international", "abroad", "overseas", "foreign", "germany", "usa", "uk"],
    explanation: "You mentioned driving outside India, which requires an International Driving Permit",
  },
  {
    service: "driving-licence",
    phrases: [
      "new driving licence", "new driving license", "apply for licence", "apply for license",
      "first driving licence", "first driving license", "get my licence", "get my license",
    ],
    keywords: ["apply", "new", "first", "licence", "license", "dl"],
    explanation: "You appear to be applying for a driving licence for the first time",
  },
  {
    service: "noc",
    phrases: [
      "noc for my vehicle", "no objection certificate", "get an noc", "apply for noc",
    ],
    keywords: ["noc", "objection", "certificate"],
    explanation: "You indicated that you need a No Objection Certificate (NOC) for your vehicle",
  },
  {
    service: "track-application",
    phrases: [
      "where is my application", "track my application", "application status", "check status",
    ],
    keywords: ["track", "status", "application"],
    explanation: "You asked to check the status of a submitted application",
  },
];

function normalise(input: string): string {
  const cleaned = input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const corrections: Record<string, string> = {
    licnse: "license", licencee: "licence", liscence: "licence",
    renewel: "renewal", renewl: "renewal", chalan: "challan",
    challen: "challan", paymnt: "payment", payement: "payment",
    gaadi: "vehicle", gadi: "vehicle",
  };
  return cleaned.split(" ").map((word) => corrections[word] ?? word).join(" ");
}

function includesPhrase(input: string, phrase: string): boolean {
  if (!phrase) return false;
  return input.includes(normalise(phrase));
}

function hasWord(input: string, word: string): boolean {
  return new RegExp(`(?:^|\\s)${word.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}(?=\\s|$)`).test(input);
}

function formatExplanation(rule: IntentRule): string {
  return `${rule.explanation}.`;
}

function genericResult(): ServiceMatchResult {
  return {
    matchedService: null,
    confidence: "low",
    explanation: "I can only help with Parivahan services — try describing what you need, like 'renew my licence' or 'pay a challan.'",
    clarifyingQuestion: "Do you need help with a driving licence, vehicle registration/RC, ownership transfer, challan, tax, permit, or an international permit?",
  };
}

function isChallanStatusQuestion(input: string): boolean {
  const mentionsChallan = /\b(challan|fine|penalty)\b/.test(input);
  const completed = /\b(already paid|paid|payment done|payment successful)\b/.test(input);
  const statusIssue = /\b(pending|still show|still shows|not updated|status|why)\b/.test(input);
  return mentionsChallan && completed && statusIssue;
}

/** Matches a free-text request to one of the fixed Parivahan service names. */
export function matchServiceIntent(userInput: string): ServiceMatchResult {
  const input = normalise(userInput);
  if (!input) return genericResult();

  if (isChallanStatusQuestion(input)) {
    return {
      matchedService: "track-application",
      confidence: "high",
      explanation: "You have already paid the challan and are asking why its status is still pending. Please track the payment/application status or contact support with the challan and payment reference.",
      alternativeMatches: ["pay-challan"],
    };
  }

  if (/^(licen[cs]e|license|dl|driving licence|driving license)$/.test(input)) {
    return {
      matchedService: null,
      confidence: "low",
      explanation: "You mentioned a driving licence, but not what you need to do with it.",
      clarifyingQuestion: "Do you want to renew your licence, apply for a new one, replace a lost/damaged one, or change its address?",
      alternativeMatches: ["dl-renewal", "driving-licence", "duplicate-dl", "change-address-dl"],
    };
  }

  // A bare "renewal" has no object, so returning a specific service would be misleading.
  if (/^(renew|renewal|expired|expiry)$/.test(input)) {
    return {
      matchedService: null,
      confidence: "low",
      explanation: "You mentioned renewal, but not what needs to be renewed.",
      clarifyingQuestion: "Renewal for your driving licence, vehicle registration, or something else?",
      alternativeMatches: ["dl-renewal", "new-vehicle-registration", "national-permit"],
    };
  }

  const scored = RULES.map((rule) => {
    let score = 0;
    let phraseHits = 0;
    for (const phrase of rule.phrases) {
      if (includesPhrase(input, phrase)) {
        score += 5;
        phraseHits += 1;
      }
    }
    for (const keyword of rule.keywords) {
      if (hasWord(input, keyword)) score += 1;
    }
    return { rule, score, phraseHits };
  }).sort((a, b) => b.score - a.score);

  const best = scored[0];
  const runnerUp = scored[1];
  if (!best || best.score === 0) return genericResult();

  // Contextual boosts resolve common collisions such as "lost licence" vs. "lost RC".
  const hasLicence = new RegExp(LICENCE).test(input);
  const hasVehicle = new RegExp(VEHICLE).test(input);
  if (best.rule.service === "duplicate-dl" && hasLicence) best.score += 3;
  if (best.rule.service === "duplicate-rc" && /\brc\b|registration certificate/.test(input)) best.score += 3;
  if (best.rule.service === "dl-renewal" && hasLicence) best.score += 3;
  if (best.rule.service === "transfer-ownership" && hasVehicle) best.score += 2;

  const plausible = scored
    .filter((item) => item.rule.service !== best.rule.service && item.score >= Math.max(2, best.score - 3))
    .map((item) => item.rule.service);

  // Only explicit phrase matches become secondary requests. This avoids
  // mistaking generic keyword overlap for a second user task.
  const secondaryMatches = scored
    .filter((item) => item.rule.service !== best.rule.service && item.phraseHits > 0 && item.score >= 5)
    .map((item) => item.rule.service);

  const isAddressOnly = best.rule.service === "change-address-dl" && !hasLicence;
  if (isAddressOnly && !plausible.includes("change-address-rc")) {
    plausible.push("change-address-rc");
  }

  const closeCall = runnerUp && runnerUp.score > 0 && best.score - runnerUp.score <= 2;
  const confidence: ServiceMatchResult["confidence"] =
    best.phraseHits > 0 && !closeCall && !isAddressOnly ? "high" :
    best.score >= 3 ? "medium" : "low";

  const result: ServiceMatchResult = {
    matchedService: best.rule.service,
    confidence,
    explanation: formatExplanation(best.rule),
  };

  if (plausible.length) result.alternativeMatches = plausible.slice(0, 3);
  if (secondaryMatches.length) {
    result.secondaryMatches = secondaryMatches.slice(0, 3);
    result.explanation = `${formatExplanation(best.rule)} I also detected another request: ${result.secondaryMatches.join(", ")}.`;
  }
  if (confidence !== "high") {
    result.clarifyingQuestion = isAddressOnly
      ? "Should the new address be updated on your driving licence, or are you asking about your vehicle RC?"
      : `Are you asking about a different service?`;
  }
  return result;
}

/**
 * Re-runs matching against the user's follow-up while retaining the prior
 * result as a small piece of context. This lets short replies such as
 * "driving licence" resolve a previous vague "renewal" request.
 */
export function getClarifyingFollowup(
  previousResult: ServiceMatchResult,
  userClarification: string,
): ServiceMatchResult {
  const clarification = normalise(userClarification);
  if (!clarification) return previousResult;

  // A clarification like "driving licence" after bare "renewal" needs the
  // omitted action restored from the preceding question.
  if (
    previousResult.explanation.includes("mentioned renewal")
  ) {
    if (new RegExp(LICENCE).test(clarification)) {
      return {
        matchedService: "dl-renewal",
        confidence: "high",
        explanation: "You clarified that the renewal is for your driving licence.",
      };
    }
    if (new RegExp(VEHICLE).test(clarification) || /\brc\b/.test(clarification) || /registration/.test(clarification)) {
      return {
        matchedService: null,
        confidence: "low",
        explanation: "You clarified that this is about your vehicle registration (RC), but an RC renewal is not one of the available navigator services.",
        clarifyingQuestion: "Do you need a duplicate RC, a new vehicle registration, a change of address, or an ownership transfer?",
        alternativeMatches: ["duplicate-rc", "new-vehicle-registration", "change-address-rc", "transfer-ownership"],
      };
    }
    if (/permit/.test(clarification) || /fitness/.test(clarification)) {
       return {
        matchedService: "national-permit",
        confidence: "medium",
        explanation: "You clarified that this concerns a vehicle permit. The closest available service is the National/State Permit application.",
        clarifyingQuestion: "Is this a national, state, or commercial transport permit?",
      };
    }
  }
  
  if (previousResult.matchedService === "change-address-dl" && previousResult.confidence !== "high") {
    if (new RegExp(VEHICLE).test(clarification) || /\brc\b/.test(clarification) || /registration/.test(clarification)) {
      return {
        matchedService: "change-address-rc",
        confidence: "high",
        explanation: "You clarified that the address change is for your vehicle registration (RC)."
      }
    }
  }

  const context = previousResult.matchedService
    ? `${previousResult.matchedService.replace(/-/g, ' ')} ${clarification}`
    : clarification;
  const resolved = matchServiceIntent(context);

  return resolved;
}
