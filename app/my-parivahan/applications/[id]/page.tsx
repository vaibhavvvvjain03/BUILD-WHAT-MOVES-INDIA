import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";
import { getRenewalStore } from "@/lib/mockData";
import ApplicationDetailView from "@/components/ApplicationDetailView";

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const store = getRenewalStore();
  const application = store.get(params.id);

  if (!application) {
    return (
      <div className="min-h-screen bg-bg pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/my-parivahan" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-text/5 text-center">
            <SearchX className="w-12 h-12 text-text/30 mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-inter text-text mb-2">Application Not Found</h2>
            <p className="text-text/70 mb-6 max-w-md mx-auto">
              We couldn&apos;t find an application with the ID &quot;{params.id}&quot;. It might have been removed or the ID is incorrect.
            </p>
            <Link href="/my-parivahan" className="inline-flex bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-light transition-colors">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/my-parivahan" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-text/5 overflow-hidden">
          <ApplicationDetailView application={application} />
        </div>
      </div>
    </div>
  );
}
