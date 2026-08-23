import { NextRequest, NextResponse } from "next/server";
import { findLicence, getOtpStore } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const { dlNumber, dateOfBirth } = await req.json();

    if (!dlNumber || !dateOfBirth) {
      return NextResponse.json(
        { success: false, error: "dlNumber and dateOfBirth are required." },
        { status: 400 }
      );
    }

    const licence = findLicence(dlNumber, dateOfBirth);

    if (!licence) {
      return NextResponse.json(
        { success: false, error: "No matching licence found. Please check your DL number and date of birth." },
        { status: 404 }
      );
    }

    // Generate a 6-digit OTP and store it keyed by dlNumber
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    getOtpStore().set(licence.dlNumber, otp);

    // In a real system we would send SMS. Here we log and return masked phone.
    console.log(`[MOCK OTP] DL: ${licence.dlNumber} → OTP: ${otp}`);

    return NextResponse.json({
      success: true,
      data: {
        maskedPhone: `XXXXXX${licence.phoneNumber.slice(-4)}`,
        requiresForm1A: licence.requiresForm1A,
        // Return OTP in data so the demo UI can show it — remove in prod
        _devOtp: otp,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
