import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DisclaimerTicker from "@/components/DisclaimerTicker";
import { LangProvider } from "@/components/LangContext";
import { SessionProvider } from "@/lib/sessionContext";

export const metadata: Metadata = {
  title: "Parivahan Sewa",
  description: "A redesign concept for Parivahan Sewa, the Ministry of Road Transport & Highways' citizen services portal.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-ibm-plex bg-background text-text antialiased flex flex-col min-h-screen pb-10 overflow-x-hidden`}
      >
        <SessionProvider>
          <LangProvider>
            <div className="flex flex-col min-h-screen w-full max-w-[100vw] overflow-x-hidden">
              <Navbar />
              <main className="flex-1 pt-32">
                {children}
              </main>
              <Footer />
              <DisclaimerTicker />
            </div>
          </LangProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
