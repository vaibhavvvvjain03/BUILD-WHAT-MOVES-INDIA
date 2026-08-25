import { NextRequest, NextResponse } from "next/server";
import { findAadhaar } from "@/lib/mockData";
import { generateMockOtp } from "@/lib/otpHelpers";

// Shared Aadhaar OTP store (keyed by Aadhaar number)
declare global {
  // eslint-disable-next-line no-var
  var __aadhaarOtpStore: Map<string, string> | undefined;
}

function getAadhaarOtpStore(): Map<string, string> {
  if (!global.__aadhaarOtpStore) global.__aadhaarOtpStore = new Map();
  return global.__aadhaarOtpStore;
}

export async function POST(req: NextRequest) {
  try {
    const { aadhaarNumber } = await req.json();
    const cleaned = (aadhaarNumber ?? "").replace(/\s+/g, "");

    if (!/^\d{12}$/.test(cleaned)) {
      return NextResponse.json(
        { success: false, error: "Aadhaar number must be exactly 12 digits." },
        { status: 400 }
      );
    }

    const record = findAadhaar(cleaned);
    if (!record) {
      return NextResponse.json(
        { success: false, error: "No Aadhaar record found for this number. Try a demo number from the hint below." },
        { status: 404 }
      );
    }

    const otp = generateMockOtp();
    getAadhaarOtpStore().set(cleaned, otp);
    console.log(`[MOCK AADHAAR OTP] Aadhaar: ${cleaned} → OTP: ${otp}`);

    return NextResponse.json({
      success: true,
      data: {
        maskedAadhaar: `XXXX XXXX ${cleaned.slice(-4)}`,
        maskedMobile: `XXXXXX${record.mobileNumber.slice(-4)}`,
        _devOtp: otp,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
