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
  if (!studentId.trim() || !studentName.trim() || !sessionId.trim()) {
    return { success: false, message: "All fields are required." };
  }

  const supabase = getSupabaseClient();

  // Check for duplicate scan (same student + same session)
  const { data: existing } = await supabase
    .from("attendance")
    .select("id")
    .eq("student_id", studentId)
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) {
    return {
      success: false,
      message: "Attendance already recorded for this session.",
    };
  }

  const { error } = await supabase.from("attendance").insert({
    student_id: studentId,
    student_name: studentName,
    session_id: sessionId,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, message: "Database error. Please try again." };
  }

  return { success: true, message: "Attendance recorded successfully!" };
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
