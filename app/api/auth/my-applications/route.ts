import { NextRequest, NextResponse } from "next/server";
import { getRenewalStore } from "@/lib/mockData";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dlNumber = searchParams.get("dlNumber");

    if (!dlNumber) {
      return NextResponse.json(
        { success: false, error: "dlNumber query parameter is required." },
        { status: 400 }
      );
    }

    const normalisedDl = dlNumber.replace(/\s+/g, "").toUpperCase();
    const store = getRenewalStore();

    const applications = Array.from(store.values()).filter(
      (app) => app.dlNumber.replace(/\s+/g, "").toUpperCase() === normalisedDl
    );

    // Sort newest first
    applications.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, data: { applications } });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
