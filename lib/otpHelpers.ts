// ── Shared mock OTP helpers ───────────────────────────────────────────────────
// Single source of truth for OTP logic used by both the Login page and any
// other flow that needs OTP verification. In production these would call a
// real SMS gateway — here "any 6-digit code" is accepted.

/**
 * Validates a mock OTP — any string of exactly 6 numeric digits is accepted.
 */
export function validateMockOtp(otp: string): boolean {
  return /^\d{6}$/.test(otp);
}

/**
 * Generates a random 6-digit mock OTP string (for the dev hint UI).
 */
export function generateMockOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generates a random session ID (UUIDv4-lite).
 */
export function generateMockSessionId(): string {
  return "sess-" + Math.random().toString(36).slice(2) + "-" + Date.now();
}
