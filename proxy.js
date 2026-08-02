import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Next.js 16 renamed middleware.js/middleware to proxy.js/proxy. This runs
// on every request to /admin/* (see `matcher` below) and is the first line
// of defense for the admin panel: unauthenticated requests are bounced to
// /admin/login before any admin page ever renders. The (dashboard) layout
// re-checks the session as a second safety net.
export async function proxy(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (!user && !isLoginRoute) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isLoginRoute) {
    const productsUrl = new URL("/admin/products", request.url);
    return NextResponse.redirect(productsUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
