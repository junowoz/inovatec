import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {

  // Set anon to true to use the anonymous authentication
  autoRefreshToken: true,
  persistSession: true,
  anon: true
});
