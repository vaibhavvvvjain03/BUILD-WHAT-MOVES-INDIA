"use client";

import Link from "next/link";
import { ArrowLeft, Book, CheckCircle } from "lucide-react";
export default function CitizenGuidesPage() {

  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="bg-primary text-white py-12 mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/help" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Help Center
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-inter">Citizen Guides</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Step-by-step instructions for common transport services to help you navigate the process smoothly.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl p-8 border border-text/5 shadow-sm">
          <h2 className="text-2xl font-bold font-inter text-primary mb-6">How to Renew your Driving Licence</h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Check Eligibility & Documents</h3>
                <p className="text-text/70 mb-3 leading-relaxed">
                  You can renew your driving licence up to one year before its expiry and up to one year after its expiry. You will need:
                </p>
                <ul className="space-y-2 text-sm text-text/70">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Your current Driving Licence number and Date of Birth</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> A scanned copy of Form 1A (Medical Certificate) if you are over 40 years old or driving a transport vehicle</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" /> Aadhaar card for e-KYC (optional but recommended for a faceless, instant process)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fill the Online Application</h3>
                <p className="text-text/70 leading-relaxed">
                  Go to the DL Renewal service. Enter your details, confirm your identity via Aadhaar OTP (or manual upload), and verify your driving licence details.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Upload Required Documents</h3>
                <p className="text-text/70 leading-relaxed">
                  Upload a clear, signed copy of the required forms (e.g., Form 1A if applicable). Ensure the file size is under 5MB.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">4</div>
              <div>
                <h3 className="font-bold text-lg mb-2">Pay the Fee</h3>
                <p className="text-text/70 leading-relaxed">
                  Complete the payment process securely online. Once paid, you will receive an Application Number. You can use this number to track your application status from the dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-primary/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-primary">Ready to renew?</h4>
              <p className="text-sm text-text/70 mt-1">Start your driving licence renewal process now.</p>
            </div>
            <Link href="/services/dl-renewal" className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors shrink-0">
              Start Renewal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
