"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Info, SearchX, ArrowLeft } from "lucide-react";
import ApplicationDetailView from "@/components/ApplicationDetailView";
import { RenewalApplication } from "@/lib/types";

export default function TrackApplicationPage() {
  const [appNumber, setAppNumber] = useState("");
  const [dob, setDob] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | "found" | "not_found">(null);
  const [applicationData, setApplicationData] = useState<RenewalApplication | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNumber) return;
    
    setIsSearching(true);
    setResult(null);
    setApplicationData(null);

    try {
      // In a real app, we might also send DOB for verification
      const res = await fetch(`/api/dl/application-status/${encodeURIComponent(appNumber)}`);
      const data = await res.json();

      if (res.ok && data.success && data.data.application) {
        setApplicationData(data.data.application);
        setResult("found");
      } else {
        setResult("not_found");
      }
    } catch (err) {
      console.error(err);
      setResult("not_found");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Header ── */}
      <div className="bg-primary text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-inter mb-4">Track Application</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Enter your application details below to check the real-time status of your request.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 -mt-12 relative z-10">
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
                    placeholder="e.g. PSW-2026-123456"
                    className="w-full bg-bg border border-text/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                  <p className="text-xs text-text/50 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Note: This is the public tracking portal.
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

          {result === "found" && applicationData && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ApplicationDetailView application={applicationData} />
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
