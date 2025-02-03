import { UserHasAtLeastOneRental } from "@/lib/db/queries/user-has-rentals";
import { auth } from "../auth";
import { NextResponse } from "next/server";

const isLoggedIn = ["/sign-in", "/sign-up"];
const userRenting = ["/dashboard"];
const protectedRoutes = ["/dashboard", "/start-rental"];
const isAdmin = ["/admin-dashboard"];

export default auth(async (req) => {
  const { pathname, origin } = req.nextUrl;
  const user = req.auth;
  const hasRental = await UserHasAtLeastOneRental();

  if (user && isLoggedIn.includes(pathname)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (user && !user?.user.isAdmin && isAdmin.includes(pathname)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (user && !hasRental && userRenting.includes(pathname)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  if (!user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", origin));
  }

  if (!user && isAdmin.includes(pathname)) {
    return NextResponse.redirect(new URL("/", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/admin-dashboard",
    "/dashboard",
    "/start-rental",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
