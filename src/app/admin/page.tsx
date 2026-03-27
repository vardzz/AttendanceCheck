import Link from "next/link";
import { ArrowLeft, ClipboardList, RefreshCw } from "lucide-react";
import { fetchAttendance } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let records: Awaited<ReturnType<typeof fetchAttendance>> = [];
  let fetchError = "";

  try {
    records = await fetchAttendance();
  } catch (err) {
    fetchError =
      err instanceof Error ? err.message : "Failed to fetch records.";
  }

  return (
    <main className="flex-1 flex flex-col px-4 py-6 sm:px-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-card border border-card-border hover:border-gray-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-semibold">Attendance Records</h1>
          </div>
        </div>
        <Link
          href="/admin"
          className="p-2 rounded-lg bg-card border border-card-border hover:border-gray-600 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </Link>
      </div>

      {fetchError ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <ClipboardList className="w-12 h-12 text-red-700 mb-4" />
          <p className="text-red-400 text-lg">Connection Error</p>
          <p className="text-gray-600 text-sm mt-1 max-w-sm">{fetchError}</p>
        </div>
      ) : records.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
          <ClipboardList className="w-12 h-12 text-gray-700 mb-4" />
          <p className="text-gray-500 text-lg">No records yet</p>
          <p className="text-gray-600 text-sm mt-1">
            Scanned attendance will appear here.
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            {records.length} record{records.length !== 1 ? "s" : ""}
          </p>

          {/* Table */}
          <div className="rounded-xl border border-card-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-card border-b border-card-border">
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">
                      Student Name
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">
                      Student ID
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">
                      Session
                    </th>
                    <th className="text-left px-4 py-3 text-gray-400 font-medium">
                      Scanned At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.map(
                    (
                      r: {
                        id: string;
                        student_name: string;
                        student_id: string;
                        session_id: string;
                        scanned_at: string;
                      },
                      i: number
                    ) => (
                      <tr
                        key={r.id}
                        className={`border-b border-card-border last:border-0 hover:bg-white/[0.02] transition-colors ${
                          i % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
                        }`}
                      >
                        <td className="px-4 py-3 text-white font-medium">
                          {r.student_name}
                        </td>
                        <td className="px-4 py-3 font-mono text-gray-300">
                          {r.student_id}
                        </td>
                        <td className="px-4 py-3 font-mono text-gray-400 text-xs">
                          {r.session_id}
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(r.scanned_at).toLocaleString()}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
