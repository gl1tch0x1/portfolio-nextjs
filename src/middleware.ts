import { createServerClient } from "@supabase/ssr";
import { type SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

// Define types for better type safety
interface SupabaseResponse {
  supabase: SupabaseClient;
  supabaseResponse: NextResponse;
}

// Helper function to create the Supabase client
const createClient = (request: NextRequest, response?: NextResponse): SupabaseResponse => {
  const supabaseResponse = response || NextResponse.next();

  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          supabaseResponse.cookies.set({
            name,
            value,
            ...options
          });
        },
        remove: (name, options) => {
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options
          });
        },
      },
    }
  );

  return { supabase, supabaseResponse };
};

// Middleware function with proper error handling
export async function middleware(request: NextRequest) {
  try {
    const supabaseResponse = NextResponse.next();
    const { supabase, supabaseResponse: modifiedResponse } = createClient(request, supabaseResponse);

    // Get the session data with timeout
    const { data, error } = await Promise.race<{ data: { session: any } | null, error: any }>([
      supabase.auth.getSession(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Auth timeout')), 5000)
      )
    ]);

    if (error) {
      console.error('Auth error:', error);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!data?.session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Add user context to headers for downstream use
    modifiedResponse.headers.set('x-user-id', data.session.user.id);
    
    return modifiedResponse;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
}

// Configure protected routes
export const config = {
  matcher: [
    '/protected/:path*',
    '/api/protected/:path*',
    '/admin/:path*'
  ]
};
