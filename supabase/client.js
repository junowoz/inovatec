import { createClient } from "@supabase/supabase-js";

// credenciales JP
//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = "https://yrdmpvdxobghopvoevsg.supabase.co"
const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZG1wdmR4b2JnaG9wdm9ldnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyNjU0ODIsImV4cCI6MTk5MDg0MTQ4Mn0.vZz5OnLSxhUzqYaGDQ9OMeDhfmwNPX_-sV9vCc3Nj-g"

export const supabase = createClient(supabaseUrl, ANON)