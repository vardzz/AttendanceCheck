"use server";

import { getSupabaseClient } from "@/lib/supabase";

export type AttendanceResult = {
  success: boolean;
  message: string;
};

export async function recordAttendance(
  studentId: string,
  studentName: string,
  sessionId: string
): Promise<AttendanceResult> {
  try {
    if (!studentId.trim() || !studentName.trim() || !sessionId.trim()) {
      return { success: false, message: "All fields are required." };
    }

    let supabase;
    try {
      console.log("DEBUG: Initializing Supabase client...");
      console.log("DEBUG: URL starts with:", process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10));
      console.log("DEBUG: Key starts with:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10));
      supabase = getSupabaseClient();
    } catch (configError: any) {
      console.error("Configuration Error:", configError.message);
      return { 
        success: false, 
        message: "Server is not configured with Supabase. Please check .env.local" 
      };
    }

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Check for duplicate scan (same student + same session + same day)
    const { data: existing, error: checkError } = await supabase
      .from("attendance")
      .select("id")
      .eq("student_id", studentId)
      .eq("session_id", sessionId)
      .gte("scanned_at", `${today}T00:00:00Z`)
      .lte("scanned_at", `${today}T23:59:59Z`)
      .maybeSingle();

    if (checkError) {
      console.error("Duplicate Check Error:", checkError);
      return { success: false, message: "Connection error during verification." };
    }

    if (existing) {
      return {
        success: false,
        message: "Attendance already recorded for today in this session.",
      };
    }

    const { error: insertError } = await supabase.from("attendance").insert({
      student_id: studentId,
      student_name: studentName,
      session_id: sessionId,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return { 
        success: false, 
        message: `Database Error: ${insertError.message}` 
      };
    }

    return { success: true, message: "Attendance recorded successfully!" };
  } catch (err: any) {
    console.error("Unexpected Error:", err);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}

export async function fetchAttendance() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("attendance")
    .select("*")
    .order("scanned_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return [];
  }

  return data ?? [];
}
