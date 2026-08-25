import { NextRequest, NextResponse } from "next/server";
import { findLicence, getOtpStore } from "@/lib/mockData";
import { validateMockOtp } from "@/lib/otpHelpers";

export async function POST(req: NextRequest) {
  try {
    const { dlNumber, dateOfBirth, otp } = await req.json();

    if (!dlNumber || !dateOfBirth || !otp) {
      return NextResponse.json(
        { success: false, error: "dlNumber, dateOfBirth and otp are required." },
        { status: 400 }
      );
    }

    const licence = findLicence(dlNumber, dateOfBirth);
    if (!licence) {
      return NextResponse.json(
        { success: false, error: "Licence not found." },
        { status: 404 }
      );
    }

    // Mock: any valid 6-digit OTP is accepted.
    // (In production this would verify against the OTP store.)
    if (!validateMockOtp(otp.toString())) {
      return NextResponse.json(
        { success: false, error: "OTP must be exactly 6 digits." },
        { status: 400 }
      );
    }

    // Clear any stored OTP for this DL
    getOtpStore().delete(licence.dlNumber);

    // Session is now managed client-side via React Context.
    // No cookie is set here — the Login page handles session creation.
    return NextResponse.json({
      success: true,
      data: { licence },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
