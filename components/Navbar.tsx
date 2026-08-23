"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X, ChevronDown, FileBadge, CarFront, Banknote, FileText, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { t, Lang, LANGUAGE_NAMES, ALL_TRANSLATION_KEYS } from "@/lib/translations";

const ALL_SECTIONS = [
  {
    id: "licence",
    title: "Licence Services",
    items: [
      { name: "Driving Licence Renewal", href: "/dl-renewal" },
      { name: "Apply for Learner's Licence", href: "/coming-soon" },
      { name: "Duplicate Driving Licence", href: "/coming-soon" },
      { name: "International Driving Permit", href: "/coming-soon" },
    ],
  },
  {
    id: "vehicle",
    title: "Vehicle Services",
    items: [
      { name: "Vehicle Registration", href: "/coming-soon" },
      { name: "Transfer of Ownership", href: "/coming-soon" },
      { name: "Duplicate RC", href: "/coming-soon" },
      { name: "Hypothecation", href: "/coming-soon" },
    ],
  },
  {
    id: "payments",
    title: "Payments & Tax",
    items: [
      { name: "Pay Road Tax", href: "/coming-soon" },
      { name: "Pay eChallan", href: "/coming-soon" },
      { name: "Fee Payments", href: "/coming-soon" },
    ],
  },
  {
    id: "permits",
    title: "Permits & Certificates",
    items: [
      { name: "National Permit", href: "/coming-soon" },
      { name: "PUCC (Pollution)", href: "/coming-soon" },
      { name: "Special Permits", href: "/coming-soon" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Simplified nav items
  const topNavItems = [
    { name: t(lang, "nav_home"),         href: "/" },
    { name: t(lang, "nav_services"),     isModalTrigger: true },
    { name: t(lang, "nav_applications"), href: "/coming-soon" },
    { name: t(lang, "nav_help"),         href: "/coming-soon" },
    { name: t(lang, "nav_about"),        href: "/coming-soon" },
    { name: t(lang, "nav_login"),        href: "/coming-soon" },
  ];

  // Esc to close modal & dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsLangDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen]);

  // Filter sections
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return ALL_SECTIONS;
    const term = searchTerm.toLowerCase();
    return ALL_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) => item.name.toLowerCase().includes(term)),
    })).filter((section) => section.items.length > 0);
  }, [searchTerm]);

  // Auto-expand when searching
  useEffect(() => {
    if (searchTerm.trim()) {
      const newExpanded: Record<string, boolean> = {};
      filteredSections.forEach((s) => (newExpanded[s.id] = true));
      setExpandedSections(newExpanded);
    }
  }, [searchTerm, filteredSections]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
      <nav className="relative w-full max-w-[95%] xl:max-w-7xl bg-primary text-white rounded-3xl xl:rounded-full px-4 py-3 xl:px-6 xl:py-3 shadow-lg flex flex-col xl:flex-row xl:items-center justify-between gap-3 xl:gap-0">
        {/* Logo */}
        <Link href="/" className="font-bold font-inter text-xl tracking-tight shrink-0 text-center xl:text-left">
          Parivahan Sewa
        </Link>

        {/* Nav items */}
        <div className="flex overflow-x-auto items-center gap-1 pb-1 xl:pb-0 scrollbar-hide">
          {topNavItems.map((item) => {
            if (item.isModalTrigger) {
              return (
                <button
                  key={item.name}
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors text-white hover:bg-white/10 hover:text-white flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-white/70" />
                  {item.name}
                </button>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.href!}
                className={`px-3 py-1.5 xl:px-3 xl:py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === item.href && item.href !== "/coming-soon"
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* ── Language dropdown ── */}
          <div className="relative ml-2" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              title="Change language"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/30 text-white/80 hover:bg-white/10 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Languages className="w-3.5 h-3.5" />
              {LANGUAGE_NAMES[lang]}
            </button>
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white text-text rounded-2xl shadow-xl border border-text/10 overflow-hidden z-50 flex flex-col py-2"
                >
                  {(Object.entries(LANGUAGE_NAMES) as [Lang, string][]).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setLang(key);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`text-left px-4 py-2 text-sm transition-colors font-medium ${
                        lang === key ? "bg-primary/10 text-primary" : "hover:bg-black/5 text-text/80"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* ── Command Palette Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[5vh] sm:pt-[10vh] px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Search Header */}
              <div className="p-4 bg-white border-b border-text/10">
                <div className="flex items-center px-4 py-3 bg-background rounded-xl border-2 border-transparent focus-within:border-accent transition-colors shadow-inner">
                  <Search className="w-5 h-5 text-text/40 mr-3 shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search for a service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent text-base md:text-lg font-medium text-text outline-none placeholder:text-text/30"
                  />
                  {searchTerm && (
                    <button onClick={() => setSearchTerm("")} className="p-1 hover:bg-text/5 rounded-full text-text/40 hover:text-text mr-2 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="hidden sm:block px-2.5 py-1 text-xs font-semibold bg-white border border-text/10 text-text/50 rounded-md shadow-sm transition-colors"
                  >
                    ESC
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
                {/* Most Used Shortcuts (hidden if searching) */}
                {!searchTerm.trim() && (
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-text/40 uppercase tracking-wider mb-4 font-inter px-2">Most Used</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <Link href="/dl-renewal" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                        <FileBadge className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Renew Licence</span>
                      </Link>
                      <Link href="/coming-soon" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                        <CarFront className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Vehicle Reg.</span>
                      </Link>
                      <Link href="/coming-soon" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                        <Banknote className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Pay Challan</span>
                      </Link>
                      <Link href="/coming-soon" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                        <FileText className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Track App</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Service List */}
                <div>
                  <h3 className="text-xs font-bold text-text/40 uppercase tracking-wider mb-3 font-inter px-2">
                    {searchTerm.trim() ? "Search Results" : "All Services"}
                  </h3>
                  {filteredSections.length === 0 ? (
                    <div className="text-center py-12 text-text/50 font-ibm-plex">
                      No services found matching &quot;{searchTerm}&quot;
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredSections.map((section) => {
                        const isExpanded = expandedSections[section.id];
                        return (
                          <div key={section.id} className="bg-white rounded-2xl overflow-hidden border border-text/5 shadow-sm">
                            <button
                              onClick={() => toggleSection(section.id)}
                              className="w-full flex items-center justify-between p-4 bg-white hover:bg-text/[0.02] transition-colors"
                            >
                              <span className="font-bold text-primary font-inter">{section.title}</span>
                              <div className={`p-1 rounded-full transition-colors ${isExpanded ? "bg-primary/10 text-primary" : "text-text/40"}`}>
                                <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                              </div>
                            </button>
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-2 pb-3 pt-0">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                                      {section.items.map((item) => (
                                        <Link
                                          key={item.name}
                                          href={item.href}
                                          onClick={() => setIsModalOpen(false)}
                                          className="flex items-center px-4 py-3 rounded-xl hover:bg-accent/10 hover:text-primary transition-colors text-text/80 text-sm font-medium group"
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
