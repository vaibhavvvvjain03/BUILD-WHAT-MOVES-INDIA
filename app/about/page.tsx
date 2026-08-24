import { ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary font-inter tracking-tight">
            About Parivahan Sewa
          </h1>
          <p className="text-lg md:text-xl text-text/70 max-w-2xl mx-auto">
            A redesigned citizen experience layer built for the Build What Moves India initiative.
          </p>
        </div>

        {/* About Project Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-text/5 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-text font-inter">The Initiative</h2>
          </div>
          <p className="text-text/80 text-lg leading-relaxed">
            This platform is a completely redesigned citizen experience layer built for the <strong>Build What Moves India</strong> hackathon. Our primary focus is on making the Driving Licence Renewal journey simpler, faster, and more accessible for everyone.
          </p>
        </div>

        {/* Live vs Preview Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-text/5 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-text font-inter">What&apos;s Live vs. In Preview</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4 bg-green-50/50 p-6 rounded-2xl border border-green-100">
              <h3 className="font-bold text-green-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Fully Functional
              </h3>
              <p className="text-text/80 leading-relaxed">
                The <strong>Driving Licence Renewal</strong> flow is fully functional and interactive, powered by mock backend logic. You can experience the complete end-to-end process as it is intended to work.
              </p>
              <Link 
                href="/services/dl-renewal" 
                className="inline-block mt-2 text-primary font-semibold hover:underline"
              >
                Try DL Renewal &rarr;
              </Link>
            </div>
            
            <div className="space-y-4 bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
              <h3 className="font-bold text-orange-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Experience Previews
              </h3>
              <p className="text-text/80 leading-relaxed">
                Other services shown across the site are <strong>Experience Previews</strong>. While their interfaces may be visible, they are static demonstrations intended to showcase the intended workflow and design system.
              </p>
              <Link 
                href="/services" 
                className="inline-block mt-2 text-primary font-semibold hover:underline"
              >
                Browse Services &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
