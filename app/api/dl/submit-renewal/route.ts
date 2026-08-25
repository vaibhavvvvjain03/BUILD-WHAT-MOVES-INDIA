import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { findLicence, getRenewalStore, generateApplicationId } from "@/lib/mockData";
import { RenewalApplication } from "@/lib/types";

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
        { success: false, error: "Licence not found." },
        { status: 404 }
      );
    }

    const applicationId = generateApplicationId();
    const now = new Date().toISOString();

    const application: RenewalApplication = {
      applicationId,
      dlNumber: licence.dlNumber,
      applicantName: licence.name,
      dateOfBirth: licence.dateOfBirth,
      phoneNumber: licence.phoneNumber,
      email: licence.email,
      status: "draft",
      createdAt: now,
      updatedAt: now,
      nextAction: "Upload Documents",
      documents: [],
      paymentAmount: 400, // ₹400 standard renewal fee
      requiresForm1A: licence.requiresForm1A,
      statusHistory: [{ status: "draft", timestamp: now }],
    };

    getRenewalStore().set(applicationId, application);
    revalidatePath("/my-parivahan");

    return NextResponse.json({
      success: true,
      data: {
        applicationId,
        paymentAmount: application.paymentAmount,
        requiresForm1A: application.requiresForm1A,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
