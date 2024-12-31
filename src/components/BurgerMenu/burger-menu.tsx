"use client";
import { CloseMenu } from "@/icons/close-icon/close-icon";
import { Menu } from "@/icons/menu-icon/menu";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { logOut } from "@/actions/log-out";
import { UserHasAtLeastOneRental } from "@/lib/db/queries/user-has-rentals";
import { Session } from "next-auth";

interface BurgerMenuProps {
    session: Session | null
}
export const BurgerMenu = ({session}: BurgerMenuProps) => {
  const [hasRental, setRental] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchRental() {
      const UserHasRental = await UserHasAtLeastOneRental();
      setRental(UserHasRental!);
    }
    if (session?.user) fetchRental();
  }, [session]);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <CloseMenu className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
      <div
        className={clsx(
          `fixed inset-0 text-black flex flex-col items-start bg-white justify-center transition-transform duration-300 z-50 top-16`,
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <header>
          <nav>
            <ul className="text-xl pl-10">
              <li>
                <Link href="/">Home</Link>
              </li>
              <hr className="pb-2" />
              {hasRental && !session?.user?.isAdmin && (
                <>
                  {" "}
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <hr className="pb-2" />{" "}
                </>
              )}
              {session?.user?.isAdmin === true && (
                <>
                  {" "}
                  <li>
                    <Link href="/admin-dashboard">Admin Dashboard</Link>
                  </li>
                  <hr className="pb-2" />{" "}
                </>
              )}
              <li>
                <Link href="/add-rental">Start Rental</Link>
              </li>
              <hr className="pb-2" />
              {session?.user ? (
                <>
                  <li>
                    <Link
                      href="/"
                      onClick={async () => {
                        await logOut();
                      }}
                    >
                      Log out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/sign-in">Log in</Link>
                  </li>
                  <hr className="pb-2" />
                </>
              )}
            </ul>
          </nav>
        </header>
        <div className="flex items-center flex-col pt-5"></div>
      </div>
    </div>
  );
};
