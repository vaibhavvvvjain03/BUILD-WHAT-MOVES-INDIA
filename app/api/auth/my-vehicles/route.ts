import { NextResponse } from "next/server";
import { getVehicleStore, mockVehicles } from "@/lib/mockData";

export async function GET() {
  try {
    // In a real app we'd filter by Aadhaar/Session, but here we just return the mockVehicles array
    const store = getVehicleStore();
    
    // Seed it once if empty
    if (store.size === 0) {
      store.set("default", mockVehicles);
    }
    
    const vehicles = store.get("default") || [];

    return NextResponse.json({ success: true, data: { vehicles } });
  } catch {
    return NextResponse.json({ success: false, error: "Server error." }, { status: 500 });
  }
}
