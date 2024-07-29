import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://unjkbaoraohnilmpzeuu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuamtiYW9yYW9obmlsbXB6ZXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxOTM1OTMsImV4cCI6MjAzNzc2OTU5M30._vbj_N_AglZGKrEBvFbWqG8tAW7S-SAE0VrlApXyI0k";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
