"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, User, Hash, CheckCircle, XCircle, Loader2 } from "lucide-react";
import QRScanner from "@/components/QRScanner";
import { recordAttendance, type AttendanceResult } from "@/app/actions";

export default function ScanPage() {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [scannedSession, setScannedSession] = useState("");
  const [result, setResult] = useState<AttendanceResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleScanSuccess = useCallback(
    async (decodedText: string) => {
      setScannedSession(decodedText);

      if (!studentName.trim() || !studentId.trim()) {
        setResult({
          success: false,
          message: "Please fill in your name and ID before scanning.",
        });
        return;
      }

      setSubmitting(true);
      try {
        const res = await recordAttendance(studentId, studentName, decodedText);
        setResult(res);
      } catch {
        setResult({ success: false, message: "Network error. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
    [studentName, studentId]
  );

  return (
    <main className="flex-1 flex flex-col px-4 py-6 sm:px-6 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="p-2 rounded-lg bg-card border border-card-border hover:border-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-xl font-semibold">Scan Attendance</h1>
      </div>

      {/* Student Info */}
      <div className="space-y-3 mb-8">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Student Name
          </span>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="e.g. Juan Dela Cruz"
            className="w-full px-4 py-3 rounded-xl bg-card border border-card-border
                       text-white placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                       transition-all"
          />
        </label>
        <label className="block">
          <span className="text-sm text-gray-400 mb-1.5 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" /> Student ID
          </span>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="e.g. 2024-00123"
            className="w-full px-4 py-3 rounded-xl bg-card border border-card-border
                       text-white placeholder:text-gray-600
                       focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                       transition-all"
          />
        </label>
      </div>

      {/* QR Scanner */}
      <QRScanner onScanSuccess={handleScanSuccess} />

      {/* Result feedback */}
      {submitting && (
        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving attendance…
        </div>
      )}

      {result && !submitting && (
        <div
          className={`mt-6 flex items-start gap-3 p-4 rounded-xl border ${
            result.success
              ? "bg-emerald-950/40 border-emerald-500/30"
              : "bg-red-950/40 border-red-500/30"
          }`}
        >
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
          )}
          <div>
            <p
              className={`text-sm font-medium ${
                result.success ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {result.message}
            </p>
            {scannedSession && (
              <p className="text-xs text-gray-500 mt-1">
                Session: <span className="font-mono">{scannedSession}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
