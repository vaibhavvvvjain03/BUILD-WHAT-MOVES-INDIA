import { NextRequest, NextResponse } from "next/server";
import { getRenewalStore } from "@/lib/mockData";
import { DocumentRecord } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { applicationId, documentType, fileName } = await req.json();

    if (!applicationId || !documentType || !fileName) {
      return NextResponse.json(
        { success: false, error: "applicationId, documentType and fileName are required." },
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
    const doc: DocumentRecord = {
      type: documentType,
      fileName,
      uploadedAt: now,
      mockUrl: `/mock-uploads/${applicationId}/${documentType}/${fileName}`,
    };

    // Replace if same doc type already uploaded, otherwise append
    const existingIdx = application.documents.findIndex((d) => d.type === documentType);
    if (existingIdx >= 0) {
      application.documents[existingIdx] = doc;
    } else {
      application.documents.push(doc);
    }

    application.updatedAt = now;

    // Check if all required docs are uploaded
    const requiredDocs = application.requiresForm1A 
      ? ["address_proof", "photo", "existing_licence", "form_1a"]
      : ["address_proof", "photo", "existing_licence"];

    const allUploaded = requiredDocs.every(rt => application.documents.some(d => d.type === rt));
    if (allUploaded && application.status === "draft") {
      application.status = "payment_pending";
      application.nextAction = "Complete Payment";
      application.statusHistory.push({ status: "payment_pending", timestamp: now });
    }

    store.set(applicationId, application);

    return NextResponse.json({
      success: true,
      data: { document: doc, totalDocuments: application.documents.length },
    });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
