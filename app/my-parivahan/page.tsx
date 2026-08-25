"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User, CarFront, FileBadge, Bell, Settings, LogOut,
  ArrowRight, Clock, CheckCircle, SearchX, Lock, Link2Off, Link2, BadgeCheck, X, FileSearch, Banknote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "@/lib/sessionContext";
import { findLicenceByDl } from "@/lib/mockData";
import { serviceCatalog } from "@/lib/serviceCatalog";
import { RenewalApplication } from "@/lib/types";
import { MockLicence, MockVehicle } from "@/lib/types";
import ThemedLoader from "@/components/ThemedLoader";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";

export default function MyParivahanPage() {
  const router = useRouter();
  const { session, logout } = useSession();
  const { lang } = useLang();

  // ── Applications state ───────────────────────────────────────────────────
  const [applications, setApplications] = useState<RenewalApplication[]>([]);
  // tri-state: null = not yet resolved, true = loading, false = done
  const [loadingApps, setLoadingApps] = useState<boolean>(false);
  const [appsResolved, setAppsResolved] = useState(false);
  
  // ── Document View State ──────────────────────────────────────────────────
  const [viewingDoc, setViewingDoc] = useState<"dl" | string | null>(null);

  // ── Vehicles state ───────────────────────────────────────────────────────
  const [vehicles, setVehicles] = useState<MockVehicle[]>([]);
  const [loadingVehicles, setLoadingVehicles] = useState(false);

  // ── Linked licence lookup (optional — dashboard works without it) ─────────
  const linkedLicence: MockLicence | undefined = session.linkedDL
    ? findLicenceByDl(session.linkedDL) ?? undefined
    : undefined;

  // ── Display name — prefer session.name, fall back to licence name, then mobile ──
  const displayName = session.name ?? linkedLicence?.name ?? session.mobileNumber ?? "User";
  const firstName = displayName.split(" ")[0];

  // ── Auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!session.isLoggedIn) {
      router.replace("/login?return=/my-parivahan");
    }
  }, [session.isLoggedIn, router]);

  // ── Fetch applications — keyed on session (DL or mobile), NOT DL-only ────
  const fetchApplications = useCallback(async () => {
    if (!session.isLoggedIn) return;
    setLoadingApps(true);

    const params = new URLSearchParams();
    if (session.linkedDL) params.set("dlNumber", session.linkedDL);
    if (session.mobileNumber) params.set("mobile", session.mobileNumber);

    try {
      const controller = new AbortController();
      // Hard 1.5s safety timeout — never hang the dashboard
      const timeout = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(`/api/auth/my-applications?${params}`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const json = await res.json();
      if (json.success) setApplications(json.data.applications);
    } catch {
      // Silently handle abort or network errors — show empty state
    } finally {
      setLoadingApps(false);
      setAppsResolved(true);
    }
  }, [session.isLoggedIn, session.linkedDL, session.mobileNumber]);

  const fetchVehicles = useCallback(async () => {
    if (!session.isLoggedIn) return;
    setLoadingVehicles(true);
    try {
      const res = await fetch(`/api/auth/my-vehicles`);
      const json = await res.json();
      if (json.success) setVehicles(json.data.vehicles);
    } catch {
      // Silently handle
    } finally {
      setLoadingVehicles(false);
    }
  }, [session.isLoggedIn]);

  useEffect(() => {
    if (!session.isLoggedIn) return;
    fetchApplications();
    fetchVehicles();
  }, [fetchApplications, fetchVehicles, session.isLoggedIn]);

  // ── Not logged in yet (hydrating) ────────────────────────────────────────
  if (!session.isLoggedIn) {
    return (
      <div className="min-h-screen bg-bg pb-20 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-text/10 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-inter text-primary mb-3">{t(lang, "login_signin")}</h1>
          <p className="text-text/60 font-ibm-plex mb-8">
            {t(lang, "login_req_msg")}
          </p>
          <Link
            href="/login?return=/my-parivahan"
            className="block w-full py-3.5 rounded-xl bg-primary text-white font-semibold font-ibm-plex hover:bg-primary/90 transition-all"
          >
            {t(lang, "signin_btn")}
          </Link>
        </div>
      </div>
    );
  }

  // ── Logged in — full dashboard ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* ── Dashboard Header ── */}
      <div className="bg-primary text-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 shrink-0">
                <User className="w-10 h-10 text-white" />
                {session.loginMethod === "aadhaar" && (
                  <div className="absolute -bottom-1 -right-1 bg-white text-primary rounded-full p-0.5 shadow-md" title="Aadhaar Verified">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter mb-1">{t(lang, "welcome")}, {firstName}!</h1>
                <p className="text-white/70 flex items-center gap-2 text-sm">
                  {session.mobileNumber ? `+91 ${session.mobileNumber}` : ""}
                  {session.loginMethod === "aadhaar" && (
                    <span className="text-xs bg-white/10 rounded-full px-2 py-0.5">{t(lang, "aadhaar_verified")}</span>
                  )}
                </p>
                {session.dateOfBirth && (
                  <p className="text-white/50 text-xs mt-1">DOB: {session.dateOfBirth}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => { logout(); router.push("/"); }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-red-300 hover:text-red-200"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Content (Left 2 cols) ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* ── No Licence Linked — inline card (not a full-page wall) ── */}
            {!session.linkedDL && (
              <section className="bg-amber-50 border border-amber-200 rounded-3xl p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Link2Off className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-amber-900 font-inter mb-1">{t(lang, "no_dl_linked")}</h2>
                  <p className="text-sm text-amber-700 font-ibm-plex">
                    {t(lang, "no_dl_msg")}
                  </p>
                  <Link
                    href="/dl-renewal"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-amber-800 hover:text-amber-900 underline"
                  >
                    <Link2 className="w-3.5 h-3.5" /> {t(lang, "link_dl_btn")}
                  </Link>
                </div>
              </section>
            )}

            {/* ── My Vehicles ── */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-text/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-inter text-primary">{t(lang, "my_vehicles_title")}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loadingVehicles ? (
                  <div className="col-span-1 sm:col-span-2 text-center py-8">
                    <ThemedLoader size="md" className="mx-auto mb-3 text-primary" />
                  </div>
                ) : vehicles.length === 0 ? (
                  <div className="col-span-1 sm:col-span-2 text-center py-8 bg-bg rounded-2xl border border-text/5">
                    <CarFront className="w-8 h-8 text-text/30 mx-auto mb-3" />
                    <p className="font-bold text-text/60">No vehicles found</p>
                  </div>
                ) : (
                  vehicles.map((vehicle) => (
                    <div key={vehicle.rcNumber} className="border border-text/10 rounded-2xl p-5 bg-bg relative overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold font-mono text-lg text-primary bg-white px-3 py-1 rounded-lg shadow-sm border border-text/5">
                            {vehicle.rcNumber}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                            vehicle.status === "Active" ? "bg-success/20 text-success-dark" : "bg-red-100 text-red-700"
                          }`}>
                            {vehicle.status}
                          </span>
                        </div>
                        <h3 className="font-semibold text-text mb-4">{vehicle.makeModel}</h3>
                        
                        <div className="grid grid-cols-2 gap-3 mb-5">
                          <div className="bg-white p-2 rounded-lg border border-text/5">
                            <p className="text-[10px] uppercase text-text/50 mb-0.5">{t(lang, "vehicle_tax")}</p>
                            <p className="text-xs font-semibold text-success-dark flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> {t(lang, "vehicle_valid")}
                            </p>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-text/5">
                            <p className="text-[10px] uppercase text-text/50 mb-0.5">{t(lang, "vehicle_pucc")}</p>
                            <p className="text-xs font-semibold text-success-dark flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> {t(lang, "vehicle_valid")}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setViewingDoc(vehicle.rcNumber)}
                        className="w-full py-2.5 rounded-xl bg-white border border-primary/20 text-primary font-semibold text-sm hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                      >
                        {t(lang, "vehicle_view")} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* ── Applications ── */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-text/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-inter text-primary">{t(lang, "applications_title")}</h2>
                <Link href="/track-application" className="text-sm font-semibold text-primary/60 hover:text-primary transition-colors">
                  {t(lang, "track_other")}
                </Link>
              </div>

              <div className="space-y-4">
                {loadingApps && !appsResolved ? (
                  <div className="text-center py-12">
                    <ThemedLoader size="lg" className="mx-auto mb-3 text-primary" />
                    <p className="text-text/50 text-sm font-ibm-plex">Loading applications…</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-12 bg-bg rounded-2xl border border-text/5">
                    <SearchX className="w-8 h-8 text-text/30 mx-auto mb-3" />
                    <p className="font-bold text-text/60">{t(lang, "no_apps")}</p>
                    <p className="text-sm text-text/50 mt-1">
                      {session.linkedDL
                        ? t(lang, "no_apps_msg_1")
                        : t(lang, "no_apps_msg_2")}
                    </p>
                  </div>
                ) : (
                  applications.map((app) => {
                    const serviceId = "dl-renewal";
                    const service = serviceCatalog[serviceId] || { name: "Unknown Service" };
                    const isPending = app.status === "payment_pending" || app.status === "draft";
                    return (
                      <Link href={`/my-parivahan/applications/${app.applicationId}`} key={app.applicationId} className="block group">
                        <div className="border border-text/10 rounded-2xl p-5 group-hover:border-primary/30 transition-colors bg-white relative overflow-hidden">
                          {/* Progress bar background */}
                          <div className="absolute bottom-0 left-0 h-1 bg-text/5 w-full">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                app.status === "approved" ? "bg-success" : 
                                isPending ? "bg-accent" : "bg-primary"
                              }`}
                              style={{ width: app.status === "draft" ? "25%" : app.status === "payment_pending" ? "75%" : app.status === "approved" ? "100%" : "50%" }}
                            />
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center">
                                  <FileBadge className="w-4 h-4 text-primary" />
                                </div>
                                <h3 className="font-bold text-primary group-hover:underline">{service.name}</h3>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-text/60 font-ibm-plex mt-2">
                                <span className="bg-bg px-2 py-1 rounded-md border border-text/5 font-mono">#{app.applicationId}</span>
                                <span>Submitted: {new Date(app.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            {isPending ? (
                              <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-fit flex items-center gap-2">
                                <Clock className="w-3 h-3" /> {t(lang, "action_req")}
                              </div>
                            ) : app.status === "approved" ? (
                              <div className="bg-success/10 border border-success/30 text-success-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-fit flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> {t(lang, "approved")}
                              </div>
                            ) : (
                              <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider w-fit flex items-center gap-1">
                                {t(lang, "in_progress")}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </section>

            {/* ── Quick Actions ── */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-text/5">
              <h2 className="text-xl font-bold font-inter text-primary mb-6">{t(lang, "start_new_app")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link href="/dl-renewal" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <FileBadge className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-primary">{t(lang, "renew_dl")}</span>
                </Link>
                <Link href="/services/transfer-ownership" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <CarFront className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-primary">{t(lang, "transfer_rc")}</span>
                </Link>
                <Link href="/services/pay-challan" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <FileBadge className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-primary">{t(lang, "pay_challan_btn")}</span>
                </Link>
                <Link href="/services" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-primary">{t(lang, "view_all")}</span>
                </Link>
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-8">

            {/* ── Profile Card ── */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-text/5">
              <h2 className="text-lg font-bold font-inter text-primary mb-4">{t(lang, "profile_title")}</h2>
              <div className="space-y-3 text-sm font-ibm-plex">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text/40 mb-0.5">{t(lang, "prof_name")}</p>
                  <p className="font-semibold text-text">{session.name ?? "—"}</p>
                </div>
                {session.dateOfBirth && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text/40 mb-0.5">{t(lang, "prof_dob")}</p>
                    <p className="font-semibold text-text">{session.dateOfBirth}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text/40 mb-0.5">{t(lang, "prof_mobile")}</p>
                  <p className="font-semibold text-text">+91 {session.mobileNumber}</p>
                </div>
                {session.address && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text/40 mb-0.5">{t(lang, "prof_address")}</p>
                    <p className="text-text/70 leading-relaxed">{session.address}</p>
                  </div>
                )}
              </div>
            </section>

            {/* ── Digital Documents (only shown when DL linked) ── */}
            {session.linkedDL && linkedLicence && (
              <section className="bg-white rounded-3xl p-6 shadow-sm border border-text/5">
                <h2 className="text-lg font-bold font-inter text-primary mb-4">{t(lang, "digital_docs")}</h2>
                <div className="space-y-4">
                  {/* DL Card */}
                  <div className="bg-gradient-to-br from-primary to-primary-light text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                    <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{t(lang, "dl_card")}</p>
                    <p className="font-bold text-lg mb-4 font-ibm-plex tracking-wider">{linkedLicence.dlNumber}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/70 mb-0.5">Status: {t(lang, "status_active")}</p>
                        <p className="text-sm font-semibold font-ibm-plex">
                          Valid till {new Date(linkedLicence.expiryDate).toLocaleDateString("en-GB", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </p>
                      </div>
                      <button onClick={() => setViewingDoc("dl")} className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                        View
                      </button>
                    </div>
                  </div>

                  {/* RC Cards */}
                  {loadingVehicles ? (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-5 rounded-2xl relative overflow-hidden shadow-md flex items-center justify-center min-h-[140px]">
                      <ThemedLoader size="sm" className="text-white/50" />
                    </div>
                  ) : (
                    vehicles.map((vehicle) => (
                      <div key={vehicle.rcNumber} className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full" />
                        <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Registration Certificate</p>
                        <p className="font-bold text-lg mb-4 font-ibm-plex tracking-wider">{vehicle.rcNumber}</p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] text-white/50 uppercase">Vehicle</p>
                            <p className="text-sm font-semibold">{vehicle.makeModel}</p>
                          </div>
                          <button onClick={() => setViewingDoc(vehicle.rcNumber)} className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                            View
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>

      {/* ── Document View Modal ── */}
      <AnimatePresence>
        {viewingDoc && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingDoc(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-text/10 bg-bg">
                <h3 className="font-bold font-inter text-primary">
                  {viewingDoc === "dl" ? "Driving Licence" : "Registration Certificate"}
                </h3>
                <button
                  onClick={() => setViewingDoc(null)}
                  className="w-8 h-8 rounded-full bg-text/5 hover:bg-text/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-text/70" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {viewingDoc === "dl" ? (
                  <>
                    <div className="flex justify-between border-b border-text/5 pb-3">
                      <span className="text-text/60 text-sm">DL Number</span>
                      <span className="font-bold font-mono">{linkedLicence?.dlNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-text/5 pb-3">
                      <span className="text-text/60 text-sm">Name</span>
                      <span className="font-bold">{linkedLicence?.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-text/5 pb-3">
                      <span className="text-text/60 text-sm">DOB</span>
                      <span className="font-bold">{linkedLicence?.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-text/60 text-sm">Valid Till</span>
                      <span className="font-bold">{new Date(linkedLicence?.expiryDate || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </>
                ) : (
                  <>
                    {(() => {
                      const v = vehicles.find(vec => vec.rcNumber === viewingDoc);
                      if (!v) return <p>Vehicle not found.</p>;
                      return (
                        <>
                          <div className="bg-bg rounded-xl p-4 border border-text/5 mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-text/60 text-xs uppercase">{t(lang, "vehicle_reg_no")}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                v.status === "Active" ? "bg-success/20 text-success-dark" : "bg-red-100 text-red-700"
                              }`}>
                                {v.status}
                              </span>
                            </div>
                            <span className="font-bold font-mono text-lg">{v.rcNumber}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 border-b border-text/5 pb-4">
                            <div>
                              <span className="block text-text/50 text-[10px] uppercase mb-1">{t(lang, "vehicle_type")}</span>
                              <span className="font-semibold text-sm">{v.makeModel}</span>
                            </div>
                            <div>
                              <span className="block text-text/50 text-[10px] uppercase mb-1">Owner Name</span>
                              <span className="font-semibold text-sm">{v.ownerName}</span>
                            </div>
                            <div>
                              <span className="block text-text/50 text-[10px] uppercase mb-1">Class</span>
                              <span className="font-semibold text-sm">{v.vehicleClass}</span>
                            </div>
                            <div>
                              <span className="block text-text/50 text-[10px] uppercase mb-1">Reg Date</span>
                              <span className="font-semibold text-sm">{new Date(v.registrationDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <h4 className="text-sm font-bold text-primary mb-3">{t(lang, "vehicle_services")}</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <Link href="/services/transfer-ownership" className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-lg p-2 transition-colors">
                                <CarFront className="w-4 h-4 text-primary" />
                                <span className="text-xs font-semibold text-primary">Transfer RC</span>
                              </Link>
                              <Link href="/services/pay-challan" className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-lg p-2 transition-colors">
                                <Banknote className="w-4 h-4 text-primary" />
                                <span className="text-xs font-semibold text-primary">Pay Challan</span>
                              </Link>
                              <Link href="/services/duplicate-rc" className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-lg p-2 transition-colors">
                                <FileSearch className="w-4 h-4 text-primary" />
                                <span className="text-xs font-semibold text-primary">Duplicate RC</span>
                              </Link>
                              <Link href="/services/change-address" className="flex items-center gap-2 bg-primary/5 hover:bg-primary/10 border border-primary/10 rounded-lg p-2 transition-colors">
                                <FileBadge className="w-4 h-4 text-primary" />
                                <span className="text-xs font-semibold text-primary">Change Address</span>
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
