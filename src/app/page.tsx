"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { User, Hash, CheckCircle, XCircle, Loader2, Shield, Bookmark, QrCode } from "lucide-react";
import { recordAttendance, type AttendanceResult } from "@/app/actions";

function AttendanceForm() {
  const searchParams = useSearchParams();
  const sessionId =
    searchParams.get("session") ||
    searchParams.get("room") ||
    searchParams.get("id") ||
    searchParams.get("code");
  const roomName = searchParams.get("room") || "";

  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!sessionId) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center min-h-[80vh] relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full flex flex-col items-center animate-in fade-in duration-1000 slide-in-from-bottom-4">
          <div className="mb-8">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest animate-pulse">
               <Shield className="w-3.5 h-3.5" /> Secure Portal
             </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Attendance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-serif italic">Check</span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
            Welcome to the attendance system. Please scan the QR code below using your mobile device to record your attendance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 w-full max-w-5xl px-4">
            {/* Station 3CS-A */}
            <div className="relative group flex flex-col items-center">
              <div className="absolute -inset-6 bg-cyan-500/10 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-700" />
              <div className="relative bg-[#0D0D0F]/90 backdrop-blur-3xl border border-white/5 p-7 rounded-[3rem] shadow-[0_0_80px_-20px_rgba(6,182,212,0.15)] ring-1 ring-white/10 transform hover:scale-[1.03] transition-all duration-500">
                <div className="relative w-56 h-56 bg-white rounded-[2rem] overflow-hidden p-4 shadow-2xl ring-8 ring-black/20">
                  <img 
                    src="/qr-3csa.png" 
                    alt="3CS-A QR Code" 
                    className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://attendance-qr.vercel.app?room=3CS-A";
                    }}
                  />
                  {/* Internal Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black/5 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black/5 rounded-br-xl" />
                </div>
                {/* Status Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black border border-emerald-500/30 flex items-center gap-1.5 shadow-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Live Station</span>
                </div>
                <div className="absolute top-7 left-7 right-7 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-40" />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-white tracking-widest">3CS-A</h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-2">Section A</p>
              </div>
            </div>

            {/* Station 3CS-B */}
            <div className="relative group flex flex-col items-center">
              <div className="absolute -inset-6 bg-indigo-500/10 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-3xl transition-all duration-700" />
              <div className="relative bg-[#0D0D0F]/90 backdrop-blur-3xl border border-white/5 p-7 rounded-[3rem] shadow-[0_0_80px_-20px_rgba(99,102,241,0.15)] ring-1 ring-white/10 transform hover:scale-[1.03] transition-all duration-500">
                <div className="relative w-56 h-56 bg-white rounded-[2rem] overflow-hidden p-4 shadow-2xl ring-8 ring-black/20">
                  <img 
                    src="/qr-3csb.png" 
                    alt="3CS-B QR Code" 
                    className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=https://attendance-qr.vercel.app?room=3CS-B";
                    }}
                  />
                  {/* Internal Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black/5 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black/5 rounded-br-xl" />
                </div>
                {/* Status Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black border border-emerald-500/30 flex items-center gap-1.5 shadow-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Live Station</span>
                </div>
                <div className="absolute top-7 left-7 right-7 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-40" />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-white tracking-widest">3CS-B</h3>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-2">Section B</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-xl text-left">
            {[
              { num: "01", title: "Scan", desc: "Open your camera app and point it at the QR code.", icon: QrCode },
              { num: "02", title: "Fill", desc: "Enter your official student details in the form.", icon: User },
              { num: "03", title: "Verify", desc: "Submit and confirm your attendance instantly.", icon: CheckCircle }
            ].map((step) => (
              <div key={step.num} className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="text-indigo-400/50 font-mono text-xs font-bold leading-none">{step.num}</span>
                </div>
                <div className="text-white font-bold text-sm mb-1 group-hover:text-indigo-300 transition-colors">{step.title}</div>
                <p className="text-gray-500 text-[11px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-gray-700 font-mono text-[10px] uppercase tracking-[0.2em]">
            Horizon Secure Authorization Active
          </div>
        </div>
        
        <style jsx>{`
          @keyframes scan {
            0%, 100% { top: 2rem; opacity: 0; }
            50% { top: 18rem; opacity: 1; }
          }
        `}</style>
      </main>
    );
  }

  if (result?.success) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 animate-in zoom-in duration-500">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/20 mx-auto">
            <CheckCircle className="w-14 h-14 text-emerald-400" />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
            successfully login
          </h2>
          
          <div className="bg-card border border-card-border rounded-2xl p-6 max-w-sm mx-auto shadow-2xl">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-4 text-emerald-500/80">
              Attendance Verified
            </p>
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Name:</span>
                <span className="text-white font-medium">{studentName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">ID:</span>
                <span className="text-white font-mono">{studentId}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-card-border pt-2 mt-2">
                <span className="text-gray-500">Room:</span>
                <span className="text-indigo-400 font-medium">{roomName || sessionId}</span>
              </div>
            </div>
          </div>
          
          <p className="mt-8 text-gray-500 text-sm italic">
            You can now close this window.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col px-4 py-12 sm:px-6 max-w-lg mx-auto w-full">
      {/* GLOW EFFECT */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
            <Bookmark className="w-3.5 h-3.5" />
            Active Session: {roomName || sessionId}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Record Attendance</h1>
          <p className="text-gray-400 mt-2">Enter your official student details below.</p>
        </div>

        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            setResult(null);
            try {
              const res = await recordAttendance(studentId, studentName, sessionId);
              setResult(res);
            } catch (err) {
              console.error("Form submission failed:", err);
              setResult({ success: false, message: "Connection failure. Check browser console." });
            } finally {
              setSubmitting(false);
            }
          }} 
          className="space-y-5"
        >
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400" /> Full Name
              </span>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full px-5 py-4 rounded-2xl bg-card border border-card-border text-white 
                           placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                           focus:border-indigo-500 transition-all shadow-inner"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4 text-indigo-400" /> Student ID Number
              </span>
              <input
                type="text"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="2024-00123"
                className="w-full px-5 py-4 rounded-2xl bg-card border border-card-border text-white 
                           placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                           focus:border-indigo-500 transition-all shadow-inner"
              />
            </label>
          </div>

          {result && !result.success && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-950/30 border border-red-500/20 text-red-300 text-sm animate-in fade-in slide-in-from-top-1">
              <XCircle className="w-5 h-5 shrink-0 text-red-500" />
              {result.message}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg
                       shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-[0.98]
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 mt-4"
          >
            {submitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Attendance"
            )}
          </button>
        </form>
        
        <p className="mt-10 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
           <Shield className="w-3 h-3" /> Secure Verification Active
        </p>
        
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>}>
      <AttendanceForm />
    </Suspense>
  );
}
