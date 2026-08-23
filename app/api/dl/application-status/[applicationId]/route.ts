import { NextRequest, NextResponse } from "next/server";
import { getRenewalStore } from "@/lib/mockData";

export async function GET(
  _req: NextRequest,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;

  if (!applicationId) {
    return NextResponse.json(
      { success: false, error: "applicationId is required." },
      { status: 400 }
    );
  }

  const application = getRenewalStore().get(applicationId);

  if (!application) {
    return NextResponse.json(
      { success: false, error: "Application not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: { application } });
}
