import { NextRequest, NextResponse } from "next/server";
import { validateMockOtp, generateMockSessionId } from "@/lib/otpHelpers";

// ── Re-use the same store as send-otp ────────────────────────────────────────
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
    const { mobileNumber, otp } = await req.json();

    if (!mobileNumber || !otp) {
      return NextResponse.json(
        { success: false, error: "mobileNumber and otp are required." },
        { status: 400 }
      );
    }

    if (!validateMockOtp(otp.toString())) {
      return NextResponse.json(
        { success: false, error: "OTP must be exactly 6 digits." },
        { status: 400 }
      );
    }

    // In mock: any valid 6-digit code is accepted (no stored code check needed).
    // We still clear the store entry to mimic real OTP invalidation.
    getLoginOtpStore().delete(mobileNumber);

    const sessionId = generateMockSessionId();

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        mobileNumber,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
