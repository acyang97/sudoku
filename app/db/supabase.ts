import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
  // https://stackoverflow.com/questions/76543335/next-js-12-supabase-project-error-no-storage-option-exists-to-persist-the-ses
  { auth: { persistSession: false } }
);

export default supabase;
