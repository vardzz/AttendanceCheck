import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function getSupabaseClient(): SupabaseClient {
  const url = supabaseUrl.trim();
  const key = supabaseAnonKey.trim();

  if (!url || !key) {
    throw new Error(
      "Missing or empty Supabase environment variables. " +
        "Please check your .env.local file."
    );
  }
  return createClient(url, key);
}

export { getSupabaseClient };
