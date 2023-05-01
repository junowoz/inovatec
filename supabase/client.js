import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;
const supabaseUrl = "https://tskpdujrzwsmbmdcxlej.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRza3BkdWpyendzbWJtZGN4bGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MzcyNzQsImV4cCI6MTk5NTExMzI3NH0.7_RDS2KV9oBXI09vcyFSRNumGHhEGTRIyzTRy4MvkHM"

export const supabase = createClient(supabaseUrl, supabaseKey, {

  // Set anon to true to use the anonymous authentication
  autoRefreshToken: true,
  persistSession: true,
  anon: true
});