"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Info, CheckCircle2, Clock, MapPin, SearchX } from "lucide-react";

export default function TrackApplicationPage() {
  const [appNumber, setAppNumber] = useState("");
  const [dob, setDob] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | "found" | "not_found">(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNumber) return;
    
    setIsSearching(true);
    setResult(null);

    // Mock API call
    setTimeout(() => {
      setIsSearching(false);
      if (appNumber.toLowerCase() === "mock123") {
        setResult("found");
      } else {
        setResult("not_found");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Header ── */}
      <div className="bg-primary text-white py-16 mt-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-inter mb-4">Track Application</h1>
          <p className="text-white/80 text-lg">
            Enter your application details below to check the real-time status of your request.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 -mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-lg border border-text/5 overflow-hidden">
          {/* Search Form */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="appNumber" className="block text-sm font-semibold text-text mb-2 font-inter">
                    Application Number *
                  </label>
                  <input
                    type="text"
                    id="appNumber"
                    value={appNumber}
                    onChange={(e) => setAppNumber(e.target.value)}
                    placeholder="e.g. 123456789"
                    className="w-full bg-bg border border-text/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                  <p className="text-xs text-text/50 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Try &quot;mock123&quot; for a demo
                  </p>
                </div>
                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-text mb-2 font-inter">
                    Date of Birth (Optional)
                  </label>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-bg border border-text/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={!appNumber || isSearching}
                  className="bg-primary hover:bg-primary-light text-white font-semibold py-4 px-12 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                >
                  {isSearching ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Searching...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search className="w-5 h-5" />
                      Track Status
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Results Area */}
          {result === "not_found" && (
            <div className="bg-red-50 border-t border-red-100 p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-inter text-red-700 mb-2">Application Not Found</h3>
              <p className="text-red-600/80 max-w-md mx-auto">
                We couldn&apos;t find an application with the number <span className="font-bold">&quot;{appNumber}&quot;</span>. Please check the number and try again.
              </p>
            </div>
          )}

          {result === "found" && (
            <div className="bg-bg border-t border-text/5 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-8 border-b border-text/5">
                <div>
                  <h3 className="text-2xl font-bold font-inter text-primary mb-1">Driving Licence Renewal</h3>
                  <p className="text-text/60 font-ibm-plex">App No: <span className="font-semibold text-text">mock123</span></p>
                </div>
                <div className="flex items-center gap-2 bg-success/10 text-success-dark px-4 py-2 rounded-full w-fit">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="font-bold text-sm uppercase tracking-wider">In Progress</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-8 relative">
                {/* Connecting line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-text/10" />

                <div className="relative flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">Application Submitted</h4>
                    <p className="text-text/70 text-sm mb-1">Your application and fee payment have been received.</p>
                    <p className="text-xs text-text/50 font-ibm-plex">Oct 24, 2026 • 10:30 AM</p>
                  </div>
                </div>

                <div className="relative flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-success text-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">Document Verification</h4>
                    <p className="text-text/70 text-sm mb-1">Your uploaded documents have been verified by RTO officials.</p>
                    <p className="text-xs text-text/50 font-ibm-plex">Oct 25, 2026 • 02:15 PM</p>
                  </div>
                </div>

                <div className="relative flex gap-6 opacity-60">
                  <div className="w-10 h-10 rounded-full bg-bg border-2 border-primary text-primary flex items-center justify-center flex-shrink-0 z-10">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-primary">Biometric Capture</h4>
                    <p className="text-text/70 text-sm mb-2">Action required: Visit RTO for biometric capture.</p>
                    <div className="bg-white border border-text/10 rounded-lg p-3 inline-flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary/50" />
                      <div>
                        <p className="text-sm font-semibold text-primary">RTO Office, Koramangala (KA-01)</p>
                        <p className="text-xs text-text/60">Scheduled: Oct 28, 2026 • 11:00 AM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex gap-6 opacity-40">
                  <div className="w-10 h-10 rounded-full bg-bg border-2 border-text/20 text-text/30 flex items-center justify-center flex-shrink-0 z-10">
                    <div className="w-2 h-2 rounded-full bg-text/20" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-text">Final Approval & Dispatch</h4>
                    <p className="text-text/70 text-sm">Pending biometric completion.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
          <Info className="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-blue-900 mb-1">Need help?</h4>
            <p className="text-sm text-blue-800/80 mb-3">
              If you have lost your application number, you can retrieve it using your registered mobile number and date of birth.
            </p>
            <Link href="/coming-soon" className="text-sm font-semibold text-blue-700 hover:underline">
              Retrieve Application Number &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
