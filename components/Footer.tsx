"use client";

import Link from "next/link";
import { useLang } from "./LangContext";
import { t } from "@/lib/translations";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-primary text-white/80 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-white text-2xl font-inter tracking-tight mb-2">{t(lang, "footer_title")}</h3>
            <p className="text-white/40 text-sm mt-4 lg:mt-0 font-ibm-plex text-center md:text-left">
            &copy; {new Date().getFullYear()} Ministry of Road Transport & Highways, Government of India. All rights reserved. <br/>
            (This is a redesign prototype and not the official website)
          </p>
          </div>
          <div className="text-left md:text-right">
            {/* Kept empty to maintain layout, or removed if preferred, but flex-between needs it */}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">{t(lang, "footer_services")}</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_srv_dl")}</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_srv_rc")}</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_srv_tax")}</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_srv_permits")}</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_srv_appt")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">{t(lang, "footer_support")}</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_sup_help")}</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_sup_faq")}</Link></li>
              <li><Link href="/help/citizen-guides" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_sup_guide")}</Link></li>
              <li><Link href="/track-application" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_sup_track")}</Link></li>
              <li><Link href="/help/contact-support" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_sup_raise")}</Link></li>
              <li><Link href="/help/contact-support" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_sup_contact")}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">{t(lang, "footer_resources")}</h4>
            <ul className="space-y-3 text-white/70">
              <li><a href="https://parivahan.gov.in/parivahan//en/content/download-forms" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_res_forms")}</a></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_res_fees")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_res_acts")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_res_notifications")}</Link></li>
            </ul>
          </div>

          {/* Other Official Services */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">{t(lang, "footer_portals")}</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_por_mparivahan")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_por_echallan")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_por_pucc")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_por_fancy")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_por_national")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_por_vahan")}</Link></li>
            </ul>
          </div>

          {/* Professional & Institutional */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">{t(lang, "footer_professional")}</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_pro_dealer")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_pro_mfg")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_pro_dash")}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">{t(lang, "footer_legal")}</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_leg_privacy")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_leg_terms")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_leg_access")}</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">{t(lang, "footer_leg_policies")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-sm text-center text-white/50">
          © {new Date().getFullYear()} Parivahan Sewa Redesign · Inspired by the Ministry of Road Transport & Highways, Government of India
        </div>
      </div>
    </footer>
  );
}
