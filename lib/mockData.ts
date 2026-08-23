import { MockLicence, RenewalApplication } from "./types";

// ── Seeded Licence Records ────────────────────────────────────────────────────

// Record 1: Born 1975 → age ~51 → requires Form 1A (age >= 40)
export const mockLicences: MockLicence[] = [
  {
    dlNumber: "MH01 2011 0012345",
    name: "Rajesh Kumar Sharma",
    dateOfBirth: "1975-04-12",
    fatherName: "Ramesh Chandra Sharma",
    address: "204, Shivaji Nagar, Bandra West, Mumbai - 400050",
    phoneNumber: "9876543210",
    email: "rajesh.sharma@email.com",
    bloodGroup: "B+",
    licenceClass: ["LMV", "MCWG"],
    issueDate: "2011-03-20",
    expiryDate: "2026-04-11",
    issuingRTO: "RTO Mumbai (Central), MH-01",
    requiresForm1A: true, // Age 51 — medical form mandatory
  },
  // Record 2: Born 2002 → age ~23 → no Form 1A needed
  {
    dlNumber: "DL04 2022 0098765",
    name: "Priya Mehta",
    dateOfBirth: "2002-09-25",
    fatherName: "Suresh Mehta",
    address: "15-B, Lajpat Nagar III, New Delhi - 110024",
    phoneNumber: "9123456780",
    email: "priya.mehta@email.com",
    bloodGroup: "O+",
    licenceClass: ["MCWG", "LMV"],
    issueDate: "2022-09-28",
    expiryDate: "2027-09-24",
    issuingRTO: "RTO Delhi South, DL-04",
    requiresForm1A: false, // Age 23 — no medical form needed
  },
];

// ── In-Memory Application Store (module-level singleton in dev) ───────────────
// Uses globalThis to survive Next.js hot reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __renewalStore: Map<string, RenewalApplication> | undefined;
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, string> | undefined;
}

export function getRenewalStore(): Map<string, RenewalApplication> {
  if (!global.__renewalStore) {
    global.__renewalStore = new Map();
  }
  return global.__renewalStore;
}

export function getOtpStore(): Map<string, string> {
  if (!global.__otpStore) {
    global.__otpStore = new Map();
  }
  return global.__otpStore;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function findLicence(dlNumber: string, dob: string): MockLicence | undefined {
  const normalised = dlNumber.replace(/\s+/g, " ").toUpperCase().trim();
  return mockLicences.find(
    (l) =>
      l.dlNumber.replace(/\s+/g, " ").toUpperCase().trim() === normalised &&
      l.dateOfBirth === dob
  );
}

export function generateApplicationId(): string {
  const suffix = Math.floor(100000 + Math.random() * 900000).toString();
  return `PSW-2026-${suffix}`;
}
