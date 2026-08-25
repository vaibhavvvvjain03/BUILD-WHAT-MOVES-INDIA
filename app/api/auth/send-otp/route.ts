import { NextRequest, NextResponse } from "next/server";
import { generateMockOtp } from "@/lib/otpHelpers";

// ── In-memory login OTP store (keyed by mobile number) ───────────────────────
declare global {
  // eslint-disable-next-line no-var
  var __loginOtpStore: Map<string, string> | undefined;
}

function getLoginOtpStore(): Map<string, string> {
  if (!global.__loginOtpStore) {
    global.__loginOtpStore = new Map();
  }
  return global.__loginOtpStore;
}

export async function POST(req: NextRequest) {
  try {
    const { mobileNumber } = await req.json();

    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber.replace(/\s+/g, ""))) {
      return NextResponse.json(
        { success: false, error: "A valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    const otp = generateMockOtp();
    getLoginOtpStore().set(mobileNumber, otp);

    // In production, send via SMS gateway. In dev, return in response for display.
    console.log(`[MOCK LOGIN OTP] Mobile: ${mobileNumber} → OTP: ${otp}`);

    return NextResponse.json({
      success: true,
      data: {
        maskedMobile: `XXXXXX${mobileNumber.slice(-4)}`,
        // Dev only — remove in production:
        _devOtp: otp,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
