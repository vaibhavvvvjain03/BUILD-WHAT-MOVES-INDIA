import { NextRequest, NextResponse } from "next/server";
import { getUserProfileStore, findProfileByMobile, UserProfile } from "@/lib/mockData";
import { generateMockSessionId } from "@/lib/otpHelpers";

// GET /api/auth/user-profile?mobile=XXXXXXXXXX
// Returns whether a profile exists for this mobile number (used by Sign In to
// distinguish returning users from new users)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get("mobile");

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Valid 10-digit mobile number required." },
        { status: 400 }
      );
    }

    const profile = findProfileByMobile(mobile);

    return NextResponse.json({
      success: true,
      data: {
        exists: !!profile,
        profile: profile ?? null,
        sessionId: profile ? generateMockSessionId() : null,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}

// POST /api/auth/user-profile
// Creates or updates a manual sign-up profile
export async function POST(req: NextRequest) {
  try {
    const { mobileNumber, name, dateOfBirth, address } = await req.json();

    if (!mobileNumber || !name || !dateOfBirth || !address) {
      return NextResponse.json(
        { success: false, error: "mobileNumber, name, dateOfBirth and address are required." },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return NextResponse.json(
        { success: false, error: "Mobile number must be 10 digits." },
        { status: 400 }
      );
    }

    const profile: UserProfile = {
      mobileNumber,
      name: name.trim(),
      dateOfBirth,
      address: address.trim(),
      createdAt: new Date().toISOString(),
    };

    getUserProfileStore().set(mobileNumber, profile);

    const sessionId = generateMockSessionId();

    return NextResponse.json({
      success: true,
      data: { profile, sessionId },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
