import { NextResponse } from "next/server";

let settings = {
  smsAlerts: true,
  emailNotifications: false,
  pushNotifications: true,
  darkMode: false,
  twoFactorAuth: false,
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  try {
    const updates = await req.json();
    settings = { ...settings, ...updates };
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
