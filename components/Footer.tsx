import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-white/80 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-white text-lg font-inter mb-2">Parivahan Sewa</h3>
            <p className="text-sm mb-3">Official portal for all vehicle and driving licence related services.</p>
            <p className="text-xs text-white/40 font-ibm-plex">Ministry of Road Transport & Highways<br />Government of India</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-inter">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dl-renewal" className="hover:text-white transition-colors">Driving Licence</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Vehicle Registration</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Permits</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Pay eChallan</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-inter">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Track Application</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* More (secondary items moved from navbar) */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-inter">More</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Dashboard & Reports</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">External Links</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Public Media</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/coming-soon" className="hover:text-white transition-colors">Terms of Service</Link></li>
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
