"use client";

import { useState, useRef, useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Fingerprint,
  Phone,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  X,
  User,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";
import { useSession } from "@/lib/sessionContext";
import { mockAadhaarRecords } from "@/lib/mockData";
import ThemedLoader from "@/components/ThemedLoader";
// ── OTP input box (reusable) ─────────────────────────────────────────────────
function OtpInput({
  value,
  onChange,
  error,
  autoFocus = false,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
  autoFocus?: boolean;
}) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <div>
      <div className="flex gap-3 justify-center">
        {value.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            autoFocus={autoFocus && i === 0}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              const next = [...value];
              next[i] = val;
              onChange(next);
              if (val && i < 5) refs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
            }}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
              if (pasted.length > 0) {
                const next = value.map((_, j) => pasted[j] ?? "");
                onChange(next);
                refs.current[Math.min(pasted.length, 5)]?.focus();
              }
            }}
            className={`w-11 h-13 text-center text-xl font-mono font-bold border-2 rounded-xl bg-[#F7F5F0] focus:outline-none focus:ring-2 transition ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-200 text-red-600"
                : "border-text/20 focus:border-primary focus:ring-primary/20"
            }`}
            style={{ height: "3.25rem", width: "2.75rem" }}
          />
        ))}
      </div>
      {error && (
        <p className="flex items-center justify-center gap-1.5 mt-2 text-red-600 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

// ── Inline field error ───────────────────────────────────────────────────────
function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1.5 mt-1 text-red-600 text-xs font-medium">
      <AlertCircle className="w-3 h-3" /> {msg}
    </p>
  );
}

// ── Main inner component ─────────────────────────────────────────────────────
function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnPath = searchParams.get("return") || "/my-parivahan";
  const { session, login } = useSession();

  // Redirect away if already logged in
  useEffect(() => {
    if (session.isLoggedIn) router.replace(returnPath);
  }, [session.isLoggedIn, router, returnPath]);

  // ── Top-level path ───────────────────────────────────────────────────────
  type AuthPath = "chooser" | "aadhaar" | "manual";
  const [path, setPath] = useState<AuthPath>("chooser");

  // ── Shared OTP state ─────────────────────────────────────────────────────
  const emptyOtp = () => ["", "", "", "", "", ""];

  // ── Global error banner ──────────────────────────────────────────────────
  const [globalError, setGlobalError] = useState<string | null>(null);
  const clearError = useCallback(() => setGlobalError(null), []);

  // ════════════════════════════════════════════════════════════════════════
  // PATH A — Aadhaar verification
  // ════════════════════════════════════════════════════════════════════════
  type AadhaarStep = "aadhaar-input" | "aadhaar-otp";
  const [aadhaarStep, setAadhaarStep] = useState<AadhaarStep>("aadhaar-input");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarOtp, setAadhaarOtp] = useState(emptyOtp());
  const [aadhaarOtpError, setAadhaarOtpError] = useState<string | undefined>();
  const [aadhaarDevOtp, setAadhaarDevOtp] = useState<string | null>(null);
  const [aadhaarMasked, setAadhaarMasked] = useState("");
  const [aadhaarMaskedMobile, setAadhaarMaskedMobile] = useState("");
  const [aadhaarLoading, setAadhaarLoading] = useState(false);

  async function handleSendAadhaarOtp(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const cleaned = aadhaarNumber.replace(/[\s-]/g, "");
    if (!/^\d{12}$/.test(cleaned)) {
      setGlobalError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setAadhaarLoading(true);
    try {
      const res = await fetch("/api/auth/send-aadhaar-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: cleaned }),
      });
      const json = await res.json();
      if (!json.success) { setGlobalError(json.error); return; }
      setAadhaarMasked(json.data.maskedAadhaar);
      setAadhaarMaskedMobile(json.data.maskedMobile);
      setAadhaarDevOtp(json.data._devOtp);
      setAadhaarStep("aadhaar-otp");
    } catch {
      setGlobalError("Network error. Please try again.");
    } finally { setAadhaarLoading(false); }
  }

  async function handleVerifyAadhaarOtp(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const otpStr = aadhaarOtp.join("");
    if (otpStr.length < 6 || !/^\d{6}$/.test(otpStr)) {
      setAadhaarOtpError("Please enter all 6 digits.");
      return;
    }
    setAadhaarLoading(true);
    try {
      const res = await fetch("/api/auth/verify-aadhaar-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: aadhaarNumber.replace(/[\s-]/g, ""), otp: otpStr }),
      });
      const json = await res.json();
      if (!json.success) { setAadhaarOtpError(json.error); return; }
      const d = json.data;
      login({
        mobileNumber: d.mobileNumber,
        sessionId: d.sessionId,
        name: d.name,
        dateOfBirth: d.dateOfBirth,
        address: d.address,
        linkedDL: d.linkedDLNumber,
        loginMethod: "aadhaar",
      });
      router.replace(returnPath);
    } catch {
      setAadhaarOtpError("Network error. Please try again.");
    } finally { setAadhaarLoading(false); }
  }

  // ════════════════════════════════════════════════════════════════════════
  // PATH B — Mobile Sign In / Sign Up
  // ════════════════════════════════════════════════════════════════════════
  type ManualStep = "mobile" | "mobile-otp" | "signup-profile";
  const [manualStep, setManualStep] = useState<ManualStep>("mobile");
  const [mobile, setMobile] = useState("");
  const [mobileOtp, setMobileOtp] = useState(emptyOtp());
  const [mobileOtpError, setMobileOtpError] = useState<string | undefined>();
  const [mobileDevOtp, setMobileDevOtp] = useState<string | null>(null);
  const [manualLoading, setManualLoading] = useState(false);

  // Sign-up profile fields
  const [signupName, setSignupName] = useState("");
  const [signupDob, setSignupDob] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [showSignupAddress, setShowSignupAddress] = useState(false);

  async function handleSendMobileOtp(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const cleaned = mobile.replace(/\s+/g, "");
    if (!/^\d{10}$/.test(cleaned)) {
      setGlobalError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setManualLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: cleaned }),
      });
      const json = await res.json();
      if (!json.success) { setGlobalError(json.error); return; }
      setMobileDevOtp(json.data._devOtp);
      setManualStep("mobile-otp");
    } catch {
      setGlobalError("Network error. Please try again.");
    } finally { setManualLoading(false); }
  }

  async function handleVerifyMobileOtp(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const otpStr = mobileOtp.join("");
    if (otpStr.length < 6 || !/^\d{6}$/.test(otpStr)) {
      setMobileOtpError("Please enter all 6 digits.");
      return;
    }
    setManualLoading(true);
    try {
      const verifyRes = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber: mobile.replace(/\s+/g, ""), otp: otpStr }),
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) { setMobileOtpError(verifyJson.error); return; }

      const sessionId = verifyJson.data.sessionId;
      const cleaned = mobile.replace(/\s+/g, "");

      // Check if this mobile has a stored profile (returning vs new user)
      const profileRes = await fetch(`/api/auth/user-profile?mobile=${cleaned}`);
      const profileJson = await profileRes.json();

      if (profileJson.success && profileJson.data.exists) {
        // Returning user — log in immediately
        const p = profileJson.data.profile;
        login({
          mobileNumber: cleaned,
          sessionId,
          name: p.name,
          dateOfBirth: p.dateOfBirth,
          address: p.address,
          linkedDL: null,
          loginMethod: "manual",
        });
        router.replace(returnPath);
      } else {
        // New user — collect profile details
        setManualStep("signup-profile");
        // Store sessionId temporarily for use in signup submit
        sessionStorage.setItem("_pendingSessionId", sessionId);
      }
    } catch {
      setMobileOtpError("Network error. Please try again.");
    } finally { setManualLoading(false); }
  }

  async function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    const errors: Record<string, string> = {};
    if (!signupName.trim() || signupName.trim().length < 2) errors.name = "Full name is required (min 2 characters).";
    if (!signupDob) errors.dob = "Date of birth is required.";
    if (!signupAddress.trim() || signupAddress.trim().length < 10) errors.address = "Please enter your full address (min 10 characters).";
    if (Object.keys(errors).length > 0) { setSignupErrors(errors); return; }

    const cleaned = mobile.replace(/\s+/g, "");
    const sessionId = sessionStorage.getItem("_pendingSessionId") || "sess-fallback";

    setManualLoading(true);
    try {
      const res = await fetch("/api/auth/user-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber: cleaned,
          name: signupName.trim(),
          dateOfBirth: signupDob,
          address: signupAddress.trim(),
        }),
      });
      const json = await res.json();
      if (!json.success) { setGlobalError(json.error); return; }

      sessionStorage.removeItem("_pendingSessionId");
      login({
        mobileNumber: cleaned,
        sessionId,
        name: signupName.trim(),
        dateOfBirth: signupDob,
        address: signupAddress.trim(),
        linkedDL: null,
        loginMethod: "manual",
      });
      router.replace(returnPath);
    } catch {
      setGlobalError("Network error. Please try again.");
    } finally { setManualLoading(false); }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F0] to-[#EEE9E0] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl border border-text/8 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="bg-primary px-8 pt-10 pb-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-mono">Parivahan Sewa</p>
                <h1 className="text-xl font-bold font-inter leading-tight">
                  {path === "chooser" ? "Sign In / Register"
                    : path === "aadhaar"
                      ? aadhaarStep === "aadhaar-input" ? "Aadhaar Verification" : "Enter OTP"
                      : manualStep === "mobile" ? "Enter Mobile Number"
                      : manualStep === "mobile-otp" ? "Verify Mobile"
                      : "Complete Your Profile"}
                </h1>
              </div>
            </div>
            <p className="text-white/65 text-sm font-ibm-plex">
              {path === "chooser" && "Choose how you'd like to identify yourself."}
              {path === "aadhaar" && aadhaarStep === "aadhaar-input" && "Aadhaar verification auto-fills your full profile."}
              {path === "aadhaar" && aadhaarStep === "aadhaar-otp" && `OTP sent to ${aadhaarMaskedMobile} (linked to Aadhaar ${aadhaarMasked}).`}
              {path === "manual" && manualStep === "mobile" && "We'll send a verification code to your mobile."}
              {path === "manual" && manualStep === "mobile-otp" && "Enter the 6-digit code sent to your mobile."}
              {path === "manual" && manualStep === "signup-profile" && "A few more details to set up your Parivahan profile."}
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-7">
            {/* Return path hint */}
            {returnPath !== "/" && returnPath !== "/my-parivahan" && (
              <div className="mb-5 bg-primary/5 border border-primary/15 rounded-xl px-4 py-2.5 text-sm font-ibm-plex text-primary/80">
                <span className="font-semibold">Continuing to: </span>
                <span className="font-mono">{returnPath}</span>
              </div>
            )}

            {/* Global error banner */}
            <AnimatePresence>
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm font-ibm-plex"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{globalError}</span>
                  <button onClick={clearError}><X className="w-4 h-4 text-red-400" /></button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* ── PATH CHOOSER ── */}
              {path === "chooser" && (
                <motion.div key="chooser"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Path A — Aadhaar */}
                  <button
                    onClick={() => setPath("aadhaar")}
                    className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all group text-left"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition">
                      <Fingerprint className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-primary font-inter">Verify with Aadhaar</p>
                      <p className="text-sm text-text/60 font-ibm-plex mt-0.5">
                        Instant — auto-fills your name, DOB, address and linked DL if any.
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-green-100 text-green-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Recommended</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-primary/40 ml-auto mt-1 flex-shrink-0" />
                  </button>

                  {/* Path B — Mobile */}
                  <button
                    onClick={() => setPath("manual")}
                    className="w-full flex items-start gap-4 p-5 rounded-2xl border-2 border-text/15 hover:border-text/30 hover:bg-text/[0.02] transition-all group text-left"
                  >
                    <div className="w-10 h-10 bg-text/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-text/10 transition">
                      <Phone className="w-5 h-5 text-text/70" />
                    </div>
                    <div>
                      <p className="font-bold text-text font-inter">Sign In / Sign Up with Mobile</p>
                      <p className="text-sm text-text/60 font-ibm-plex mt-0.5">
                        Use your phone number. New users will fill in profile details once.
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text/30 ml-auto mt-1 flex-shrink-0" />
                  </button>

                  {/* Aadhaar demo hint */}
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs font-ibm-plex text-amber-800">
                    <p className="font-bold mb-2">Demo Aadhaar Numbers</p>
                    <div className="space-y-1">
                      {mockAadhaarRecords.map((r) => (
                        <div key={r.aadhaarNumber} className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              setAadhaarNumber(r.aadhaarNumber);
                              setPath("aadhaar");
                            }}
                            className="font-mono font-bold hover:text-amber-900 underline"
                          >
                            {r.aadhaarNumber}
                          </button>
                          <span className="text-amber-700">
                            {r.name.split(" ")[0]}
                            {r.linkedDLNumber ? " · has DL" : " · no DL"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-amber-600">Any 6-digit OTP is accepted.</p>
                  </div>
                </motion.div>
              )}

              {/* ── PATH A: AADHAAR INPUT ── */}
              {path === "aadhaar" && aadhaarStep === "aadhaar-input" && (
                <motion.form key="aadhaar-input"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSendAadhaarOtp} className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-1.5 font-ibm-plex">
                      Aadhaar Number
                    </label>
                    <div className="relative">
                      <Fingerprint className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={14}
                        value={aadhaarNumber
                          .replace(/\D/g, "")
                          .slice(0, 12)
                          .replace(/(.{4})(.{4})(.{4})/, "$1 $2 $3")}
                        onChange={(e) => {
                          setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12));
                          clearError();
                        }}
                        placeholder="XXXX XXXX XXXX"
                        autoFocus
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition tracking-widest"
                      />
                    </div>
                    <p className="text-xs text-text/50 mt-1.5 font-ibm-plex">
                      12-digit number from your Aadhaar card. Any 6-digit OTP will be accepted in this demo.
                    </p>
                  </div>

                  <button type="submit" disabled={aadhaarLoading || aadhaarNumber.replace(/\D/g, "").length < 12}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {aadhaarLoading ? <ThemedLoader size="sm" /> : <ChevronRight className="w-4 h-4" />}
                    {aadhaarLoading ? "Sending OTP…" : "Send OTP"}
                  </button>

                  <button type="button" onClick={() => { setPath("chooser"); clearError(); }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-text/50 hover:text-text transition font-ibm-plex"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to sign-in options
                  </button>
                </motion.form>
              )}

              {/* ── PATH A: AADHAAR OTP ── */}
              {path === "aadhaar" && aadhaarStep === "aadhaar-otp" && (
                <motion.form key="aadhaar-otp"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyAadhaarOtp} className="space-y-6"
                >
                  {aadhaarDevOtp && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm font-ibm-plex text-amber-800">
                      <span className="font-semibold">Demo OTP: </span>
                      <span className="font-mono font-bold text-lg tracking-widest">{aadhaarDevOtp}</span>
                      <p className="text-xs text-amber-600 mt-1">Any 6-digit code is accepted.</p>
                    </div>
                  )}

                  <OtpInput value={aadhaarOtp} onChange={setAadhaarOtp} error={aadhaarOtpError} autoFocus />

                  <button type="submit" disabled={aadhaarLoading || aadhaarOtp.join("").length < 6}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    {aadhaarLoading ? <ThemedLoader size="sm" /> : <CheckCircle className="w-4 h-4" />}
                    {aadhaarLoading ? "Verifying…" : "Verify & Sign In"}
                  </button>

                  <button type="button" onClick={() => { setAadhaarStep("aadhaar-input"); setAadhaarOtp(emptyOtp()); setAadhaarOtpError(undefined); clearError(); }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-text/50 hover:text-text transition font-ibm-plex"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Aadhaar number
                  </button>
                </motion.form>
              )}

              {/* ── PATH B: MOBILE INPUT ── */}
              {path === "manual" && manualStep === "mobile" && (
                <motion.form key="mobile"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSendMobileOtp} className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-1.5 font-ibm-plex">Mobile Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50 font-ibm-plex text-sm font-semibold select-none">+91</span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); clearError(); }}
                        placeholder="10-digit mobile number"
                        autoFocus
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-ibm-plex text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                      />
                      <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                    </div>
                    <p className="text-xs text-text/50 mt-1.5 font-ibm-plex">New user? We&apos;ll set up your profile after verification.</p>
                  </div>

                  <button type="submit" disabled={manualLoading || mobile.length !== 10}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {manualLoading ? <ThemedLoader size="sm" /> : <ChevronRight className="w-4 h-4" />}
                    {manualLoading ? "Sending OTP…" : "Send OTP"}
                  </button>

                  <button type="button" onClick={() => { setPath("chooser"); clearError(); }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-text/50 hover:text-text transition font-ibm-plex"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to sign-in options
                  </button>
                </motion.form>
              )}

              {/* ── PATH B: MOBILE OTP ── */}
              {path === "manual" && manualStep === "mobile-otp" && (
                <motion.form key="mobile-otp"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleVerifyMobileOtp} className="space-y-6"
                >
                  {mobileDevOtp && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm font-ibm-plex text-amber-800">
                      <span className="font-semibold">Demo OTP: </span>
                      <span className="font-mono font-bold text-lg tracking-widest">{mobileDevOtp}</span>
                      <p className="text-xs text-amber-600 mt-1">Any 6-digit code is accepted.</p>
                    </div>
                  )}

                  <OtpInput value={mobileOtp} onChange={setMobileOtp} error={mobileOtpError} autoFocus />

                  <button type="submit" disabled={manualLoading || mobileOtp.join("").length < 6}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    {manualLoading ? <ThemedLoader size="sm" /> : <CheckCircle className="w-4 h-4" />}
                    {manualLoading ? "Verifying…" : "Verify & Continue"}
                  </button>

                  <button type="button" onClick={() => { setManualStep("mobile"); setMobileOtp(emptyOtp()); setMobileOtpError(undefined); clearError(); }}
                    className="w-full flex items-center justify-center gap-2 text-sm text-text/50 hover:text-text transition font-ibm-plex"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change mobile number
                  </button>
                </motion.form>
              )}

              {/* ── PATH B: SIGN UP PROFILE ── */}
              {path === "manual" && manualStep === "signup-profile" && (
                <motion.form key="signup"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSignupSubmit} className="space-y-4"
                >
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-sm font-ibm-plex text-green-800">
                    <span className="font-semibold">Mobile verified: </span>+91 {mobile}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-1 font-ibm-plex">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                      <input type="text" value={signupName} onChange={(e) => { setSignupName(e.target.value); setSignupErrors(p => ({ ...p, name: "" })); }}
                        placeholder="As on government ID"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-ibm-plex text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                        autoFocus
                      />
                    </div>
                    <FieldErr msg={signupErrors.name} />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-1 font-ibm-plex">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                      <input type="date" value={signupDob} onChange={(e) => { setSignupDob(e.target.value); setSignupErrors(p => ({ ...p, dob: "" })); }}
                        max={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-ibm-plex text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>
                    <FieldErr msg={signupErrors.dob} />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-text/70 mb-1 font-ibm-plex">Residential Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-primary/40" />
                      <button
                        type="button"
                        onClick={() => setShowSignupAddress(!showSignupAddress)}
                        className="absolute right-3.5 top-3.5 text-text/40"
                      >
                        {showSignupAddress ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <textarea
                        value={signupAddress}
                        onChange={(e) => { setSignupAddress(e.target.value); setSignupErrors(p => ({ ...p, address: "" })); }}
                        placeholder="House/Flat No., Street, City, State - PIN"
                        rows={3}
                        className="w-full pl-10 pr-10 py-3 rounded-xl border border-text/20 bg-[#F7F5F0] font-ibm-plex text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                      />
                    </div>
                    <FieldErr msg={signupErrors.address} />
                  </div>

                  <button type="submit" disabled={manualLoading}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                  >
                    {manualLoading ? <ThemedLoader size="sm" /> : <CheckCircle className="w-4 h-4" />}
                    {manualLoading ? "Creating profile…" : "Complete Sign Up"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="text-center text-xs text-text/40 font-ibm-plex mt-5">
          Demo portal — no real data is stored or transmitted. Any 6-digit OTP works.
        </p>
      </div>
    </div>
  );
}

// ── Suspense wrapper ─────────────────────────────────────────────────────────
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F5F0]" />}>
      <LoginPageInner />
    </Suspense>
  );
}
