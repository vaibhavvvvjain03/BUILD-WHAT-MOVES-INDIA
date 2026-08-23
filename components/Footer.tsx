import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-white text-2xl font-inter tracking-tight mb-2">Parivahan Sewa</h3>
            <p className="text-white/70 max-w-md">The official digital portal for all vehicle and driving licence related services across India.</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm font-semibold text-white/90">Ministry of Road Transport & Highways</p>
            <p className="text-xs text-white/50 font-ibm-plex">Government of India</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">Driving Licence</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">Vehicle & RC</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">Tax & Payments</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">Permits</Link></li>
              <li><Link href="/services" className="hover:text-white hover:underline transition-colors">Appointments</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Help Centre</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">FAQs</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Citizen Guide</Link></li>
              <li><Link href="/track-application" className="hover:text-white hover:underline transition-colors">Track Application</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Raise a Concern</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Forms</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Fees</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Acts & Rules</Link></li>
              <li><Link href="/help" className="hover:text-white hover:underline transition-colors">Notifications & Advisories</Link></li>
            </ul>
          </div>

          {/* Other Official Services */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">Other Portals</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">mParivahan</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">eChallan</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">PUCC</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Fancy Number</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">National Permit</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Vahan Green Sewa</Link></li>
            </ul>
          </div>

          {/* Professional & Institutional */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">Professional</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Dealer Services</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Manufacturer Services</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Dashboards & Reports</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4 font-inter uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Privacy</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Terms</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Accessibility</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white hover:underline transition-colors">Website Policies</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-sm text-center text-white/50">
          © {new Date().getFullYear()} Parivahan Sewa · Ministry of Road Transport & Highways · Government of India
        </div>
      </div>
    </footer>
  );
}
