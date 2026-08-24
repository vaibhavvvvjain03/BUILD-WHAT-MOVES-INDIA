"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight, FileText, CheckCircle, Clock, ShieldCheck,
  CarFront, FileBadge, Banknote, HelpCircle, FileSearch, Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";

// ── Intent options ────────────────────────────────────────────────────────────
const INTENT_ITEMS = [
  { key: "intent_renew",    href: "/services/dl-renewal",   icon: FileBadge,  accent: true  },
  { key: "intent_transfer", href: "/services/transfer-ownership",  icon: CarFront,   accent: false },
  { key: "intent_challan",  href: "/services/pay-challan",  icon: Banknote,   accent: false },
  { key: "intent_track",    href: "/track-application",  icon: FileText,   accent: false },
  { key: "intent_document", href: "/services/duplicate-rc",  icon: FileSearch, accent: false },
  { key: "intent_unsure",   href: "palette",       icon: HelpCircle, accent: false },
];

// ── Popular Tasks (same data as command palette "Most Used") ──────────────────
const POPULAR_TASKS = [
  { label: "Renew Driving Licence",  href: "/services/dl-renewal",   icon: FileBadge,  tag: "LIVE" },
  { label: "Pay eChallan",           href: "/services/pay-challan",  icon: Banknote,   tag: null },
  { label: "Track Application",      href: "/track-application",  icon: FileText,   tag: null },
  { label: "Transfer Vehicle",       href: "/services/transfer-ownership",  icon: CarFront,   tag: null },
  { label: "Duplicate RC",           href: "/services/duplicate-rc",  icon: FileSearch, tag: null },
  { label: "Change Address",         href: "/services/change-address",  icon: FileBadge,  tag: null },
];

export default function Home() {
  const { lang } = useLang();

  const words = [
    t(lang, "word_licence"),
    t(lang, "word_rc"),
    t(lang, "word_permit"),
    t(lang, "word_tax"),
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words.length, lang]);

  // Reset index on lang change so we don't flash wrong word
  useEffect(() => { setIndex(0); }, [lang]);

  // Simple palette mock triggered by "I'm not sure"
  function handleIntentClick(href: string) {
    if (href === "palette") {
      // Click the Services button in the navbar programmatically
      const btn = document.querySelector<HTMLButtonElement>("nav button[class*='rounded-full']");
      btn?.click();
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20">

      {/* ── Hero Section ── */}
      <section className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-primary mb-6 leading-tight text-center flex flex-col items-center justify-center">
          <motion.div layout className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
            <motion.span layout>{t(lang, "hero_renew")}</motion.span>
            <motion.span layout className="relative flex justify-center items-center text-accent overflow-visible">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`${lang}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="whitespace-nowrap"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </motion.div>
          <motion.span layout className="block mt-2 md:mt-4 text-text/90">{t(lang, "hero_line2")}</motion.span>
        </h1>
        <p className="text-lg md:text-xl text-text/80 max-w-2xl mx-auto mb-10 font-ibm-plex mt-4 md:mt-0">
          {t(lang, "hero_subtitle")}
        </p>
        <Link
          href="/services/dl-renewal"
          prefetch={true}
          className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg"
        >
          {t(lang, "hero_cta")}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* ── Intent Section — What do you need today? ── */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-primary mb-2 text-center">
          {t(lang, "intent_heading")}
        </h2>
        <p className="text-center text-text/60 font-ibm-plex mb-8 text-sm">
          Choose your goal and we&apos;ll take you straight there.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {INTENT_ITEMS.map((item) => {
            const Icon = item.icon;
            const label = t(lang, item.key);
            const isUnsure = item.href === "palette";
            return isUnsure ? (
              <button
                key={item.key}
                onClick={() => handleIntentClick(item.href)}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-text/20 hover:border-primary/40 bg-white hover:bg-primary/5 transition-all text-center gap-3"
              >
                <Icon className="w-7 h-7 text-text/40 group-hover:text-primary transition-colors" />
                <span className="text-sm font-semibold text-text/60 group-hover:text-primary transition-colors font-ibm-plex">{label}</span>
              </button>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                prefetch={true}
                className={`group flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all text-center gap-3 ${
                  item.accent
                    ? "border-accent bg-accent/10 hover:bg-accent/20 hover:border-accent"
                    : "border-transparent bg-white hover:bg-primary/5 hover:border-primary/20 shadow-sm"
                }`}
              >
                <Icon className={`w-7 h-7 transition-transform group-hover:scale-110 ${item.accent ? "text-primary" : "text-primary/70"}`} />
                <span className="text-sm font-semibold text-primary font-ibm-plex">{label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Why it's easier ── */}
      <section className="py-16 mb-12 border-y border-text/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-success/20 text-primary rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-inter mb-3 text-primary">No more RTO visits</h3>
            <p className="text-text/70">
              Skip the long queues. Complete your application entirely online and upload documents securely from your home.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-success/20 text-primary rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-inter mb-3 text-primary">Clear instructions</h3>
            <p className="text-text/70">
              We guide you step-by-step. Know exactly which forms to fill and which documents are required before you start.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-success/20 text-primary rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-inter mb-3 text-primary">Transparent tracking</h3>
            <p className="text-text/70">
              Track your application status in real-time. Receive instant notifications via SMS when your licence is approved.
            </p>
          </div>
        </div>
      </section>

      {/* ── Popular Tasks (always visible, separate from command palette) ── */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-primary">
            {t(lang, "popular_heading")}
          </h2>
          <button
            onClick={() => {
              const btn = document.querySelector<HTMLButtonElement>("nav button[class*='rounded-full']");
              btn?.click();
            }}
            className="flex items-center gap-2 text-sm font-semibold text-primary/60 hover:text-primary transition-colors font-ibm-plex"
          >
            <Search className="w-4 h-4" />
            Search all services
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_TASKS.map((task) => {
            const Icon = task.icon;
            return (
              <Link
                key={task.label}
                href={task.href}
                prefetch={true}
                className="group flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-text/5 hover:border-primary/20 transition-all"
              >
                <div className="w-11 h-11 bg-primary/8 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-text group-hover:text-primary transition-colors font-ibm-plex text-sm">{task.label}</span>
                  {task.tag && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{task.tag}</span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-text/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── End of homepage sections ── */}

    </div>
  );
}
