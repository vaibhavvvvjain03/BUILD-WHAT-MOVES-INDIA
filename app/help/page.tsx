"use client";

import { Search, Book, HelpCircle, FileText, Video, Phone, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { lang } = useLang();

  const faqs = [
    { q: t(lang, "faq1_q"), a: t(lang, "faq1_a") },
    { q: t(lang, "faq2_q"), a: t(lang, "faq2_a") },
    { q: t(lang, "faq3_q"), a: t(lang, "faq3_a") },
    { q: t(lang, "faq4_q"), a: t(lang, "faq4_a") },
  ];

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* ── Header ── */}
      <div className="bg-primary text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6">{t(lang, "help_title")}</h1>
          
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
            <input
              type="text"
              placeholder={t(lang, "search_placeholder") || "Search for guides, FAQs, or support..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-text rounded-full py-4 pl-12 pr-6 border-none focus:ring-2 focus:ring-accent outline-none shadow-lg text-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm font-semibold text-white/60">{t(lang, "popular")}</span>
            <button className="text-sm font-semibold text-white hover:text-accent underline transition-colors">{t(lang, "help_dl_process")}</button>
            <button className="text-sm font-semibold text-white hover:text-accent underline transition-colors">{t(lang, "help_pay_challan")}</button>
            <button className="text-sm font-semibold text-white hover:text-accent underline transition-colors">{t(lang, "help_find_app")}</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/help/citizen-guides" className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all group block">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Book className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">{t(lang, "citizen_guides")}</h3>
            <p className="text-sm text-text/70">{t(lang, "citizen_guides_desc")}</p>
          </Link>

          <a href="https://parivahan.gov.in/parivahan//en/content/download-forms" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all group block">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2 flex items-center justify-between">
              {t(lang, "dl_forms")}
            </h3>
            <p className="text-sm text-text/70">{t(lang, "dl_forms_desc")}</p>
          </a>

          <Link href="/coming-soon" className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all group block relative">
            <div className="absolute top-4 right-4 bg-amber-100 text-amber-800 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full">Coming Soon</div>
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">{t(lang, "video_tutorials")}</h3>
            <p className="text-sm text-text/70">{t(lang, "video_tutorials_desc")}</p>
          </Link>

          <Link href="/help/contact-support" className="bg-white p-6 rounded-2xl border border-text/5 shadow-sm hover:shadow-md transition-all group block">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-primary mb-2">{t(lang, "contact_support")}</h3>
            <p className="text-sm text-text/70">{t(lang, "contact_support_desc")}</p>
          </Link>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold font-inter text-primary mb-8 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-accent" />
            {t(lang, "faqs_title")}
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
            <button className="text-primary font-semibold hover:underline">{t(lang, "view_all_faqs")} &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
