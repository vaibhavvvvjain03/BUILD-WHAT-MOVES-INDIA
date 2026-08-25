"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, X, ChevronDown, FileBadge, CarFront, Banknote, FileText, Languages, Bot, ChevronRight, Sparkles, User, LogOut, LayoutDashboard, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";
import { useSession } from "@/lib/sessionContext";
import { findLicenceByDl } from "@/lib/mockData";

import { serviceCategories, getAllServices } from "@/lib/serviceCatalog";
import { matchServiceIntent, getClarifyingFollowup, ServiceMatchResult } from "@/lib/vaniServiceNavigator";
import ThemedLoader from "@/components/ThemedLoader";
type ChatMessage = {
  id: string;
  role: "user" | "vani";
  text?: string;
  isTyping?: boolean;
  match?: ServiceMatchResult;
};

const ALL_SECTIONS = serviceCategories.map(category => ({
  id: category.toLowerCase().replace(/\s+/g, '-'),
  title: category,
  items: getAllServices()
    .filter(s => s.category === category)
    .map(s => ({
      name: s.name,
      href: `/services/${s.id}`
    }))
})).filter(section => section.items.length > 0);

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang } = useLang();
  const { session, logout } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"browse" | "describe">("browse");
  const [describeInput, setDescribeInput] = useState("");
  const [matchResult, setMatchResult] = useState<ServiceMatchResult | null>(null);
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "vani",
      text: "Tell me what you're trying to do on Parivahan."
    }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Derive display name from linked DL or fall back to mobile number
  const displayName = useMemo(() => {
    if (!session.isLoggedIn) return null;
    if (session.linkedDL) {
      const licence = findLicenceByDl(session.linkedDL);
      if (licence) {
        // First name only for compactness
        return licence.name.split(" ")[0];
      }
    }
    return session.mobileNumber ? `+91 ${session.mobileNumber.slice(-4).padStart(10, "•")}` : "You";
  }, [session]);

  // Navigation items — Login is replaced when logged in
  const topNavItems = [
    { name: t(lang, "nav_home") || "Home",               href: "/" },
    { name: t(lang, "nav_services") || "Services",           isModalTrigger: true },
    { name: t(lang, "nav_my_parivahan") || "My Parivahan",   href: "/my-parivahan" },
    { name: t(lang, "nav_track_application") || "Track Application", href: "/track-application" },
    { name: t(lang, "nav_help") || "Help",               href: "/help" },
    { name: t(lang, "nav_about") || "About",              href: "/about" },
  ];

  // Esc to close all dropdowns & modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsUserDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);



  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
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

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeTab === "describe") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, activeTab]);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "describe" && describeInput.trim()) {
      const userText = describeInput.trim();
      const userId = Date.now().toString();
      
      setChatHistory(prev => [...prev, { id: userId, role: "user", text: userText }]);
      setDescribeInput("");

      // Add typing indicator
      const typingId = userId + "_typing";
      setChatHistory(prev => [...prev, { id: typingId, role: "vani", isTyping: true }]);

      setTimeout(() => {
        let newMatch: ServiceMatchResult;
        if (matchResult && matchResult.confidence !== "high") {
          newMatch = getClarifyingFollowup(matchResult, userText);
        } else {
          newMatch = matchServiceIntent(userText);
        }
        setMatchResult(newMatch);

        setChatHistory(prev => {
          const filtered = prev.filter(m => m.id !== typingId);
          return [...filtered, { id: Date.now().toString(), role: "vani", match: newMatch }];
        });
      }, 500);
    }
  };

  function handleLogout() {
    setIsUserDropdownOpen(false);
    logout();
    router.push("/");
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] flex justify-center">
      <nav className="relative w-full max-w-[95%] xl:max-w-7xl bg-primary text-white rounded-3xl xl:rounded-full px-3 py-2 xl:px-6 xl:py-3 shadow-lg flex flex-col xl:flex-row xl:items-center justify-between">
        
        {/* Top Row (Always visible) */}
        <div className="flex items-center justify-between w-full">
          
          {/* Logo */}
          <Link href="/" className="font-bold font-inter text-lg xl:text-xl tracking-tight shrink-0 mr-2">
            Parivahan Sewa
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center justify-center flex-1 mx-4 gap-1">
          {topNavItems.map((item) => {
            if (item.isModalTrigger) {
              return (
                <button
                  key={item.name}
                  onClick={() => { setActiveTab("browse"); setIsModalOpen(true); }}
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
          </div>

          {/* Right Actions: Auth, VANI, Lang, Hamburger */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* ── Auth area ── */}
            {session.isLoggedIn ? (
              /* Logged-in: user chip + dropdown */
              <div className="relative flex-shrink-0" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(o => !o)}
                  className="flex items-center gap-2 px-2.5 py-1.5 md:px-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all"
                  title="Account"
                >
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="hidden sm:block max-w-[80px] truncate">{displayName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${isUserDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white text-text rounded-2xl shadow-xl border border-text/10 overflow-hidden z-50 flex flex-col py-2"
                    >
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-text/10">
                        <p className="text-sm font-bold text-text truncate mb-1">{session.name || "User"}</p>
                        <p className="text-xs font-semibold text-primary font-ibm-plex truncate">
                          +91 {session.mobileNumber}
                        </p>
                        {session.linkedDL && (
                          <p className="text-xs text-text/50 font-mono mt-0.5">{session.linkedDL}</p>
                        )}
                      </div>

                      <Link
                        href="/my-parivahan"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-text/80 hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {t(lang, "nav_my_parivahan")}
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        {t(lang, "nav_logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Logged-out: Login link */
              <Link
                href="/login"
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  pathname === "/login"
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t(lang, "nav_login") || "Login"}
              </Link>
            )}

            {/* ── Ask VANI Button ── */}
            <button
              onClick={() => { setActiveTab("describe"); setIsModalOpen(true); }}
              title="Ask VANI"
              className="group relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#f3b82a] text-black shadow-[0_0_12px_rgba(243,184,42,0.5)] hover:shadow-[0_0_20px_rgba(243,184,42,0.8)] transition-all flex-shrink-0"
            >
              {/* Glow / Pulse effect */}
              <div className="absolute inset-0 rounded-full bg-[#f3b82a] animate-ping opacity-30" />
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform group-hover:scale-110" />
            </button>

            {/* ── Language Toggle ── */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                title="Change language"
                className="flex items-center gap-1.5 px-2 py-1.5 md:px-3 rounded-full border border-white/30 text-white/80 hover:bg-white/10 hover:text-white text-sm font-medium transition-colors whitespace-nowrap"
              >
                <Languages className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === "en" ? "हिन्दी" : "English"}</span>
                <span className="sm:hidden">{lang === "en" ? "हि" : "En"}</span>
              </button>
            </div>

            {/* ── Hamburger Menu Toggle (Mobile Only) ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 rounded-full hover:bg-white/10 transition-colors ml-0.5"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Items */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden overflow-hidden flex flex-col gap-1 mt-2 pt-3 border-t border-white/10 w-full"
            >
              {topNavItems.map((item) => {
                if (item.isModalTrigger) {
                  return (
                    <button
                      key={item.name}
                      onClick={() => { setActiveTab("browse"); setIsModalOpen(true); setIsMobileMenuOpen(false); }}
                      className="px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-white hover:bg-white/10 text-left flex items-center gap-2 w-full"
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors w-full ${
                      pathname === item.href && item.href !== "/coming-soon"
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
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
                <div className="flex flex-col px-4 pt-4 pb-2 bg-white border-b border-text/10 gap-3">
                  {/* Search Type Toggle */}
                  <div className="flex bg-text/5 p-1 rounded-lg w-fit">
                    <button 
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === "browse" ? "bg-white shadow-sm text-primary" : "text-text/60 hover:text-text"}`}
                      onClick={() => { setActiveTab("browse"); }}
                    >
                      {t(lang, "finder_browse") || "Browse & Search"}
                    </button>
                    <button 
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeTab === "describe" ? "bg-white shadow-sm text-primary" : "text-text/60 hover:text-text"}`}
                      onClick={() => { setActiveTab("describe"); }}
                    >
                      {t(lang, "finder_title") || "Describe what you need ✨"}
                    </button>
                  </div>
                  
                  <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-3 bg-background rounded-xl border-2 border-transparent focus-within:border-accent transition-colors shadow-inner">
                    <Search className="w-5 h-5 text-text/40 mr-3 shrink-0" />
                    <input
                      type="text"
                      autoFocus
                      placeholder={activeTab === "browse" ? t(lang, "finder_search_placeholder") || "Search by service name or category..." : t(lang, "finder_ai_placeholder") || "E.g. I bought a second-hand car..."}
                      value={activeTab === "browse" ? searchTerm : describeInput}
                      onChange={(e) => {
                        if (activeTab === "browse") setSearchTerm(e.target.value);
                        else setDescribeInput(e.target.value);
                      }}
                      className="flex-1 bg-transparent text-base md:text-lg font-medium text-text outline-none placeholder:text-text/30"
                    />
                    {(searchTerm || describeInput) && (
                      <button type="button" onClick={() => activeTab === "browse" ? setSearchTerm("") : setDescribeInput("")} className="p-1 hover:bg-text/5 rounded-full text-text/40 hover:text-text mr-2 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="hidden sm:block px-2.5 py-1 text-xs font-semibold bg-white border border-text/10 text-text/50 rounded-md shadow-sm transition-colors"
                    >
                      ESC
                    </button>
                  </form>
                </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
                {activeTab === "browse" ? (
                  <>
                    {/* Most Used Shortcuts (hidden if searching) */}
                    {!searchTerm.trim() && (
                      <div className="mb-8">
                        <h3 className="text-xs font-bold text-text/40 uppercase tracking-wider mb-4 font-inter px-2">Most Used</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <Link href="/services/dl-renewal" prefetch={true} onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                            <FileBadge className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Renew Licence</span>
                          </Link>
                          <Link href="/services/transfer-ownership" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                            <CarFront className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Transfer Vehicle</span>
                          </Link>
                          <Link href="/services/pay-challan" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
                            <Banknote className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">Pay Challan</span>
                          </Link>
                          <Link href="/track-application" onClick={() => setIsModalOpen(false)} className="flex flex-col p-4 bg-white rounded-2xl shadow-sm border border-text/5 hover:border-accent hover:shadow-md transition-all group">
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
                  </>
                ) : (
                  <div className="h-full min-h-[40vh] flex flex-col justify-end">
                    <div className="space-y-4 pb-4">
                      {chatHistory.map(msg => (
                        <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                          {msg.role === "vani" && (
                            <div className="flex items-center gap-1.5 mb-1.5 pl-1">
                              <div className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                                <Bot className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-xs font-bold text-text/50">VANI</span>
                            </div>
                          )}
                          <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
                            msg.role === "user" 
                              ? "bg-primary text-white rounded-tr-sm" 
                              : "bg-white border border-text/10 shadow-sm rounded-tl-sm text-text"
                          }`}>
                            {msg.isTyping ? (
                              <div className="flex gap-2 items-center h-5 px-1">
                                <ThemedLoader size="sm" className="text-primary" />
                                <span className="text-xs text-text/50 font-medium">VANI is thinking...</span>
                              </div>
                            ) : msg.text ? (
                              <p className="text-sm leading-relaxed">{msg.text}</p>
                            ) : msg.match ? (
                              <div className="space-y-3">
                                 {(msg.match.confidence === "high" || msg.match.confidence === "medium") && msg.match.matchedService ? (
                                    <div className="flex flex-col">
                                      {(() => {
                                        const service = getAllServices().find(s => s.id === msg.match?.matchedService);
                                        if (!service) return null;
                                        return (
                                          <>
                                            <p className="text-sm text-text/80 mb-3">{msg.match.explanation}</p>
                                            <div className="bg-text/5 p-3 rounded-xl border border-text/10 mb-3">
                                              <h4 className="font-bold text-primary mb-2">{service.name}</h4>
                                              
                                              {service.documentsRequired && service.documentsRequired.length > 0 && (
                                                <div className="mb-2">
                                                  <span className="text-xs font-bold text-text/60 block mb-1">What you&apos;ll need:</span>
                                                  <ul className="text-xs text-text/80 list-disc pl-4">
                                                    {service.documentsRequired.map(doc => (
                                                      <li key={doc.name}>{doc.name}</li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              )}
                                              
                                              {service.rtoVisitRequired && (
                                                <div>
                                                  <span className="text-xs font-bold text-text/60 block mb-1">RTO visit:</span>
                                                  <p className="text-xs text-text/80">
                                                    {service.rtoVisitRequired === 'online' ? 'Completely online.' : 
                                                     service.rtoVisitRequired === 'required' ? 'Required.' : 
                                                     'May depend on the application and RTO.'}
                                                  </p>
                                                </div>
                                              )}
                                            </div>
                                            
                                            <div className="flex">
                                              <Link href={`/services/${service.id}`} onClick={() => setIsModalOpen(false)} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                                                {service.availabilityState === 'implemented' ? 'Start application' :
                                                 service.availabilityState === 'preview' ? 'View experience preview' : 
                                                 'Explore service'} 
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                              </Link>
                                            </div>
                                          </>
                                        );
                                      })()}
                                    </div>
                                 ) : msg.match.matchedService ? (
                                    <div>
                                      {msg.match.matchedService && (
                                        <div className="mb-3 pb-3 border-b border-text/5">
                                          <h4 className="font-semibold text-text/80 text-sm mb-1">{
                                            getAllServices().find(s => s.id === msg.match?.matchedService)?.name || msg.match.matchedService
                                          } (Tentative)</h4>
                                          <p className="text-xs text-text/60">{msg.match.explanation}</p>
                                        </div>
                                      )}
                                      <p className="text-sm font-medium text-text">{msg.match.clarifyingQuestion}</p>
                                    </div>
                                 ) : (
                                    <div>
                                      <p className="text-sm text-text/80 mb-4">{msg.match.explanation}</p>
                                      {msg.match.clarifyingQuestion ? (
                                        <p className="text-sm font-medium text-text mb-3">{msg.match.clarifyingQuestion}</p>
                                      ) : (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                          <button onClick={() => setActiveTab("browse")} className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-semibold transition-colors">Browse services</button>
                                          <button onClick={() => setDescribeInput("")} className="px-3 py-1.5 bg-text/5 text-text/80 hover:bg-text/10 rounded-lg text-xs font-semibold transition-colors">Try again</button>
                                          <Link href="/help" onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 bg-text/5 text-text/80 hover:bg-text/10 rounded-lg text-xs font-semibold transition-colors">Open Help</Link>
                                        </div>
                                      )}
                                    </div>
                                 )}
                                 {msg.match.secondaryMatches && msg.match.secondaryMatches.length > 0 && (
                                    <div className="pt-3 border-t border-text/5 mt-3">
                                      <p className="text-xs font-semibold text-text/50 mb-2">You also asked about:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {msg.match.secondaryMatches.map(alt => {
                                          const service = getAllServices().find(s => s.id === alt);
                                          return service ? (
                                             <Link key={alt} href={`/services/${service.id}`} onClick={() => setIsModalOpen(false)} className="px-2.5 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-md text-xs font-medium text-primary transition-colors">
                                               {service.name}
                                             </Link>
                                          ) : null;
                                        })}
                                      </div>
                                    </div>
                                 )}
                                 {msg.match.alternativeMatches && msg.match.alternativeMatches.length > 0 && (
                                    <div className="pt-3 border-t border-text/5 mt-3">
                                      <p className="text-xs font-semibold text-text/50 mb-2">Related:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {msg.match.alternativeMatches.map(alt => {
                                          const service = getAllServices().find(s => s.id === alt);
                                          return service ? (
                                             <Link key={alt} href={`/services/${service.id}`} onClick={() => setIsModalOpen(false)} className="px-2.5 py-1.5 bg-text/5 hover:bg-text/10 rounded-md text-xs font-medium text-text transition-colors">
                                               {service.name}
                                             </Link>
                                          ) : null;
                                        })}
                                      </div>
                                    </div>
                                 )}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
