import { NextRequest, NextResponse } from "next/server";
import { findAadhaar } from "@/lib/mockData";
import { validateMockOtp, generateMockSessionId } from "@/lib/otpHelpers";

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
    const { aadhaarNumber, otp } = await req.json();
    const cleaned = (aadhaarNumber ?? "").replace(/\s+/g, "");

    if (!cleaned || !otp) {
      return NextResponse.json(
        { success: false, error: "aadhaarNumber and otp are required." },
        { status: 400 }
      );
    }

    if (!validateMockOtp(otp.toString())) {
      return NextResponse.json(
        { success: false, error: "OTP must be exactly 6 digits." },
        { status: 400 }
      );
    }

    const record = findAadhaar(cleaned);
    if (!record) {
      return NextResponse.json(
        { success: false, error: "Aadhaar record not found." },
        { status: 404 }
      );
    }

    // Clear stored OTP (mock: any 6 digits accepted)
    getAadhaarOtpStore().delete(cleaned);

    const sessionId = generateMockSessionId();

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        // Full profile auto-populated from the Aadhaar record
        mobileNumber: record.mobileNumber,
        name: record.name,
        dateOfBirth: record.dateOfBirth,
        address: record.address,
        linkedDLNumber: record.linkedDLNumber,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
