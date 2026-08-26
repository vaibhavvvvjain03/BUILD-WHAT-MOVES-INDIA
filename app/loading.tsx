import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center space-y-4 border border-text/10 animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-primary animate-spin relative" />
        </div>
        <p className="text-text/70 font-medium font-inter animate-pulse">Loading Parivahan Sewa...</p>
      </div>
    </div>
  );
}
