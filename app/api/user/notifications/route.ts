import { NextResponse } from "next/server";

let notifications = [
  {
    id: "1",
    title: "Welcome to Parivahan Sewa!",
    message: "Thank you for using the newly redesigned portal. Explore features like VANI AI.",
    time: "Just now",
    read: false,
    type: "system",
  },
  {
    id: "2",
    title: "Application Received",
    message: "Your Driving Licence renewal application (App No: DL-88493) has been successfully submitted.",
    time: "2 hours ago",
    read: false,
    type: "status",
  },
  {
    id: "3",
    title: "Traffic Advisory",
    message: "Heavy rainfall expected in coastal regions. Please drive safely and obey speed limits.",
    time: "1 day ago",
    read: true,
    type: "alert",
  }
];

export async function GET() {
  return NextResponse.json(notifications);
}

export async function POST(req: Request) {
  try {
    const { action, id } = await req.json();
    if (action === "mark_read" && id) {
      notifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    } else if (action === "mark_all_read") {
      notifications = notifications.map((n) => ({ ...n, read: true }));
    }
    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}
