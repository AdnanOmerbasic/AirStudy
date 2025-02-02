import { UserHasAtLeastOneRental } from "@/lib/db/queries/user-has-rentals";
import { auth } from "./auth";
import { NextResponse } from "next/server";

const isLoggedIn = ["/sign-in", "/sign-up", "admin-dashboard"];
const notRenting = ["/dashboard", "/admin-dashboard"];
const notLoggedIn = ["start-rental", "/dashboard", "/admin-dashboard"];


export default auth(async (req) => {
  const { pathname, origin } = req.nextUrl;
  const hasRental = await UserHasAtLeastOneRental();

  console.log("Current pathname:", pathname);
  console.log("Auth data:", req.auth);

  if (req.auth && isLoggedIn.includes(pathname)) {
    console.log("Redirecting from logged-in auth route...");
    const newUrl = new URL("/", origin);
    return NextResponse.redirect(newUrl);
  }

  if (req.auth && !hasRental && notRenting.includes(pathname)) {
    console.log("Redirecting from logged-in auth route...");
    const newUrl = new URL("/", origin);
    return NextResponse.redirect(newUrl);
  }

  if (!req.auth && notLoggedIn.includes(pathname)) {
    console.log("Redirecting from logged-in auth route...");
    const newUrl = new URL("/", origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
