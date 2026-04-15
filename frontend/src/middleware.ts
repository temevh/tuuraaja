import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Map route prefixes to the roles that are allowed to access them
const ROUTE_ROLES: Record<string, string[]> = {
  "/main": ["admin"],
  "/sub": ["substitute"],
};

// Where to send a user with a given role if they hit an unauthorized route
const ROLE_HOME: Record<string, string> = {
  admin: "/main",
  substitute: "/sub",
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Find a matching protected route
  const entry = Object.entries(ROUTE_ROLES).find(([route]) =>
    path.startsWith(route),
  );

  // Not a protected route — let it through
  if (!entry) return NextResponse.next();

  const [, requiredRoles] = entry;

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const res = await fetch("http://localhost:5000/api/me", {
      headers: { Cookie: `token=${token}` },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { role } = await res.json();

    if (!requiredRoles.includes(role)) {
      const redirectTo = ROLE_HOME[role] ?? "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*", "/sub/:path*"],
};
