"use client";

import { CheckCircle2, Clock, CheckCircle, FileBadge, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { RenewalApplication } from "@/lib/types";
import { serviceCatalog } from "@/lib/serviceCatalog";
import { useLang } from "@/components/LangContext";
import { t } from "@/lib/translations";

export default function ApplicationDetailView({
  application,
}: {
  application: RenewalApplication;
}) {
  const { lang } = useLang();
  const serviceId = "dl-renewal";
  const service = serviceCatalog[serviceId] || {
    name: "Driving Licence Renewal",
    shortDescription: "Service details not available",
    processSteps: [],
  };

  const statusMap: Record<string, { labelKey: string; color: string; descKey: string }> = {
    draft: { labelKey: "status_draft", color: "text-gray-600 bg-gray-100", descKey: "status_draft_desc" },
    otp_verified: { labelKey: "status_otp_verified", color: "text-blue-600 bg-blue-100", descKey: "status_otp_desc" },
    payment_pending: { labelKey: "status_payment_pending", color: "text-yellow-700 bg-yellow-100", descKey: "status_payment_pending_desc" },
    payment_done: { labelKey: "status_payment_done", color: "text-green-700 bg-green-100", descKey: "status_payment_done_desc" },
    submitted: { labelKey: "status_submitted", color: "text-green-700 bg-green-100", descKey: "status_submitted_desc" },
    approved: { labelKey: "status_approved", color: "text-success-dark bg-success/20", descKey: "status_approved_desc" },
  };

  const currentStatusInfo = statusMap[application.status] || { labelKey: "status_unknown", color: "text-gray-500 bg-gray-100", descKey: "" };

  return (
    <div className="bg-bg border-t border-text/5 p-6 md:p-10 rounded-b-3xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-8 border-b border-text/5">
        <div>
          <h3 className="text-2xl font-bold font-inter text-primary mb-1">{t(lang, service.name)}</h3>
          <p className="text-text/60 font-ibm-plex">
            {t(lang, "app_no") || "App No"}: <span className="font-semibold text-text">{application.applicationId}</span>
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${currentStatusInfo.color}`}>
          {application.status === 'approved' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
          )}
          <span className="font-bold text-sm uppercase tracking-wider">{t(lang, currentStatusInfo.labelKey) || currentStatusInfo.labelKey}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-8 relative">
          <h4 className="text-xl font-bold font-inter text-primary mb-6">{t(lang, "app_timeline") || "Application Timeline"}</h4>
          {/* Connecting line */}
          <div className="absolute left-[19px] top-[72px] bottom-4 w-0.5 bg-text/10" />

          {service.processSteps.map((step, index) => {
            let isComplete = false;
            let isCurrent = false;

            if (application.status === 'approved') {
              isComplete = true;
            } else if (application.status === 'submitted' || application.status === 'payment_done') {
              if (index < 4) isComplete = true;
              if (index === 4) isCurrent = true;
            } else if (application.status === 'payment_pending') {
              if (index < 3) isComplete = true;
              if (index === 3) isCurrent = true;
            } else if (application.status === 'otp_verified') {
              if (index < 2) isComplete = true;
              if (index === 2) isCurrent = true;
            } else if (application.status === 'draft') {
              if (index === 0) isCurrent = true;
            }

            return (
              <div key={step.id} className={`relative flex gap-6 ${!isComplete && !isCurrent ? 'opacity-40' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-sm transition-all ${
                  isComplete ? 'bg-success text-white' : 
                  isCurrent ? 'bg-bg border-2 border-primary text-primary' : 
                  'bg-bg border-2 border-text/20 text-text/30'
                }`}>
                  {isComplete ? <CheckCircle2 className="w-6 h-6" /> : 
                   isCurrent ? <Clock className="w-5 h-5" /> : 
                   <div className="w-2 h-2 rounded-full bg-text/20" />}
                </div>
                <div>
                  <h5 className="font-bold text-lg text-primary">{t(lang, step.title)}</h5>
                  <p className="text-text/70 text-sm mb-1">{t(lang, step.description)}</p>
                  
                  {isCurrent && application.status === 'payment_pending' && step.title.toLowerCase().includes('payment') && (
                    <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-flex flex-col gap-2">
                      <p className="text-sm font-semibold text-yellow-800">{t(lang, "fee_payment_pending") || "Fee Payment Pending"}</p>
                      <button className="text-xs font-bold bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-light transition-colors w-fit">
                        {t(lang, "pay_now_btn") || "Pay"} ₹{application.paymentAmount || 200} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  {isCurrent && application.status === 'payment_done' && step.title.toLowerCase().includes('approval') && (
                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 inline-flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <p className="text-sm font-semibold text-blue-800">{t(lang, "under_review_rto") || "Application under review by RTO"}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-text/5 shadow-sm">
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <FileBadge className="w-5 h-5" />
              {t(lang, "applicant_details") || "Applicant Details"}
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text/60">{t(lang, "prof_name") || "Name"}</p>
                <p className="font-semibold text-text">{application.applicantName || "Rajesh Kumar Sharma"}</p>
              </div>
              <div>
                <p className="text-xs text-text/60">{t(lang, "dl_number_label") || "DL Number"}</p>
                <p className="font-semibold text-text font-ibm-plex">{application.dlNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-text/5 shadow-sm">
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {t(lang, "payment_info") || "Payment Information"}
            </h4>
            {application.paymentTransactionId ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm text-text/70">{t(lang, "amount_paid") || "Amount Paid"}</p>
                  <p className="font-bold text-text">₹{application.paymentAmount}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-text/70">{t(lang, "ref_no") || "Ref No"}</p>
                  <p className="text-sm font-ibm-plex text-text/70">{application.paymentTransactionId || "N/A"}</p>
                </div>
                <div className="pt-2 border-t border-text/5 mt-2">
                  <span className="text-xs font-bold text-success-dark bg-success/20 px-2 py-1 rounded">{t(lang, "paid_successfully") || "Paid Successfully"}</span>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-text/70 mb-2">{t(lang, "total_amount_due") || "Total Amount Due"}</p>
                <p className="text-2xl font-bold text-primary">₹{application.paymentAmount || 200}</p>
                <p className="text-xs text-yellow-600 mt-2">{t(lang, "payment_pending_msg") || "Payment pending to proceed"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
