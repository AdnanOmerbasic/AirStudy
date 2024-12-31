import Link from "next/link";
import { Button } from "../ui/Button/button";
import { BurgerMenu } from "../BurgerMenu/burger-menu";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../../auth";
import { ButtonSignOut } from "../ui/Button/signOutButton";
import { UserHasAtLeastOneRental } from "@/lib/db/queries/user-has-rentals";

export const Navbar = async () => {
  const session = await auth();
  const hasRentals = await UserHasAtLeastOneRental();
  return (
    <SessionProvider>
      <header className="w-full px-10 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl inline-flex">
          <span className="text-sky-400 font-bold">Air</span>Study
        </Link>
        <nav className="hidden lg:flex gap-10">
          {hasRentals && !session?.user.isAdmin && (
            <div className="flex items-center text-lg">
              <Link href="/dashboard">Dashboard</Link>
            </div>
          )}
          {session?.user?.isAdmin === true && (
            <div className="flex items-center text-lg">
              <Link href="/admin-dashboard">Admin Dashboard</Link>
            </div>
          )}
          <Link href="/start-rental">
            <Button variant="green" size="sm" className="text-md">
              Start Rental
            </Button>
          </Link>
          {session?.user ? (
            <>
              <ButtonSignOut>Log out</ButtonSignOut>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="green" size="sm" className="text-md">
                  Log in
                </Button>
              </Link>
            </>
          )}
        </nav>
        <div className="lg:hidden">
          <BurgerMenu session={session} />
        </div>
      </header>
    </SessionProvider>
  );
};
