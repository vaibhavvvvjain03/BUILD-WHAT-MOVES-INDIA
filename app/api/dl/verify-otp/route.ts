import { NextRequest, NextResponse } from "next/server";
import { findLicence, getOtpStore } from "@/lib/mockData";

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

    const storedOtp = getOtpStore().get(licence.dlNumber);
    if (!storedOtp || storedOtp !== otp.toString()) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired OTP. Please try again." },
        { status: 401 }
      );
    }

    // Clear OTP after successful verification
    getOtpStore().delete(licence.dlNumber);

    // Return full licence details for the review screen
    return NextResponse.json({
      success: true,
      data: { licence },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
