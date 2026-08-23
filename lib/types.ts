// ── Licence Record (seeded, immutable) ──────────────────────────────────────
export interface MockLicence {
  dlNumber: string;         // e.g. "MH0120110012345"
  name: string;
  dateOfBirth: string;      // ISO date "YYYY-MM-DD"
  fatherName: string;
  address: string;
  phoneNumber: string;
  email: string;
  bloodGroup: string;
  licenceClass: string[];   // e.g. ["LMV", "MCWG"]
  issueDate: string;        // ISO date
  expiryDate: string;       // ISO date
  issuingRTO: string;
  photoUrl?: string;
  requiresForm1A: boolean;  // true if applicant age >= 40
}

// ── Renewal Application (mutable) ────────────────────────────────────────────
export type ApplicationStatus =
  | "draft"
  | "otp_verified"
  | "submitted"
  | "payment_pending"
  | "payment_done"
  | "under_review"
  | "approved"
  | "rejected";

export interface DocumentRecord {
  type: "address_proof" | "medical_certificate" | "form_1a" | "photo" | "existing_licence";
  fileName: string;
  uploadedAt: string;
  mockUrl: string;
}

export interface RenewalApplication {
  applicationId: string;          // "PSW-2026-XXXXXX"
  dlNumber: string;
  applicantName: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  documents: DocumentRecord[];
  paymentAmount: number;          // in INR
  paymentTransactionId?: string;
  requiresForm1A: boolean;
  statusHistory: { status: ApplicationStatus; timestamp: string }[];
}

// ── API Response shapes ───────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
