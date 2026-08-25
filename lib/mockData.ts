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
  // Karnataka: Born 1985 -> age 41 -> requires Form 1A
  {
    dlNumber: "KA01 2018 0001234",
    name: "Arun Kumar",
    dateOfBirth: "1985-05-15",
    fatherName: "Krishnappa",
    address: "123, 4th Main, Koramangala 5th Block, Bengaluru, Karnataka - 560095",
    phoneNumber: "9876543111",
    email: "arun.kumar@email.com",
    bloodGroup: "A+",
    licenceClass: ["LMV", "MCWG"],
    issueDate: "2018-05-20",
    expiryDate: "2028-05-19",
    issuingRTO: "RTO Koramangala, Bengaluru",
    requiresForm1A: true,
  },
  // Tamil Nadu: Born 1990 -> age 36 -> no Form 1A
  {
    dlNumber: "TN01 2015 0005678",
    name: "Karthik Subramanian",
    dateOfBirth: "1990-11-02",
    fatherName: "Subramanian",
    address: "45, Anna Salai, T. Nagar, Chennai, Tamil Nadu - 600017",
    phoneNumber: "9876543222",
    email: "karthik.s@email.com",
    bloodGroup: "O-",
    licenceClass: ["MCWG"],
    issueDate: "2015-11-10",
    expiryDate: "2035-11-09",
    issuingRTO: "RTO Chennai Central",
    requiresForm1A: false,
  },
  // Uttar Pradesh: Born 1978 -> age 48 -> requires Form 1A
  {
    dlNumber: "UP32 2019 0009101",
    name: "Amit Singh",
    dateOfBirth: "1978-08-20",
    fatherName: "Rajendra Singh",
    address: "67, Gomti Nagar, Lucknow, Uttar Pradesh - 226010",
    phoneNumber: "9876543333",
    email: "amit.singh@email.com",
    bloodGroup: "B-",
    licenceClass: ["LMV"],
    issueDate: "2019-08-25",
    expiryDate: "2029-08-24",
    issuingRTO: "RTO Lucknow",
    requiresForm1A: true,
  },
  // West Bengal: Born 1995 -> age 31 -> no Form 1A
  {
    dlNumber: "WB01 2020 0001122",
    name: "Sneha Das",
    dateOfBirth: "1995-02-14",
    fatherName: "Prosenjit Das",
    address: "89, Park Street, Kolkata, West Bengal - 700016",
    phoneNumber: "9876543444",
    email: "sneha.das@email.com",
    bloodGroup: "AB+",
    licenceClass: ["LMV", "MCWG"],
    issueDate: "2020-02-20",
    expiryDate: "2040-02-19",
    issuingRTO: "RTO Kolkata (Beltala)",
    requiresForm1A: false,
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

// ── Mock Vehicles ────────────────────────────────────────────────────────────
import { MockVehicle } from "./types";
export const mockVehicles: MockVehicle[] = [
  {
    rcNumber: "MH01 AB 1234",
    ownerName: "Rajesh Kumar Sharma",
    vehicleClass: "Motor Car (LMV)",
    makeModel: "Hyundai i20",
    registrationDate: "2018-05-10",
    fitnessValidUpto: "2033-05-09",
    insuranceValidUpto: "2027-05-09",
    pucValidUpto: "2026-11-09",
    taxValidUpto: "2033-05-09",
    status: "Active",
  },
];

declare global {
  // eslint-disable-next-line no-var
  var __vehicleStore: Map<string, MockVehicle[]> | undefined;
}

export function getVehicleStore(): Map<string, MockVehicle[]> {
  if (!global.__vehicleStore) {
    global.__vehicleStore = new Map();
  }
  return global.__vehicleStore;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function findLicence(dlNumber: string, dob: string): MockLicence | undefined {
  const normalised = dlNumber.replace(/\s+/g, "").toUpperCase();
  return mockLicences.find(
    (l) =>
      l.dlNumber.replace(/\s+/g, "").toUpperCase() === normalised &&
      l.dateOfBirth === dob
  );
}

export function findLicenceByDl(dlNumber: string): MockLicence | undefined {
  const normalised = dlNumber.replace(/\s+/g, "").toUpperCase();
  return mockLicences.find((l) => l.dlNumber.replace(/\s+/g, "").toUpperCase() === normalised);
}

export function generateApplicationId(): string {
  const suffix = Math.floor(100000 + Math.random() * 900000).toString();
  return `PSW-2026-${suffix}`;
}

// ── Mock Aadhaar Records ───────────────────────────────────────────────────────
// Aadhaar numbers in real life are 12 digits. In mock: any 12-digit number
// that matches one of these records will auto-populate the profile and optionally
// link a driving licence.
export interface MockAadhaar {
  aadhaarNumber: string;     // 12-digit mock
  name: string;
  dateOfBirth: string;       // ISO date
  address: string;
  mobileNumber: string;      // pre-linked mobile for this Aadhaar
  linkedDLNumber: string | null; // null if holder has no DL on record
}

export const mockAadhaarRecords: MockAadhaar[] = [
  // ── Has linked DL (Rajesh — MH) ──
  {
    aadhaarNumber: "987654321012",
    name: "Rajesh Kumar Sharma",
    dateOfBirth: "1975-04-12",
    address: "204, Shivaji Nagar, Bandra West, Mumbai - 400050",
    mobileNumber: "9876543210",
    linkedDLNumber: "MH01 2011 0012345",
  },
  // ── Has linked DL (Priya — Delhi) ──
  {
    aadhaarNumber: "876543210987",
    name: "Priya Mehta",
    dateOfBirth: "2002-09-25",
    address: "15-B, Lajpat Nagar III, New Delhi - 110024",
    mobileNumber: "9123456780",
    linkedDLNumber: "DL04 2022 0098765",
  },
  // ── Has linked DL (Arun — Karnataka) ──
  {
    aadhaarNumber: "765432109876",
    name: "Arun Kumar",
    dateOfBirth: "1985-05-15",
    address: "123, 4th Main, Koramangala 5th Block, Bengaluru - 560095",
    mobileNumber: "9876543111",
    linkedDLNumber: "KA01 2018 0001234",
  },
  // ── No linked DL (new user, student) ──
  {
    aadhaarNumber: "654321098765",
    name: "Nisha Patel",
    dateOfBirth: "2000-06-20",
    address: "12, Paldi Cross Rd, Ahmedabad, Gujarat - 380007",
    mobileNumber: "9988776655",
    linkedDLNumber: null,
  },
  // ── No linked DL (senior citizen, no DL) ──
  {
    aadhaarNumber: "543210987654",
    name: "Mohan Lal Verma",
    dateOfBirth: "1950-01-10",
    address: "45, Hauz Khas Village, New Delhi - 110016",
    mobileNumber: "9112233445",
    linkedDLNumber: null,
  },
];

export function findAadhaar(aadhaarNumber: string): MockAadhaar | undefined {
  const cleaned = aadhaarNumber.replace(/\s+/g, "");
  return mockAadhaarRecords.find((r) => r.aadhaarNumber === cleaned);
}

// ── Manual User Profile Store (keyed by mobile number) ───────────────────────
// Stores profiles created via the manual sign-up flow (Path B on the login page)
export interface UserProfile {
  mobileNumber: string;
  name: string;
  dateOfBirth: string;
  address: string;
  createdAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __userProfileStore: Map<string, UserProfile> | undefined;
}

export function getUserProfileStore(): Map<string, UserProfile> {
  if (!global.__userProfileStore) {
    global.__userProfileStore = new Map();
  }
  return global.__userProfileStore;
}

export function findProfileByMobile(mobile: string): UserProfile | undefined {
  return getUserProfileStore().get(mobile);
}
