"use client";

import Link from "next/link";
import { User, CarFront, FileBadge, Bell, Settings, LogOut, ArrowRight, Clock, CheckCircle } from "lucide-react";

export default function MyParivahanPage() {
  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* ── Dashboard Header ── */}
      <div className="bg-primary text-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter mb-1">Welcome, Rajesh Kumar</h1>
                <p className="text-white/70">Aadhaar Verified • +91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-red-300 hover:text-red-200">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Active Applications */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-text/5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-inter text-primary">Active Applications</h2>
                <Link href="/track-application" className="text-sm font-semibold text-primary/60 hover:text-primary transition-colors">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {/* Mock Application Card */}
                <div className="border border-text/10 rounded-2xl p-5 hover:border-primary/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileBadge className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-primary">Driving Licence Renewal</h3>
                      </div>
                      <p className="text-xs text-text/60 font-ibm-plex">App No: 8472938472 • Submitted: Oct 24, 2026</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit">
                      Action Required
                    </div>
                  </div>
                  <div className="bg-bg rounded-xl p-4 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-text mb-1">Upload Medical Certificate (Form 1A)</p>
                      <p className="text-xs text-text/70 mb-3">Your application is on hold pending the upload of your medical certificate.</p>
                      <button className="text-sm font-bold text-primary hover:underline">Upload Document &rarr;</button>
                    </div>
                  </div>
                </div>

                {/* Completed Application Card */}
                <div className="border border-text/10 rounded-2xl p-5 opacity-60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CarFront className="w-4 h-4 text-text/60" />
                        <h3 className="font-bold text-text">Vehicle Transfer (KA01 AB 1234)</h3>
                      </div>
                      <p className="text-xs text-text/60 font-ibm-plex">App No: 9283749283 • Completed: Jan 15, 2026</p>
                    </div>
                    <div className="bg-success/20 text-success-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-fit flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Approved
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-text/5">
              <h2 className="text-xl font-bold font-inter text-primary mb-6">Start New Application</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link href="/services/dl-renewal" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <FileBadge className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-primary">Renew DL</span>
                </Link>
                <Link href="/services/transfer-ownership" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <CarFront className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-primary">Transfer RC</span>
                </Link>
                <Link href="/services/pay-challan" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <FileBadge className="w-6 h-6 text-primary" />
                  <span className="text-xs font-semibold text-primary">Pay Challan</span>
                </Link>
                <Link href="/services" className="flex flex-col items-center justify-center p-4 rounded-2xl border border-text/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-primary">View All</span>
                </Link>
              </div>
            </section>

          </div>
          
          {/* Sidebar Area (Right 1 column) */}
          <div className="space-y-8">
            
            {/* Digital Wallet */}
            <section className="bg-white rounded-3xl p-6 shadow-sm border border-text/5">
              <h2 className="text-lg font-bold font-inter text-primary mb-4">Digital Documents</h2>
              
              <div className="space-y-4">
                {/* DL Card */}
                <div className="bg-gradient-to-br from-primary to-primary-light text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                  <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">Driving Licence</p>
                  <p className="font-bold text-lg mb-4 font-ibm-plex tracking-wider">KA01 20240001234</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/70 uppercase">Valid Till</p>
                      <p className="text-sm font-semibold text-yellow-300">12 Dec 2026</p>
                    </div>
                    <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                      View
                    </button>
                  </div>
                </div>

                {/* RC Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/5 rounded-full" />
                  <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Registration Certificate</p>
                  <p className="font-bold text-lg mb-4 font-ibm-plex tracking-wider">KA01 AB 1234</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase">Vehicle</p>
                      <p className="text-sm font-semibold">Honda City VMT</p>
                    </div>
                    <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}
