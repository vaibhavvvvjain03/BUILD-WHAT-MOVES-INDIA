"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Mail, Clock, HelpCircle } from "lucide-react";

export default function ContactSupportPage() {
  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="bg-primary text-white py-12 mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/help" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Help Center
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-inter">Contact Support</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            We are here to help. Reach out to the Parivahan Sewa support team through any of the channels below.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Phone Support */}
          <div className="bg-white rounded-3xl p-8 border border-text/5 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">Toll-Free Helpline</h2>
            <p className="text-text/60 mb-6 text-sm">For immediate assistance with your applications or general queries.</p>
            <p className="text-3xl font-bold font-ibm-plex text-primary mb-2">1800-120-4567</p>
            <p className="flex items-center justify-center gap-2 text-sm text-text/50">
              <Clock className="w-4 h-4" /> Available 6:00 AM to 10:00 PM
            </p>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-3xl p-8 border border-text/5 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">Email Support</h2>
            <p className="text-text/60 mb-6 text-sm">For detailed inquiries or sharing application documents securely.</p>
            <p className="text-xl font-bold font-ibm-plex text-primary mb-2">helpdesk-morth@gov.in</p>
            <p className="text-sm text-text/50">Average response time: 24-48 hours</p>
          </div>

        </div>

        <div className="mt-12 bg-white rounded-3xl p-8 border border-text/5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary mb-2">Have you checked our FAQs?</h3>
              <p className="text-text/70 mb-4 leading-relaxed">
                Many common questions about the DL renewal process, application tracking, and fees are already answered in our Frequently Asked Questions section.
              </p>
              <Link href="/help" className="text-primary font-semibold hover:underline">
                Read FAQs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
