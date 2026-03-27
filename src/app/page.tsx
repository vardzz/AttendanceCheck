"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { User, Hash, CheckCircle, XCircle, Loader2, Shield, Bookmark } from "lucide-react";
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
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-8">
          <Shield className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Access Restricted</h1>
        <p className="text-gray-400 max-w-sm leading-relaxed">
          This system is only accessible by scanning a valid QR code located in your classroom.
        </p>
        <p className="mt-8 text-[10px] text-gray-700 font-mono tracking-widest uppercase">
          Secret Token Required
        </p>
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
