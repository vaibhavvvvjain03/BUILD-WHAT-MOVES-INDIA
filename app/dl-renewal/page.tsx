"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  CreditCard,
  Clock,
  AlertCircle,
  FileText,
  User,
  Phone,
  Calendar,
  MapPin,
  Droplet,
  Car,
  RefreshCw,
  Download,
  X,
  RotateCcw,
  ListChecks,
  Timer,
  Wallet,
  Building2,
} from "lucide-react";
import { MockLicence, RenewalApplication } from "@/lib/types";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";

// ── Step definitions ────────────────────────────────────────────────────────
type Step = "intro" | "state" | "verify" | "otp" | "review" | "documents" | "payment" | "tracking";

const STEPS: { id: Step; label: string }[] = [
  { id: "intro",     label: "Start" },
  { id: "state",     label: "State" },
  { id: "verify",    label: "Verify" },
  { id: "otp",       label: "OTP" },
  { id: "review",    label: "Review" },
  { id: "documents", label: "Documents" },
  { id: "payment",   label: "Payment" },
  { id: "tracking",  label: "Track" },
];

const STEP_INDEX: Record<Step, number> = {
  intro: 0, state: 1, verify: 2, otp: 3, review: 4, documents: 5, payment: 6, tracking: 7,
};

// ── Indian States list ────────────────────────────────────────────────────────
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman & Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli",
  "Daman & Diu", "Delhi", "Jammu & Kashmir", "Ladakh",
  "Lakshadweep", "Puducherry",
];
const LIVE_STATE = "Karnataka";

// ── CAPTCHA Generator ─────────────────────────────────────────────────────────
function generateCaptchaText(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function CaptchaDisplay({ text }: { text: string }) {
  return (
    <div
      aria-label="CAPTCHA image"
      className="relative select-none w-full h-14 bg-gradient-to-br from-primary/8 to-accent/10 border border-text/20 rounded-xl overflow-hidden flex items-center justify-center"
    >
      {/* Noise lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[12, 28, 42].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="100%" y2={y + (i % 2 === 0 ? 8 : -8)}
            stroke="#0B3D2E" strokeWidth="0.7" strokeOpacity="0.15" strokeDasharray="4 6" />
        ))}
        {[20, 60, 100, 140, 180, 220].map((x, i) => (
          <line key={`v${i}`} x1={`${x}`} y1="0" x2={`${x + 10}`} y2="100%"
            stroke="#D4A24C" strokeWidth="0.6" strokeOpacity="0.2" />
        ))}
      </svg>
      {/* Characters with individual rotation/offset */}
      <div className="relative flex items-center gap-1 px-4">
        {text.split("").map((ch, i) => {
          const rotate = [-8, 5, -12, 7, -4, 10][i] ?? 0;
          const translateY = [2, -3, 4, -2, 3, -4][i] ?? 0;
          const colors = ["text-primary", "text-accent", "text-primary/70", "text-primary", "text-accent/80", "text-primary"];
          return (
            <span
              key={i}
              className={`font-mono font-black text-2xl tracking-tight ${colors[i]}`}
              style={{ transform: `rotate(${rotate}deg) translateY(${translateY}px)`, display: "inline-block" }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ── Document requirements ───────────────────────────────────────────────────
const REQUIRED_DOCS = [
  { type: "address_proof" as const, label: "Address Proof", hint: "Aadhaar, Passport, Utility Bill" },
  { type: "photo" as const, label: "Passport Photo", hint: "Recent colour photograph" },
  { type: "existing_licence" as const, label: "Existing DL Copy", hint: "Self-attested photocopy" },
];
const FORM_1A_DOC = { type: "form_1a" as const, label: "Form 1A (Medical)", hint: "Required for applicants aged 40+" };

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ── Modern Date Picker ──────────────────────────────────────────────────────
function DatePicker({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value) return parseInt(value.split("-")[0]);
    return new Date().getFullYear() - 25;
  });
  const [viewMonth, setViewMonth] = useState(() => {
    if (value) return parseInt(value.split("-")[1]) - 1;
    return new Date().getMonth();
  });
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click OR Escape key
  useEffect(() => {
    function clickHandler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function keyHandler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", clickHandler);
      document.addEventListener("keydown", keyHandler);
    }
    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open]);

  // Sync view when value prop changes externally (e.g. auto-fill)
  useEffect(() => {
    if (value) {
      setViewYear(parseInt(value.split("-")[0]));
      setViewMonth(parseInt(value.split("-")[1]) - 1);
    }
  }, [value]);

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const today = new Date();

  function selectDay(day: number) {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    onChange(`${viewYear}-${mm}-${dd}`);
    setOpen(false);
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const displayValue = value ? formatDateShort(value) : "";
  const selectedDay = value ? parseInt(value.split("-")[2]) : null;
  const selectedMonth = value ? parseInt(value.split("-")[1]) - 1 : null;
  const selectedYear = value ? parseInt(value.split("-")[0]) : null;

  // Year range: 1940 to today
  const yearRange = Array.from({ length: today.getFullYear() - 1939 }, (_, i) => 1940 + i).reverse();

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-semibold text-text/70 mb-1.5 font-ibm-plex">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full px-4 py-3 rounded-xl border bg-[#F7F5F0] font-ibm-plex text-sm text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${
          open ? "border-primary ring-2 ring-primary/30" : "border-text/20 hover:border-primary/40"
        }`}
      >
        <span className={displayValue ? "text-text font-medium" : "text-text/40"}>
          {displayValue || "Select date of birth"}
        </span>
        <Calendar className={`w-4 h-4 transition ${open ? "text-primary" : "text-primary/60"}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.08 } }}
            transition={{ duration: 0.15 }}
            // Opens UPWARD — bottom-full so it never overlaps the submit button below
            className="absolute bottom-full left-0 mb-2 z-[200] bg-white rounded-2xl shadow-2xl border border-text/10 p-4 w-80"
          >
            {/* Month/Year nav */}
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={prevMonth}
                className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center transition">
                <ChevronLeft className="w-4 h-4 text-primary" />
              </button>
              <div className="flex items-center gap-2">
                <select value={viewMonth} onChange={e => setViewMonth(Number(e.target.value))}
                  className="text-sm font-semibold text-primary bg-transparent focus:outline-none cursor-pointer">
                  {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
                </select>
                <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))}
                  className="text-sm font-semibold text-primary bg-transparent focus:outline-none cursor-pointer">
                  {yearRange.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <button type="button" onClick={nextMonth}
                className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center transition">
                <ChevronRight className="w-4 h-4 text-primary" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                <div key={d} className="text-center text-xs font-semibold text-text/40 py-1">{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isSelected = day === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;
                const isFuture = new Date(viewYear, viewMonth, day) > today;
                return (
                  <button key={day} type="button" disabled={isFuture} onClick={() => selectDay(day)}
                    className={`w-full aspect-square rounded-full text-sm font-ibm-plex flex items-center justify-center transition-all
                      ${isSelected ? "bg-primary text-white font-bold" : ""}
                      ${!isSelected && !isFuture ? "hover:bg-primary/10 text-text" : ""}
                      ${isFuture ? "text-text/25 cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >{day}</button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: RenewalApplication["status"] }) {
  const map: Record<string, { label: string; color: string }> = {
    submitted: { label: "Submitted", color: "bg-blue-100 text-blue-700" },
    under_review: { label: "Under Review", color: "bg-amber-100 text-amber-700" },
    approved: { label: "Approved ✓", color: "bg-green-100 text-green-700" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
    payment_done: { label: "Payment Done", color: "bg-purple-100 text-purple-700" },
    payment_pending: { label: "Payment Pending", color: "bg-orange-100 text-orange-700" },
    draft: { label: "Draft", color: "bg-gray-100 text-gray-600" },
    otp_verified: { label: "OTP Verified", color: "bg-indigo-100 text-indigo-700" },
  };
  const { label, color } = map[status] ?? { label: status, color: "bg-gray-100 text-gray-600" };
  return <span className={`px-3 py-1 rounded-full text-sm font-medium font-mono ${color}`}>{label}</span>;
}

// ── PDF Generator ─────────────────────────────────────────────────────────────
async function generateRenewalPDF(
  licence: MockLicence,
  application: RenewalApplication
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210, H = 297;

  // ── Background ──
  doc.setFillColor(247, 245, 240);
  doc.rect(0, 0, W, H, "F");

  // ── Green header bar ──
  doc.setFillColor(11, 61, 46); // #0B3D2E
  doc.rect(0, 0, W, 45, "F");

  // ── Gold accent stripe ──
  doc.setFillColor(212, 162, 76); // #D4A24C
  doc.rect(0, 45, W, 3, "F");

  // ── Emblem circle ──
  doc.setFillColor(212, 162, 76);
  doc.circle(105, 22, 14, "F");
  doc.setFillColor(11, 61, 46);
  doc.circle(105, 22, 11, "F");
  doc.setFillColor(212, 162, 76);
  doc.circle(105, 22, 7, "F");
  doc.setFillColor(247, 245, 240);
  doc.circle(105, 22, 3.5, "F");

  // ── Header text ──
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("GOVERNMENT OF INDIA", 105, 11, { align: "center" });
  doc.text("MINISTRY OF ROAD TRANSPORT AND HIGHWAYS", 105, 15, { align: "center" });

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("PARIVAHAN SEWA", 105, 36, { align: "center" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("sarathi.parivahan.gov.in", 105, 41, { align: "center" });

  // ── Document title ──
  doc.setTextColor(11, 61, 46);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("DRIVING LICENCE RENEWAL CERTIFICATE", 105, 60, { align: "center" });

  // ── Thin divider ──
  doc.setDrawColor(212, 162, 76);
  doc.setLineWidth(0.5);
  doc.line(20, 64, 190, 64);

  // ── Application info box ──
  doc.setFillColor(11, 61, 46, 0.06);
  doc.setFillColor(230, 240, 235);
  doc.roundedRect(20, 68, 170, 20, 3, 3, "F");

  doc.setTextColor(11, 61, 46);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("APPLICATION ID", 28, 75);
  doc.text("ISSUE DATE", 90, 75);
  doc.text("VALID UNTIL", 145, 75);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(26, 26, 26);
  doc.text(application.applicationId, 28, 82);
  doc.text(formatDateShort(application.updatedAt), 90, 82);
  // Compute new expiry: +5 years from now
  const newExpiry = new Date();
  newExpiry.setFullYear(newExpiry.getFullYear() + 5);
  doc.text(formatDateShort(newExpiry.toISOString()), 145, 82);

  // ── Section: Personal Details ──
  let y = 100;
  doc.setFillColor(11, 61, 46);
  doc.rect(20, y - 5, 4, 14, "F");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(11, 61, 46);
  doc.text("PERSONAL DETAILS", 28, y + 4);

  y += 12;
  doc.setDrawColor(200, 210, 205);
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);
  y += 6;

  const fieldPairs: [string, string, string, string][] = [
    ["Full Name", licence.name, "Father's Name", licence.fatherName],
    ["Date of Birth", formatDate(licence.dateOfBirth), "Blood Group", licence.bloodGroup],
    ["Mobile Number", `+91 ${licence.phoneNumber}`, "Email Address", licence.email],
  ];

  doc.setFontSize(8);
  for (const [l1, v1, l2, v2] of fieldPairs) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text(l1.toUpperCase(), 22, y);
    doc.text(l2.toUpperCase(), 112, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(10);
    doc.text(v1, 22, y);
    doc.text(v2, 112, y);
    y += 8;
    doc.setFontSize(8);
  }

  // Address
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 100);
  doc.text("REGISTERED ADDRESS", 22, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(26, 26, 26);
  doc.setFontSize(10);
  const addressLines = doc.splitTextToSize(licence.address, 160);
  doc.text(addressLines, 22, y);
  y += addressLines.length * 6 + 4;

  // ── Section: Licence Details ──
  doc.setDrawColor(200, 210, 205);
  doc.setLineWidth(0.3);
  doc.line(20, y, 190, y);
  y += 8;

  doc.setFillColor(11, 61, 46);
  doc.rect(20, y - 5, 4, 14, "F");
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(11, 61, 46);
  doc.text("LICENCE DETAILS", 28, y + 4);
  y += 14;

  doc.setFontSize(8);
  const licPairs: [string, string, string, string][] = [
    ["DL Number", licence.dlNumber, "Licence Class", licence.licenceClass.join(", ")],
    ["Original Issue Date", formatDate(licence.issueDate), "Renewed Expiry Date", formatDate(newExpiry.toISOString())],
    ["Issuing Authority", licence.issuingRTO, "Form 1A Required", licence.requiresForm1A ? "Yes" : "No"],
  ];
  for (const [l1, v1, l2, v2] of licPairs) {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text(l1.toUpperCase(), 22, y);
    doc.text(l2.toUpperCase(), 112, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(26, 26, 26);
    doc.setFontSize(10);
    doc.text(v1, 22, y);
    doc.text(v2, 112, y);
    y += 8;
    doc.setFontSize(8);
  }

  // ── Payment info ──
  y += 2;
  doc.setDrawColor(200, 210, 205);
  doc.line(20, y, 190, y);
  y += 8;

  doc.setFillColor(230, 240, 235);
  doc.roundedRect(20, y, 170, 18, 3, 3, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 100);
  doc.text("PAYMENT TRANSACTION ID", 28, y + 6);
  doc.text("AMOUNT PAID", 112, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(26, 26, 26);
  doc.text(application.paymentTransactionId || "N/A", 28, y + 13);
  doc.text(`INR ${application.paymentAmount}.00`, 112, y + 13);
  y += 26;

  // ── Status stamp ──
  doc.setFillColor(74, 222, 128); // success green
  doc.roundedRect(74, y, 62, 12, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("✓  RENEWAL APPROVED", 105, y + 8, { align: "center" });
  y += 20;

  // ── Disclaimer ──
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(130, 130, 130);
  const disclaimer = "This is a digitally generated certificate. It is valid as proof of driving licence renewal as per Motor Vehicles Act, 1988. For verification, visit sarathi.parivahan.gov.in.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, 160);
  doc.text(disclaimerLines, 105, y, { align: "center" });
  y += disclaimerLines.length * 4 + 6;

  // ── Footer bar ──
  doc.setFillColor(11, 61, 46);
  doc.rect(0, H - 16, W, 16, "F");
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("Parivahan Sewa | Ministry of Road Transport & Highways | Government of India", 105, H - 9, { align: "center" });
  doc.setTextColor(212, 162, 76);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN")}`, 105, H - 4, { align: "center" });

  doc.save(`DL_Renewal_${application.applicationId}.pdf`);
}

// ── Main component ───────────────────────────────────────────────────────────
export default function DLRenewalPage() {
  const { lang } = useLang();
  const [step, setStep] = useState<Step>("intro");

  // State selection
  const [selectedState, setSelectedState] = useState("");

  const [dlNumber, setDlNumber] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [devOtp, setDevOtp] = useState<string | null>(null);

  // CAPTCHA
  const [captchaText, setCaptchaText] = useState(() => generateCaptchaText());
  const [captchaInput, setCaptchaInput] = useState("");
  // Consent checkbox
  const [consentChecked, setConsentChecked] = useState(false);

  const [licence, setLicence] = useState<MockLicence | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [application, setApplication] = useState<RenewalApplication | null>(null);
  // Map from docType -> { fileName, uploadedAt }
  const [uploadedDocs, setUploadedDocs] = useState<Map<string, { fileName: string; uploadedAt: string }>>(new Map());

  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [maskedPhone, setMaskedPhone] = useState("");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);


  // Polling
  useEffect(() => {
    if (step !== "tracking" || !applicationId) return;
    if (application?.status === "approved" || application?.status === "rejected") return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/dl/application-status/${applicationId}`);
      const json = await res.json();
      if (json.success) {
        setApplication(json.data.application);
        if (json.data.application.status === "approved" || json.data.application.status === "rejected") {
          clearInterval(interval);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [step, applicationId, application?.status]);

  function clearError() { setError(null); }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    clearError();
    try {
      const res = await fetch("/api/dl/verify-licence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dlNumber: dlNumber.trim(), dateOfBirth: dob }),
      });
      const json = await res.json();
      if (!json.success) { setError(json.error); return; }
      setMaskedPhone(json.data.maskedPhone);
      setDevOtp(json.data._devOtp);
      setStep("otp");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    clearError();
    try {
      const res = await fetch("/api/dl/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dlNumber: dlNumber.trim(), dateOfBirth: dob, otp: otp.join("") }),
      });
      const json = await res.json();
      if (!json.success) { setError(json.error); return; }
      setLicence(json.data.licence);
      setStep("review");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  async function handleSubmit() {
    setLoading(true);
    clearError();
    try {
      const res = await fetch("/api/dl/submit-renewal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dlNumber: dlNumber.trim(), dateOfBirth: dob }),
      });
      const json = await res.json();
      if (!json.success) { setError(json.error); return; }
      setApplicationId(json.data.applicationId);
      setStep("documents");
    } catch { setError("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  const handleUpload = useCallback(async (docType: string, file: File) => {
    if (!applicationId) return;
    try {
      const res = await fetch("/api/dl/upload-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, documentType: docType, fileName: file.name }),
      });
      const json = await res.json();
      if (json.success) {
        setUploadedDocs(prev => {
          const next = new Map(prev);
          next.set(docType, { fileName: file.name, uploadedAt: new Date().toISOString() });
          return next;
        });
      }
    } catch { setError("Upload failed. Please try again."); }
  }, [applicationId]);

  async function handlePayment() {
    if (!applicationId) return;
    setLoading(true);
    clearError();
    try {
      const res = await fetch("/api/dl/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId }),
      });
      const json = await res.json();
      if (!json.success) { setError(json.error); return; }
      const statusRes = await fetch(`/api/dl/application-status/${applicationId}`);
      const statusJson = await statusRes.json();
      if (statusJson.success) setApplication(statusJson.data.application);
      setStep("tracking");
    } catch { setError("Payment failed. Please try again."); }
    finally { setLoading(false); }
  }

  async function handleDownloadPDF() {
    if (!licence || !application) return;
    setPdfLoading(true);
    try {
      await generateRenewalPDF(licence, application);
    } catch (e) {
      console.error(e);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }

  const requiredDocs = licence?.requiresForm1A ? [...REQUIRED_DOCS, FORM_1A_DOC] : REQUIRED_DOCS;
  const allDocsUploaded = requiredDocs.every((d) => uploadedDocs.has(d.type));

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-mono text-text/50 mb-1 uppercase tracking-wider">Online Services</p>
          <h1 className="text-3xl md:text-4xl font-bold font-inter text-primary">Driving Licence Renewal</h1>
          <p className="text-text/60 mt-2 font-ibm-plex">Renew your DL online in a few simple steps — no office visit required.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => {
            const currentIdx = STEP_INDEX[step];
            const done = i < currentIdx;
            const active = i === currentIdx;
            return (
              <div key={s.id} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono font-bold transition-all duration-300 ${done ? "bg-primary text-white" : active ? "bg-accent text-white ring-4 ring-accent/30" : "bg-white text-text/40 border border-text/20"}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1 font-ibm-plex ${active ? "text-accent font-semibold" : done ? "text-primary" : "text-text/40"}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`h-0.5 w-8 md:w-16 mx-1 transition-all duration-500 ${done ? "bg-primary" : "bg-text/15"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm font-ibm-plex"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
              <button onClick={clearError} className="ml-auto text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* ── STEP: Intro (Before You Start) ── */}
          {step === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-text/8 overflow-hidden">
                <div className="bg-primary p-8 text-white">
                  <h2 className="text-2xl font-bold font-inter mb-2">{t(lang, "bys_heading")}</h2>
                  <p className="text-white/80 font-ibm-plex">{t(lang, "bys_subtitle")}</p>
                </div>
                
                <div className="p-8 space-y-8">
                  {/* Key Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Timer className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Time</h4>
                        <p className="text-sm text-text/70">{t(lang, "bys_time")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Wallet className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">Fee</h4>
                        <p className="text-sm text-text/70">{t(lang, "bys_fee")}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">RTO Visit</h4>
                        <p className="text-sm text-text/70">{t(lang, "bys_rto")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="font-bold text-lg font-inter text-primary mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {t(lang, "bys_docs_heading")}
                    </h3>
                    <ul className="space-y-3 font-ibm-plex text-sm text-text/80">
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> {t(lang, "bys_doc1")}</li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> {t(lang, "bys_doc2")}</li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> {t(lang, "bys_doc3")}</li>
                      <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-success flex-shrink-0" /> {t(lang, "bys_doc4")}</li>
                    </ul>
                  </div>
                  
                  {/* Steps */}
                  <div className="bg-[#F7F5F0] rounded-xl p-6 border border-text/10">
                    <h3 className="font-bold text-lg font-inter text-primary mb-4 flex items-center gap-2">
                      <ListChecks className="w-5 h-5" />
                      {t(lang, "bys_steps_heading")}
                    </h3>
                    <ol className="list-decimal pl-5 space-y-2 font-ibm-plex text-sm text-text/80">
                      <li>{t(lang, "bys_step1")}</li>
                      <li>{t(lang, "bys_step2")}</li>
                      <li>{t(lang, "bys_step3")}</li>
                      <li>{t(lang, "bys_step4")}</li>
                      <li>{t(lang, "bys_step5")}</li>
                      <li>{t(lang, "bys_step6")}</li>
                    </ol>
                  </div>
                  
                  <button onClick={() => setStep("state")}
                    className="w-full py-4 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all text-lg shadow-sm">
                    {t(lang, "bys_cta")}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 0: State Selection ── */}
          {step === "state" && (
            <motion.div key="state" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-text/8 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-inter text-primary">Select your State / UT</h2>
                  <p className="text-sm text-text/60 font-ibm-plex">Services are managed by your state RTO</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-text/70 mb-1.5 font-ibm-plex">State / Union Territory</label>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={e => setSelectedState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-ibm-plex text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition appearance-none cursor-pointer pr-10"
                  >
                    <option value="">— Select your state —</option>
                    {INDIAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronRight className="w-4 h-4 text-primary/50 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* State selected — show appropriate card */}
              <AnimatePresence mode="wait">
                {selectedState && selectedState !== LIVE_STATE && (
                  <motion.div key="unavailable"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3"
                  >
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-800 font-ibm-plex text-sm">Currently available for Karnataka</p>
                      <p className="text-amber-700 text-xs font-ibm-plex mt-0.5">
                        <span className="font-semibold">{selectedState}</span> is not yet onboarded. We are rolling out across all states — more coming soon.
                      </p>
                    </div>
                  </motion.div>
                )}
                {selectedState === LIVE_STATE && (
                  <motion.div key="available"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800 font-ibm-plex text-sm">Karnataka — Online Renewal Available</p>
                      <p className="text-green-700 text-xs font-ibm-plex mt-0.5">All DL services for Karnataka are fully operational through Parivahan Sewa.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => { if (selectedState === LIVE_STATE) setStep("verify"); }}
                disabled={!selectedState || selectedState !== LIVE_STATE}
                className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
                {!selectedState ? "Select a state to continue" : selectedState !== LIVE_STATE ? `${selectedState} not yet available` : "Continue to DL Renewal"}
              </button>
            </motion.div>
          )}

          {/* ── STEP 1: Verify ── */}
          {step === "verify" && (
            <motion.div key="verify" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-text/8 p-8">
              {/* State badge */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold font-inter text-primary mb-1">Enter your licence details</h2>
                  <p className="text-sm text-text/60 font-ibm-plex">Enter your DL number and date of birth exactly as on your licence.</p>
                </div>
                <button type="button" onClick={() => setStep("state")}
                  className="flex items-center gap-1.5 text-xs font-semibold font-ibm-plex text-primary/60 hover:text-primary border border-primary/20 rounded-full px-3 py-1.5 transition">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedState}
                </button>
              </div>
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold text-text/50 uppercase tracking-wider font-ibm-plex mb-2">Click a demo record to auto-fill</p>
                <button type="button"
                  onClick={() => { setDlNumber("MH01 2011 0012345"); setDob("1975-04-12"); clearError(); }}
                  className="w-full text-left bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 rounded-xl p-3.5 text-sm font-ibm-plex transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-primary">MH01 2011 0012345</span>
                      <span className="text-text/50 mx-2">·</span>
                      <span className="font-mono text-text/70">1975-04-12</span>
                    </div>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Form 1A required</span>
                  </div>
                  <p className="text-xs text-text/40 mt-1 group-hover:text-primary/60 transition">Rajesh Kumar Sharma · Mumbai</p>
                </button>
                <button type="button"
                  onClick={() => { setDlNumber("DL04 2022 0098765"); setDob("2002-09-25"); clearError(); }}
                  className="w-full text-left bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 rounded-xl p-3.5 text-sm font-ibm-plex transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-primary">DL04 2022 0098765</span>
                      <span className="text-text/50 mx-2">·</span>
                      <span className="font-mono text-text/70">2002-09-25</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Standard renewal</span>
                  </div>
                  <p className="text-xs text-text/40 mt-1 group-hover:text-primary/60 transition">Priya Mehta · New Delhi</p>
                </button>
              </div>
              <form onSubmit={handleVerify} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-text/70 mb-1.5 font-ibm-plex">Driving Licence Number</label>
                  <input
                    type="text" value={dlNumber}
                    onChange={(e) => setDlNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. MH01 2011 0012345" required
                    className="w-full px-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                  />
                </div>
                <DatePicker value={dob} onChange={setDob} label="Date of Birth" />

                {/* ── CAPTCHA ── */}
                <div>
                  <label className="block text-sm font-semibold text-text/70 mb-1.5 font-ibm-plex">
                    Enter the characters shown below
                  </label>
                  <CaptchaDisplay text={captchaText} />
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value.toUpperCase())}
                      placeholder="Type the characters above"
                      required
                      maxLength={6}
                      className="flex-1 px-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-mono text-sm uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                    />
                    <button
                      type="button"
                      onClick={() => { setCaptchaText(generateCaptchaText()); setCaptchaInput(""); }}
                      className="px-3 py-2 rounded-xl border border-text/20 bg-[#F7F5F0] hover:bg-primary/10 transition text-primary/60 hover:text-primary"
                      title="Refresh CAPTCHA"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ── Consent checkbox ── */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={consentChecked}
                      onChange={e => setConsentChecked(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${consentChecked ? "bg-primary border-primary" : "border-text/30 bg-[#F7F5F0] group-hover:border-primary/50"}`}>
                      {consentChecked && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm text-text/70 font-ibm-plex leading-relaxed">
                    I accept the{" "}
                    <a href="/coming-soon" className="text-primary font-semibold underline underline-offset-2 hover:text-accent transition">Privacy Policy</a>
                    {" "}and{" "}
                    <a href="/coming-soon" className="text-primary font-semibold underline underline-offset-2 hover:text-accent transition">Terms of Service</a>
                    {" "}for processing of my personal data by the Ministry of Road Transport and Highways.
                  </span>
                </label>

                <button type="submit" disabled={loading || !dob || !captchaInput || !consentChecked}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                  {loading ? "Verifying..." : "Verify & Send OTP"}
                </button>
              </form>
            </motion.div>
          )}

          {/* ── STEP 2: OTP ── */}
          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-text/8 p-8">
              <h2 className="text-xl font-bold font-inter text-primary mb-1">Enter OTP</h2>
              <p className="text-sm text-text/60 font-ibm-plex mb-2">A 6-digit OTP has been sent to <span className="font-mono font-semibold text-text">{maskedPhone}</span></p>
              {devOtp && (
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-sm font-ibm-plex text-amber-800">
                  <span className="font-semibold">Your OTP: </span>
                  <span className="font-mono font-bold text-lg tracking-widest">{devOtp}</span>
                </div>
              )}
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, i) => (
                    <input key={i} ref={(el) => { otpRefs.current[i] = el; }}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const newOtp = [...otp]; newOtp[i] = val; setOtp(newOtp);
                        if (val && i < 5) otpRefs.current[i + 1]?.focus();
                      }}
                      onKeyDown={(e) => { if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus(); }}
                      className="w-12 h-14 text-center text-2xl font-mono font-bold border-2 border-text/20 rounded-xl bg-[#F7F5F0] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                    />
                  ))}
                </div>
                <button type="submit" disabled={loading || otp.join("").length < 6}
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60">
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                  {loading ? "Verifying OTP..." : "Confirm OTP"}
                </button>
              </form>
            </motion.div>
          )}

          {/* ── STEP 3: Review ── */}
          {step === "review" && licence && (
            <motion.div key="review" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-text/8 p-8">
                <h2 className="text-xl font-bold font-inter text-primary mb-4">Review your licence details</h2>
                <p className="text-sm text-text/60 font-ibm-plex mb-6">Please verify the information below before proceeding.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InfoRow icon={<User />} label="Full Name" value={licence.name} />
                  <InfoRow icon={<Calendar />} label="Date of Birth" value={formatDate(licence.dateOfBirth)} />
                  <InfoRow icon={<FileText />} label="DL Number" value={licence.dlNumber} mono />
                  <InfoRow icon={<Droplet />} label="Blood Group" value={licence.bloodGroup} />
                  <InfoRow icon={<Car />} label="Licence Class" value={licence.licenceClass.join(", ")} />
                  <InfoRow icon={<Calendar />} label="Expiry Date" value={formatDate(licence.expiryDate)} />
                  <InfoRow icon={<MapPin />} label="Issuing RTO" value={licence.issuingRTO} />
                  <InfoRow icon={<Phone />} label="Phone" value={`+91 XXXXXX${licence.phoneNumber.slice(-4)}`} />
                  <div className="md:col-span-2"><InfoRow icon={<MapPin />} label="Address" value={licence.address} /></div>
                </div>
                {licence.requiresForm1A && (
                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-sm font-ibm-plex text-amber-800">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Form 1A Required</p>
                      <p className="text-amber-700 mt-0.5">As you are above 40 years of age, a medical fitness certificate (Form 1A) signed by a registered medical practitioner is required for renewal.</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-text/8 p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-text/60 font-ibm-plex">Renewal Fee</p>
                  <p className="text-3xl font-bold font-mono text-primary">₹200</p>
                  <p className="text-xs text-text/40 font-ibm-plex mt-0.5">Inclusive of all applicable charges</p>
                </div>
                <button onClick={handleSubmit} disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60">
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                  {loading ? "Creating Application..." : "Proceed to Documents"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Documents ── */}
          {step === "documents" && applicationId && (
            <motion.div key="documents" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-text/8 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold font-inter text-primary">Required Documents Checklist</h2>
                    <p className="text-sm text-text/60 font-ibm-plex mt-1">Application ID: <span className="font-mono font-bold text-primary">{applicationId}</span></p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F7F5F0] px-3 py-1.5 rounded-lg border border-text/10">
                    <span className="text-sm font-semibold text-primary font-mono">{uploadedDocs.size} / {requiredDocs.length}</span>
                    <span className="text-xs text-text/50 uppercase tracking-wider font-bold">Uploaded</span>
                  </div>
                </div>
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                   {requiredDocs.map(doc => {
                     const isUploaded = uploadedDocs.has(doc.type);
                     return (
                       <div key={"check-"+doc.type} className={`flex items-center gap-3 p-3 rounded-xl border ${isUploaded ? "bg-success/5 border-success/30 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"} transition-colors`}>
                         {isUploaded ? <CheckCircle className="w-5 h-5 flex-shrink-0 text-success" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                         <span className="text-sm font-ibm-plex font-medium">{doc.label}</span>
                       </div>
                     );
                   })}
                </div>
                <div className="space-y-4">
                  {requiredDocs.map((doc) => (
                    <DocUploadRow
                      key={doc.type} label={doc.label} hint={doc.hint}
                      uploadInfo={uploadedDocs.get(doc.type) || null}
                      onUpload={(file) => handleUpload(doc.type, file)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep("payment")} disabled={!allDocsUploaded || loading}
                  className="px-8 py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60">
                  <CreditCard className="w-4 h-4" /> Proceed to Payment
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 5: Payment ── */}
          {step === "payment" && applicationId && (
            <motion.div key="payment" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-text/8 p-8">
              <h2 className="text-xl font-bold font-inter text-primary mb-1">Payment</h2>
              <p className="text-sm text-text/60 font-ibm-plex mb-6">Review and confirm your renewal payment.</p>
              <div className="bg-[#F7F5F0] rounded-xl p-5 mb-6 space-y-3 font-ibm-plex">
                <div className="flex justify-between text-sm"><span className="text-text/60">Application ID</span><span className="font-mono font-bold text-primary">{applicationId}</span></div>
                <div className="flex justify-between text-sm"><span className="text-text/60">Service</span><span className="font-semibold">DL Renewal</span></div>
                <div className="flex justify-between text-sm"><span className="text-text/60">Applicant</span><span className="font-semibold">{licence?.name}</span></div>
                <div className="border-t border-text/10 pt-3 flex justify-between"><span className="font-semibold text-text">Total Amount</span><span className="font-mono font-bold text-xl text-primary">₹200.00</span></div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 mb-6 text-sm font-ibm-plex text-green-800">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>This is a secure mock payment. No actual transaction will be made.</span>
              </div>
              <button onClick={handlePayment} disabled={loading}
                className="w-full py-4 rounded-xl bg-accent text-white font-bold font-ibm-plex flex items-center justify-center gap-2 hover:bg-accent/90 active:scale-[0.99] transition-all disabled:opacity-60 text-lg">
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                {loading ? "Processing Payment..." : "Pay ₹200 Now"}
              </button>
            </motion.div>
          )}

          {/* ── STEP 6: Tracking ── */}
          {step === "tracking" && application && (
            <motion.div key="tracking" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.2 }} className="space-y-6">
              <div className={`rounded-2xl p-8 text-white transition-all duration-700 ${application.status === "approved" ? "bg-gradient-to-br from-green-600 to-green-800" : "bg-gradient-to-br from-primary to-primary/80"}`}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/70 font-ibm-plex text-sm">Application ID</p>
                  <StatusBadge status={application.status} />
                </div>
                <p className="font-mono font-bold text-2xl mb-1">{application.applicationId}</p>
                <p className="text-white/70 font-ibm-plex text-sm">{application.applicantName}</p>
                {application.status === "under_review" && (
                  <div className="mt-5 flex items-center gap-2 text-white/80 font-ibm-plex text-sm">
                    <Clock className="w-4 h-4 animate-pulse" />
                    <span>Your application is under review — typically approved within seconds during demo...</span>
                  </div>
                )}
                {application.status === "approved" && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 flex items-center gap-2 text-green-100 font-ibm-plex">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Congratulations! Your DL renewal has been approved.</span>
                  </motion.div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-text/8 p-6">
                <h3 className="font-bold font-inter text-primary mb-4">Application Timeline</h3>
                
                {(() => {
                  const stages = [
                    { id: "submitted", label: "Submitted" },
                    { id: "docs", label: "Documents Verified" },
                    { id: "payment", label: "Payment Completed" },
                    { id: "rto", label: "RTO Verification" },
                    { id: "completed", label: "Completed" },
                  ];
                  
                  let activeIdx = 0;
                  let nextAction = "";
                  
                  switch (application.status) {
                    case "submitted": activeIdx = 0; nextAction = "Action needed: upload required documents"; break;
                    case "payment_pending": activeIdx = 1; nextAction = "Action needed: complete payment of fee"; break;
                    case "payment_done": 
                    case "under_review": activeIdx = 2; nextAction = "No action required. We'll notify you when something changes."; break;
                    case "approved": activeIdx = 4; nextAction = "Action needed: download your renewed licence certificate."; break;
                    default: activeIdx = 0; nextAction = "No action required at this time."; break;
                  }

                  return (
                    <div className="space-y-0">
                      {stages.map((stage, i) => {
                        const isCompleted = i <= activeIdx && application.status === "approved" ? true : i < activeIdx;
                        const isCurrent = i === activeIdx && application.status !== "approved";
                        const isFuture = i > activeIdx;
                        
                        return (
                          <div key={stage.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${isCompleted ? "bg-success" : isCurrent ? "border-2 border-primary animate-pulse" : "bg-text/20"}`} />
                              {i < stages.length - 1 && <div className={`w-0.5 h-10 mt-1 ${isCompleted ? "bg-success/50" : "bg-text/10"}`} />}
                            </div>
                            <div className="pb-4">
                              <p className={`font-semibold text-sm font-ibm-plex ${isCompleted || isCurrent ? "text-primary" : "text-text/40"}`}>{stage.label}</p>
                              {isCurrent && (
                                <p className="text-xs text-text/60 mt-1 font-ibm-plex font-medium">
                                  {nextAction.includes("Action needed") ? (
                                    <span className="text-amber-600 flex items-center gap-1 mt-0.5">
                                      <AlertCircle className="w-3.5 h-3.5" />
                                      {nextAction}
                                    </span>
                                  ) : (
                                    <span className="text-primary/60 flex items-center gap-1 mt-0.5">
                                      <Clock className="w-3.5 h-3.5" />
                                      {nextAction}
                                    </span>
                                  )}
                                </p>
                              )}
                              {i === stages.length - 1 && application.status === "approved" && (
                                <p className="text-xs text-success flex items-center gap-1 mt-1.5 font-ibm-plex font-semibold">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  Application Approved — download certificate below
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {application.status === "approved" && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={handleDownloadPDF} disabled={pdfLoading}
                  className="w-full py-4 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-60">
                  {pdfLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  {pdfLoading ? "Generating PDF..." : "Download Renewed Licence Certificate (PDF)"}
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────
function InfoRow({ icon, label, value, mono = false }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="text-primary/50 mt-0.5 w-4 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-text/50 font-ibm-plex uppercase tracking-wide">{label}</p>
        <p className={`text-sm font-semibold text-text mt-0.5 ${mono ? "font-mono" : "font-ibm-plex"}`}>{value}</p>
      </div>
    </div>
  );
}

function DocUploadRow({
  label, hint, uploadInfo, onUpload,
}: {
  label: string;
  hint: string;
  uploadInfo: { fileName: string; uploadedAt: string } | null;
  onUpload: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploaded = !!uploadInfo;

  return (
    <div className={`p-4 rounded-xl border transition-all ${uploaded ? "border-green-300 bg-green-50" : "border-text/15 bg-[#F7F5F0] hover:border-primary/40"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${uploaded ? "bg-green-500" : "bg-primary/10"}`}>
            {uploaded ? <CheckCircle className="w-4 h-4 text-white" /> : <Upload className="w-4 h-4 text-primary" />}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold font-ibm-plex text-text">{label}</p>
            <p className="text-xs text-text/50 font-ibm-plex">{hint}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-3">
          {uploaded && (
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold font-ibm-plex border border-text/20 bg-white text-text/70 hover:border-primary/40 hover:text-primary transition"
            >
              <RotateCcw className="w-3 h-3" /> Re-upload
            </button>
          )}
          {!uploaded && (
            <button onClick={() => inputRef.current?.click()}
              className="px-4 py-2 rounded-lg text-sm font-semibold font-ibm-plex bg-primary text-white hover:bg-primary/90 transition">
              Upload
            </button>
          )}
        </div>
      </div>
      {/* File info row */}
      {uploaded && uploadInfo && (
        <div className="mt-3 ml-11 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <span className="text-xs font-mono text-green-800 truncate max-w-[200px]" title={uploadInfo.fileName}>
            {uploadInfo.fileName}
          </span>
          <span className="text-xs text-green-600/70 font-ibm-plex flex-shrink-0">
            · {new Date(uploadInfo.uploadedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      )}
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
        onChange={(e) => { const file = e.target.files?.[0]; if (file) { onUpload(file); e.target.value = ""; } }}
      />
    </div>
  );
}
