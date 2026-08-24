"use client";

import { useEffect, useState } from "react";

export default function DisclaimerTicker() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const text = "This is an independent redesign prototype of Parivahan Sewa — not the official government platform. Backend, payments, and OTP are simulated with mock data for demonstration. AI features (VANI) are experimental and may not always respond perfectly.";

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-red-600 text-white z-50 overflow-hidden flex items-center border-t border-white/10 shadow-lg">
      {isReducedMotion ? (
        <div className="w-full text-center px-4 truncate text-sm font-ibm-plex font-medium">
          {text}
        </div>
      ) : (
        <>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .marquee-anim {
              animation: marqueeScroll 30s linear infinite;
            }
          `}} />
          <div className="relative w-full overflow-hidden flex whitespace-nowrap">
            <div className="marquee-anim flex-shrink-0 flex items-center text-sm font-ibm-plex font-medium">
              <span className="px-8">{text}</span>
              <span className="">•</span>
              <span className="px-8">{text}</span>
              <span className="">•</span>
            </div>
            <div className="marquee-anim flex-shrink-0 flex items-center text-sm font-ibm-plex font-medium" aria-hidden="true">
              <span className="px-8">{text}</span>
              <span className="">•</span>
              <span className="px-8">{text}</span>
              <span className="">•</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
