import Link from "next/link";
import { Camera, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        {/* Logo mark */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-8">
          <Camera className="w-8 h-8 text-white" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          QR Attendance
        </h1>
        <p className="mt-4 text-gray-400 text-lg leading-relaxed">
          Scan a QR code to record your attendance instantly. Fast, paperless,
          and hassle-free.
        </p>

        <Link
          href="/scan"
          className="mt-10 inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                     bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg
                     shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50
                     hover:from-indigo-500 hover:to-purple-500 active:scale-[0.97]
                     transition-all duration-200"
        >
          <Camera className="w-5 h-5" />
          Start Attendance
        </Link>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-card-border">
            <Zap className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-white">Instant Scan</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Records in under a second.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-card-border">
            <Shield className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div className="text-left">
              <p className="text-sm font-medium text-white">Duplicate Guard</p>
              <p className="text-xs text-gray-500 mt-0.5">
                One scan per student per session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
