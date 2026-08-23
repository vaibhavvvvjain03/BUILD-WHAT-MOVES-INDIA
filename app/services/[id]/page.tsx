import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, FileText, IndianRupee, MapPin, Building2, AlertTriangle, PlayCircle } from "lucide-react";
import { serviceCatalog, getAllServices } from "@/lib/serviceCatalog";

export function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = serviceCatalog[params.id];

  if (!service) {
    notFound();
  }

  const isLive = service.availabilityState === "implemented";
  const actionHref = isLive && service.id === "dl-renewal" ? "/dl-renewal" : "/coming-soon";

  // Group documents
  const requiredDocs = service.documentsRequired.filter(d => d.type === 'required');
  const conditionalDocs = service.documentsRequired.filter(d => d.type === 'conditional');
  const optionalDocs = service.documentsRequired.filter(d => d.type === 'optional');

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* ── Header ── */}
      <div className="bg-primary text-white py-16 mt-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/services" className="text-white/60 hover:text-white text-sm flex items-center gap-2 mb-6 transition-colors">
            &larr; Back to all services
          </Link>
          
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm font-inter">
              {service.category}
            </span>
            {service.availabilityState === "implemented" && (
              <span className="text-[10px] bg-success/20 text-success-light px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-success/30">
                Official Integration Live
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6 leading-tight">
            {service.name}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-ibm-plex mb-10">
            {service.shortDescription}
          </p>

          {!isLive && (
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 backdrop-blur-sm max-w-2xl">
              <div className="flex items-start gap-3">
                <PlayCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">Experience Preview</h3>
                  <p className="text-white/70 text-sm">
                    See how this service would work in the redesigned Parivahan experience. Backend integration will eventually connect this workflow to the official government system.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={actionHref}
              className={`inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-lg transition-transform shadow-lg ${
                isLive
                  ? "bg-accent text-primary hover:scale-105 active:scale-95"
                  : "bg-white text-primary hover:bg-gray-100"
              }`}
            >
              {isLive ? "Start Service" : "Explore Service"}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* ── Before You Start ── */}
        <section className="bg-white rounded-3xl p-8 border border-text/10 shadow-sm mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-accent"></div>
          <h2 className="text-2xl font-bold font-inter text-primary mb-8 flex items-center gap-3">
            Before you start
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text/60 uppercase tracking-wider mb-1">Estimated Time</h3>
                <p className="font-semibold text-primary">{service.estimatedTime}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text/60 uppercase tracking-wider mb-1">Fee Information</h3>
                <p className="font-semibold text-primary">{service.fees.amount}</p>
                {service.fees.description && (
                  <p className="text-xs text-text/60 mt-1">{service.fees.description}</p>
                )}
                {service.fees.calculatedByBackend && (
                  <p className="text-xs text-text/60 mt-1 italic">Applicable fee will be calculated by the official backend.</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text/60 uppercase tracking-wider mb-1">RTO Visit Requirement</h3>
                {service.rtoVisitRequired === 'online' && (
                  <div>
                    <span className="inline-block bg-success/10 text-success-light px-2 py-1 rounded font-bold text-xs uppercase tracking-wider mb-1">Online</span>
                    <p className="text-sm font-medium text-text/80">No physical visit expected for this eligible case.</p>
                  </div>
                )}
                {service.rtoVisitRequired === 'may-require-visit' && (
                  <div>
                    <span className="inline-block bg-yellow-500/10 text-yellow-700 px-2 py-1 rounded font-bold text-xs uppercase tracking-wider mb-1">May Require Visit</span>
                    <p className="text-sm font-medium text-text/80">Depends on service/state/RTO/application conditions.</p>
                  </div>
                )}
                {service.rtoVisitRequired === 'required' && (
                  <div>
                    <span className="inline-block bg-error/10 text-error px-2 py-1 rounded font-bold text-xs uppercase tracking-wider mb-1">RTO Visit Required</span>
                    <p className="text-sm font-medium text-text/80">Physical verification/appointment is part of this workflow.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text/60 uppercase tracking-wider mb-1">Service Availability</h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${service.regionalAvailability.status === 'available' ? 'bg-success' : service.regionalAvailability.status === 'limited' ? 'bg-yellow-500' : 'bg-error'}`}></span>
                  <span className="font-semibold text-primary capitalize">{service.regionalAvailability.status.replace('-', ' ')}</span>
                </div>
                {service.regionalAvailability.states && (
                  <p className="text-xs text-text/70">States: {service.regionalAvailability.states.join(', ')}</p>
                )}
              </div>
            </div>
          </div>

          {service.prerequisites && service.prerequisites.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Important Prerequisites
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-amber-800">
                {service.prerequisites.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <div className="space-y-12">
          {/* ── Eligibility ── */}
          <section>
            <h2 className="text-2xl font-bold font-inter text-primary mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 text-primary rounded-full flex items-center justify-center text-sm">
                1
              </div>
              Eligibility Criteria
            </h2>
            <ul className="space-y-3 pl-11">
              {service.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-text/80">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Documents Required ── */}
          <section>
            <h2 className="text-2xl font-bold font-inter text-primary mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 text-primary rounded-full flex items-center justify-center text-sm">
                2
              </div>
              Documents Checklist
            </h2>
            <div className="pl-11 space-y-6">
              {requiredDocs.length > 0 && (
                <div>
                  <h3 className="font-bold text-text/60 uppercase text-xs tracking-wider mb-3">Required Documents</h3>
                  <ul className="space-y-3">
                    {requiredDocs.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-text/80 bg-white p-3 rounded-lg border border-text/5 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="font-medium text-primary">{doc.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {conditionalDocs.length > 0 && (
                <div>
                  <h3 className="font-bold text-text/60 uppercase text-xs tracking-wider mb-3">Conditional Documents</h3>
                  <ul className="space-y-3">
                    {conditionalDocs.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-text/80 bg-white p-3 rounded-lg border border-text/5 shadow-sm">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-primary block">{doc.name}</span>
                          {doc.condition && <span className="text-sm text-text/60">{doc.condition}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {optionalDocs.length > 0 && (
                <div>
                  <h3 className="font-bold text-text/60 uppercase text-xs tracking-wider mb-3">Optional Documents</h3>
                  <ul className="space-y-3">
                    {optionalDocs.map((doc, i) => (
                      <li key={i} className="flex items-start gap-3 text-text/80 bg-white p-3 rounded-lg border border-text/5 shadow-sm">
                        <FileText className="w-5 h-5 text-primary/30 mt-0.5 flex-shrink-0" />
                        <span className="font-medium text-primary">{doc.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* ── Process Steps ── */}
          <section>
            <h2 className="text-2xl font-bold font-inter text-primary mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 text-primary rounded-full flex items-center justify-center text-sm">
                3
              </div>
              Expected Process Timeline
            </h2>
            <div className="pl-11 space-y-6 relative">
              {service.processSteps.map((step, i) => (
                <div key={step.id} className="relative">
                  {i !== service.processSteps.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-16px] w-[2px] bg-primary/10"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1 z-10 shadow-sm">
                      {step.id}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-text/5 shadow-sm flex-1">
                      <h4 className="font-bold text-primary">{step.title}</h4>
                      <p className="text-text/70 text-sm mt-1">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        {/* ── Bottom CTA ── */}
        <div className="mt-16 bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
          <h3 className="text-2xl font-bold font-inter text-primary mb-4">Ready to proceed?</h3>
          <p className="text-text/70 mb-8 max-w-lg mx-auto">
            {isLive 
              ? "Ensure you have all the required documents scanned and ready before beginning the official application process."
              : "This service is currently in the Experience Preview phase. Explore how the workflow is designed to operate."}
          </p>
          <Link
            href={actionHref}
            className={`inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-lg transition-transform shadow-sm ${
              isLive
                ? "bg-primary text-white hover:bg-primary-light hover:scale-105 active:scale-95"
                : "bg-white border border-text/20 text-primary hover:bg-gray-50"
            }`}
          >
            {isLive ? "Start Service" : "Explore Service"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
