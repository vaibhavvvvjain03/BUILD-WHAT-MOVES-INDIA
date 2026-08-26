"use client";

import Link from "next/link";
import { ChevronRight, Search, LayoutGrid } from "lucide-react";
import { serviceCategories, getAllServices } from "@/lib/serviceCatalog";
import { useState } from "react";
import { t } from "@/lib/translations";

export default function ServicesCataloguePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const allServices = getAllServices();
  
  const filteredCategories = serviceCategories.map(categoryName => {
    const categoryServices = allServices.filter(s => s.category === categoryName);
    return {
      id: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: categoryName,
      services: categoryServices.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };
  }).filter(c => c.services.length > 0);

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Header ── */}
      <div className="bg-primary text-white py-16 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-inter mb-4">{t("en", "All Services")}</h1>
              <p className="text-white/80 max-w-2xl text-lg">
                {t("en", "Browse our complete catalogue of official transport and driving licence services.")}
              </p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
              <input
                type="text"
                placeholder={t("en", "Search services...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-text rounded-full py-3 pl-12 pr-6 border-none focus:ring-2 focus:ring-accent outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Catalogue ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold text-primary mb-2">{t("en", "No services found")}</h3>
            <p className="text-text/70">{t("en", "Try adjusting your search terms.")}</p>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredCategories.map((category) => (
              <section key={category.id} id={category.id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold font-inter text-primary">{t("en", category.title)}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-text/5 flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-primary font-inter leading-tight group-hover:text-accent transition-colors">
                          {t("en", service.name)}
                        </h3>
                        {service.availabilityState === "implemented" && (
                          <span className="text-[10px] bg-success/20 text-success-dark px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {t("en", "Live")}
                          </span>
                        )}
                        {service.availabilityState === "preview" && (
                          <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {t("en", "Beta")}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text/70 flex-1 mb-6">
                        {t("en", service.shortDescription)}
                      </p>
                      <div className="flex items-center text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        {t("en", "View Details")} <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
