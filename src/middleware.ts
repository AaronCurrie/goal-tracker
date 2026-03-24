import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options });
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ---- 1️⃣ If NOT logged in ----
  if (!user) {
    // Allow access to login page
    if (pathname.startsWith("/login")) {
      return response;
    }
    if(pathname.startsWith("/signup")) {
      return response;
    }
    // Redirect to login for any other page

    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ---- 2️⃣ If logged in and at root ----
  if (user && pathname === "/") {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const url = request.nextUrl.clone();
    url.pathname = `/goals/yearly/${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};