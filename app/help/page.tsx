"use client";

import { Search, Book, HelpCircle, FileText, Video, Phone, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { q: "How do I renew my Driving Licence online?", a: "You can renew your Driving Licence online through the Parivahan Sewa portal up to 1 year before expiry or 1 year after expiry. Go to Services > Driving Licence > Renew Driving Licence to start the process." },
    { q: "What is Form 1A and when do I need it?", a: "Form 1A is a Medical Certificate. It is required for all Transport Vehicle drivers, and for Non-Transport Vehicle drivers who are above the age of 40 applying for renewal." },
    { q: "How can I pay my traffic e-challan?", a: "Navigate to the 'Pay Challan' service. Enter your challan number, vehicle number, or DL number. You can review the violation and pay securely online." },
    { q: "Do I need to visit the RTO after online application?", a: "Many services like DL Renewal (for ages <40) are completely faceless and do not require an RTO visit. However, for services requiring biometric capture or physical vehicle inspection, an RTO visit is mandatory. This will be clearly stated before you apply." },
  ];

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* ── Header ── */}
      <div className="bg-primary text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6">How can we help you?</h1>
          
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
            <input
              type="text"
              placeholder="Search for guides, FAQs, or support..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-text rounded-full py-4 pl-12 pr-6 border-none focus:ring-2 focus:ring-accent outline-none shadow-lg text-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm font-semibold text-white/60">Popular:</span>
            <button className="text-sm font-semibold text-white hover:text-accent underline transition-colors">DL Renewal Process</button>
            <button className="text-sm font-semibold text-white hover:text-accent underline transition-colors">Pay Challan</button>
            <button className="text-sm font-semibold text-white hover:text-accent underline transition-colors">Find Application Number</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">Citizen Guides</h3>
            <p className="text-sm text-text/70">Step-by-step tutorials for using online services.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">Download Forms</h3>
            <p className="text-sm text-text/70">Access all official RTO forms (Form 1, 1A, 29, 30 etc.)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">Video Tutorials</h3>
            <p className="text-sm text-text/70">Watch visual guides on how to complete applications.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">Contact Support</h3>
            <p className="text-sm text-text/70">Reach out to our helpdesk or find your local RTO.</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-inter text-primary mb-8 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-accent" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-text/10 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 font-bold text-primary cursor-pointer font-inter text-lg">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90 text-text/40" />
                </summary>
                <div className="px-6 pb-6 text-text/80 text-base leading-relaxed border-t border-text/5 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="text-primary font-semibold hover:underline">View all FAQs &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
