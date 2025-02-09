import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

// Middleware function that Next.js expects (converted to async)
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next(); // Initialize the response

  // Create the Supabase client
  const { supabase, supabaseResponse: modifiedResponse } = createClient(request, supabaseResponse);

  // Example: Protect a route or add any middleware logic you need
  // Check for user authentication using Supabase session
  const { data } = await supabase.auth.getSession();  // Get the session data

  if (!data.session) {
    // If no session, redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return modifiedResponse; // Return the modified response
}

export const config = {
  // Apply the middleware to routes under /protected/
  matcher: "/protected/:path*", // Correct wildcard pattern for nested routes
};

// Helper function to create the Supabase client
export const createClient = (request: NextRequest, response?: NextResponse) => {
  let supabaseResponse = response || NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  return { supabase, supabaseResponse };
};
