"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPinOff, ArrowLeft } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";

export default function NotFound() {
  const { lang } = useLang();
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-md mx-auto"
      >
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          {/* Decorative background circle */}
          <div className="absolute inset-0 bg-primary/5 rounded-full" />
          
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10 text-primary"
          >
            <MapPinOff strokeWidth={1.5} className="w-16 h-16" />
          </motion.div>
          
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full text-accent/40 -z-10"
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: "100 100" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            <path
              d="M 20 80 Q 40 40 80 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </motion.svg>
        </div>

        <h1 className="text-3xl font-bold font-inter text-text mb-4">
          {t(lang, "not_found_title") || "Dead End"}
        </h1>
        <p className="text-text/70 font-ibm-plex leading-relaxed mb-8">
          {t(lang, "not_found_desc") || "We couldn't find the page you're looking for. The service might have moved, or the link may be incorrect."}
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold font-ibm-plex hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t(lang, "back_home") || "Back to Dashboard"}
        </Link>
      </motion.div>
    </div>
  );
}
