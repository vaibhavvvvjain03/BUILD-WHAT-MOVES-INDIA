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
  { key: "pop_renew",  href: "/services/dl-renewal",   icon: FileBadge,  tag: "LIVE" },
  { key: "pop_challan",           href: "/services/pay-challan",  icon: Banknote,   tag: null },
  { key: "pop_track",      href: "/track-application",  icon: FileText,   tag: null },
  { key: "pop_transfer",       href: "/services/transfer-ownership",  icon: CarFront,   tag: null },
  { key: "pop_rc",           href: "/services/duplicate-rc",  icon: FileSearch, tag: null },
  { key: "pop_address",         href: "/services/change-address",  icon: FileBadge,  tag: null },
];

export default function Home() {
  const { lang } = useLang();

  const words = [
    t(lang, "hero_word_0"),
    t(lang, "hero_word_1"),
    t(lang, "hero_word_2"),
    t(lang, "hero_word_3"),
    t(lang, "hero_word_4"),
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
          <motion.div layout className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2">
            <span className="text-primary text-3xl md:text-5xl lg:text-6xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`action-${lang}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-block"
                >
                  {t(lang, `hero_action_${index}`)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-accent text-3xl md:text-5xl lg:text-6xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${lang}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>
        </h1>
        <div className="relative min-h-[80px] md:min-h-[60px] flex items-start justify-center max-w-2xl mx-auto mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${lang}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-text/80 font-ibm-plex text-center"
            >
              {t(lang, `hero_desc_${index}`)}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <div className="relative h-[60px] flex justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`cta-${lang}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Link
                href={
                  index === 0 ? "/services/dl-renewal" :
                  index === 1 ? "/services" :
                  index === 2 ? "/services/pay-challan" :
                  index === 3 ? "/track-application" :
                  "/services"
                }
                prefetch={true}
                className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {t(lang, `hero_cta_${index}`)}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Intent Section — What do you need today? ── */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold font-inter text-primary mb-2 text-center">
          {t(lang, "intent_heading")}
        </h2>
        <p className="text-center text-text/60 font-ibm-plex mb-8 text-sm">
          {t(lang, "intent_subtext")}
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
            <h3 className="text-xl font-bold font-inter mb-3 text-primary">{t(lang, "why_easier_1_title")}</h3>
            <p className="text-text/70">
              {t(lang, "why_easier_1_desc")}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-success/20 text-primary rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-inter mb-3 text-primary">{t(lang, "why_easier_2_title")}</h3>
            <p className="text-text/70">
              {t(lang, "why_easier_2_desc")}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 bg-success/20 text-primary rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-inter mb-3 text-primary">{t(lang, "why_easier_3_title")}</h3>
            <p className="text-text/70">
              {t(lang, "why_easier_3_desc")}
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
            {t(lang, "pop_search_all")}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_TASKS.map((task) => {
            const Icon = task.icon;
            return (
              <Link
                key={task.key}
                href={task.href}
                prefetch={true}
                className="group flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md border border-text/5 hover:border-primary/20 transition-all"
              >
                <div className="w-11 h-11 bg-primary/8 text-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-text group-hover:text-primary transition-colors font-ibm-plex text-sm">{t(lang, task.key)}</span>
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

      {/* ── Explore All Services ── */}
      <section className="mb-16">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10 flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold font-inter text-primary mb-4">
            {t(lang, "explore_services_title")}
          </h2>
          <p className="text-text/70 font-ibm-plex max-w-2xl mx-auto mb-8">
            {t(lang, "explore_services_desc")}
          </p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-xl border border-text/10 shadow-sm hover:shadow-md hover:border-primary/20 transition-all active:scale-95"
          >
            {t(lang, "explore_services_cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── End of homepage sections ── */}

    </div>
  );
}
