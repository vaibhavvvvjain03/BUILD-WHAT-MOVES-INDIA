"use client";

import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function ComingSoonPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-md mx-auto"
      >
        <div className="relative w-full max-w-[200px] h-32 mb-8 flex items-center justify-center overflow-hidden">
          {/* Animated Road */}
          <div className="absolute bottom-4 left-0 right-0 h-1 overflow-hidden">
            <motion.div
              className="w-[200%] h-full flex"
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <div className="w-full h-full border-b-2 border-dashed border-primary/20" />
            </motion.div>
          </div>

          {/* Bouncing/Rolling Vehicle */}
          <motion.div
            className="absolute bottom-4 text-primary"
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          >
            <Truck strokeWidth={1.5} className="w-12 h-12" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold font-inter text-text mb-4">
          Still on the way
        </h1>
        <p className="text-text/70 font-ibm-plex leading-relaxed mb-8">
          This feature is currently under construction in the redesigned prototype. Check back in a future update!
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold font-ibm-plex hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
