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
}

export const PARIVAHAN_SERVICES = [
  "Driving Licence Renewal",
  "New Driving Licence Application",
  "Duplicate Driving Licence",
  "Change of Address (Licence)",
  "Vehicle Registration (New)",
  "Transfer of Vehicle Ownership",
  "Duplicate RC (Registration Certificate)",
  "Pay Traffic Challan",
  "Road Tax Payment",
  "National/State Permit Application",
  "Fancy Number Allocation",
  "International Driving Permit",
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
    service: "Transfer of Vehicle Ownership",
    phrases: [
      "second hand", "second-hand", "used car", "used bike", "transfer ownership",
      "ownership transfer", "change ownership", "vehicle in my name", "car in my name",
      "bike in my name", "bought a car", "bought a bike", "sold my car", "sold my bike",
    ],
    keywords: ["transfer", "ownership", "owner", "bought", "sold", "purchase", "name"],
    explanation: "You described a vehicle changing hands or needing to be put in a different owner's name",
  },
  {
    service: "Driving Licence Renewal",
    phrases: [
      "licence expired", "license expired", "renew my licence", "renew my license",
      "dl expired", "driving licence renewal", "driving license renewal", "expiry date",
    ],
    keywords: ["renew", "renewal", "expired", "expiry", "expire"],
    explanation: "You mentioned renewing or an expired driving licence",
  },
  {
    service: "Duplicate Driving Licence",
    phrases: [
      "lost my licence", "lost my license", "licence lost", "license lost", "duplicate licence",
      "duplicate license", "stolen licence", "stolen license", "licence damaged", "license damaged",
    ],
    keywords: ["lost", "stolen", "duplicate", "damaged", "missing"],
    explanation: "You indicated that your driving licence is lost, stolen, missing, or damaged",
  },
  {
    service: "Change of Address (Licence)",
    phrases: [
      "change address", "address change", "moved to a new house", "moved house", "new address",
      "update my address", "shifted house", "shifted to", "relocated",
    ],
    keywords: ["address", "moved", "shifted", "relocated"],
    explanation: "You mentioned moving or updating your address; this service updates the address on your driving licence",
  },
  {
    service: "Vehicle Registration (New)",
    phrases: [
      "new vehicle registration", "register my new car", "register my new bike", "first registration",
      "new car registration", "new bike registration", "number plate for new vehicle",
    ],
    keywords: ["register", "registration", "new car", "new bike", "number plate"],
    explanation: "You appear to need the first registration for a newly purchased vehicle",
  },
  {
    service: "Duplicate RC (Registration Certificate)",
    phrases: [
      "lost rc", "duplicate rc", "rc lost", "registration certificate lost", "lost registration certificate",
      "stolen rc", "rc damaged", "duplicate registration certificate",
    ],
    keywords: ["rc", "registration certificate", "duplicate", "lost", "stolen", "damaged"],
    explanation: "You indicated that the vehicle's Registration Certificate (RC) needs to be replaced",
  },
  {
    service: "Pay Traffic Challan",
    phrases: [
      "pay challan", "traffic challan", "traffic fine", "pay a fine", "pay fine", "e challan",
      "e-challan", "challan payment", "police fine",
    ],
    keywords: ["challan", "fine", "penalty", "traffic"],
    explanation: "You mentioned a traffic fine or challan payment",
  },
  {
    service: "Road Tax Payment",
    phrases: ["road tax", "vehicle tax", "pay tax for my vehicle", "motor vehicle tax", "tax payment"],
    keywords: ["tax", "road", "vehicle"],
    explanation: "You mentioned paying a tax for your vehicle",
  },
  {
    service: "National/State Permit Application",
    phrases: [
      "national permit", "state permit", "commercial permit", "goods permit", "tourist permit",
      "transport permit", "permit for truck", "permit for taxi",
    ],
    keywords: ["permit", "commercial", "goods", "transport", "taxi", "truck"],
    explanation: "You mentioned a vehicle permit, including national, state, or commercial transport permits",
  },
  {
    service: "Fancy Number Allocation",
    phrases: ["fancy number", "choice number", "vip number", "special number plate", "lucky number plate"],
    keywords: ["fancy", "choice", "vip", "lucky", "number"],
    explanation: "You asked for a preferred or special vehicle registration number",
  },
  {
    service: "International Driving Permit",
    phrases: [
      "international driving permit", "international licence", "international license", "drive abroad",
      "drive in germany", "drive in usa", "drive in uk", "drive overseas", "foreign country driving",
    ],
    keywords: ["international", "abroad", "overseas", "foreign", "germany", "usa", "uk"],
    explanation: "You mentioned driving outside India, which requires an International Driving Permit",
  },
  {
    service: "New Driving Licence Application",
    phrases: [
      "new driving licence", "new driving license", "apply for licence", "apply for license",
      "first driving licence", "first driving license", "get my licence", "get my license",
    ],
    keywords: ["apply", "new", "first", "licence", "license", "dl"],
    explanation: "You appear to be applying for a driving licence for the first time",
  },
];

function normalise(input: string): string {
  return input
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesPhrase(input: string, phrase: string): boolean {
  return input.includes(normalise(phrase));
}

function hasWord(input: string, word: string): boolean {
  return new RegExp(`(?:^|\\s)${word.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}(?=\\s|$)`).test(input);
}

function formatExplanation(rule: IntentRule): string {
  return `${rule.explanation} — this is a ${rule.service}.`;
}

function genericResult(): ServiceMatchResult {
  return {
    matchedService: null,
    confidence: "low",
    explanation: "I could not confidently identify a Parivahan service from that description.",
    clarifyingQuestion: "Do you need help with a driving licence, vehicle registration/RC, ownership transfer, challan, tax, permit, or an international permit?",
  };
}

/** Matches a free-text request to one of the fixed Parivahan service names. */
export function matchServiceIntent(userInput: string): ServiceMatchResult {
  const input = normalise(userInput);
  if (!input) return genericResult();

  // A bare "renewal" has no object, so returning a specific service would be misleading.
  if (/^(renew|renewal|expired|expiry)$/.test(input)) {
    return {
      matchedService: null,
      confidence: "low",
      explanation: "You mentioned renewal, but not what needs to be renewed.",
      clarifyingQuestion: "Renewal for your driving licence, vehicle registration, or something else?",
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
  if (best.rule.service === "Duplicate Driving Licence" && hasLicence) best.score += 3;
  if (best.rule.service === "Duplicate RC (Registration Certificate)" && /\brc\b|registration certificate/.test(input)) best.score += 3;
  if (best.rule.service === "Driving Licence Renewal" && hasLicence) best.score += 3;
  if (best.rule.service === "Transfer of Vehicle Ownership" && hasVehicle) best.score += 2;

  const plausible = scored
    .filter((item) => item.rule.service !== best.rule.service && item.score >= Math.max(2, best.score - 3))
    .map((item) => item.rule.service);

  const isAddressOnly = best.rule.service === "Change of Address (Licence)" && !hasLicence;
  if (isAddressOnly && !plausible.includes("Duplicate RC (Registration Certificate)")) {
    plausible.push("Duplicate RC (Registration Certificate)");
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
  if (confidence !== "high") {
    result.clarifyingQuestion = isAddressOnly
      ? "Should the new address be updated on your driving licence, or are you asking about your vehicle RC?"
      : `Is this definitely about ${best.rule.service.toLowerCase()}, or one of the related services listed above?`;
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

  const context = previousResult.matchedService
    ? `${previousResult.matchedService} ${clarification}`
    : clarification;
  const resolved = matchServiceIntent(context);

  // A clarification like "driving licence" after bare "renewal" needs the
  // omitted action restored from the preceding question.
  if (
    previousResult.explanation.includes("mentioned renewal") &&
    new RegExp(LICENCE).test(clarification)
  ) {
    return {
      matchedService: "Driving Licence Renewal",
      confidence: "high",
      explanation: "You clarified that the renewal is for your driving licence — this is a Driving Licence Renewal.",
    };
  }
  return resolved;
}
