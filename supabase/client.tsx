
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
