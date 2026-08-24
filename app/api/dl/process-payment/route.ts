import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getRenewalStore } from "@/lib/mockData";

export async function POST(req: NextRequest) {
  try {
    const { applicationId } = await req.json();

    if (!applicationId) {
      return NextResponse.json(
        { success: false, error: "applicationId is required." },
        { status: 400 }
      );
    }

    const store = getRenewalStore();
    const application = store.get(applicationId);

    if (!application) {
      return NextResponse.json(
        { success: false, error: "Application not found." },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    const transactionId = `TXN${Date.now()}`;

    // Move to payment_done → under_review immediately
    application.paymentTransactionId = transactionId;
    application.status = "under_review";
    application.updatedAt = now;
    application.statusHistory.push(
      { status: "payment_done", timestamp: now },
      { status: "under_review", timestamp: now }
    );
    store.set(applicationId, application);
    revalidatePath("/my-parivahan");

    // Auto-advance to "approved" after ~12 seconds (simulates processing time)
    setTimeout(() => {
      const app = store.get(applicationId);
      if (app && app.status === "under_review") {
        const approvedAt = new Date().toISOString();
        app.status = "approved";
        app.updatedAt = approvedAt;
        app.statusHistory.push({ status: "approved", timestamp: approvedAt });
        store.set(applicationId, app);
        console.log(`[MOCK] Application ${applicationId} auto-approved.`);
      }
    }, 12000);

    return NextResponse.json({
      success: true,
      data: {
        transactionId,
        amount: application.paymentAmount,
        status: "under_review",
        message: "Payment successful. Your application is now under review.",
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
