import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider } from "@/components/LangContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Parivahan Sewa",
  description: "Official portal for driving licence and vehicle services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} font-ibm-plex bg-background text-text antialiased flex flex-col min-h-screen`}
      >
        <LangProvider>
          <Navbar />
          <main className="flex-1 pt-32">
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
