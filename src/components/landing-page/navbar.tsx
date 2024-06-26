"use client";

import { CalendarIcon, MenuIcon, MoveRightIcon, StoreIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import { LANDING_PAGE_NAVBAR_ROUTES, SIDEBAR_ITEMS } from "~/lib/constants";
import { cn } from "~/lib/utils";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export const Navbar: FC<Props> = ({ session }) => {
  const pathname = usePathname();

  return (
    <>
      <header className="px-10 lg:px-6 h-20 py-6 items-center hidden lg:block border-b">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center justify-center gap-5"
            prefetch={false}
          >
            <StoreIcon className="h-6 w-6" />
            <h1 className="text-2xl font-bold">E Commerce Admin Portal</h1>
          </Link>
          <nav className="ml-auto flex items-center gap-8 sm:gap-6">
            {LANDING_PAGE_NAVBAR_ROUTES.map((route) => (
              <Link
                key={route.title}
                href={route.href}
                className={cn(
                  "text-sm font-medium hover:underline underline-offset-4",
                  pathname === route.href ? "underline underline-offset-4" : "",
                )}
                prefetch={false}
              >
                {route.title}
              </Link>
            ))}
            {session ? (
              <Link href="/dashboard">
                <Button>
                  <p>Go to dashbaord</p>
                  <MoveRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-8 sm:gap-6">
                <Link href="/auth/sign-in">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <div className="flex lg:hidden px-10 py-6 border-b items-center gap-5">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center justify-center"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <div className="mt-10 flex items-center gap-5 w-full">
                <CalendarIcon className="h-6 w-6" />
                <SheetTitle>E Commerce Admin Portal</SheetTitle>
              </div>
            </SheetHeader>
            <div className="flex flex-col space-y-5 mt-10">
              {SIDEBAR_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex justify-start items-center gap-3 hover:bg-secondary border-transparent border py-2 px-4 rounded-md hover:border-border hover:border transition-all duration-200 ease-in-out",
                      isActive &&
                        "text-primary font-semibold border-border bg-secondary",
                    )}
                  >
                    {item.icon && <item.icon className="size-5" />}
                    <p
                      className={`${cn("text-sm transition-all duration-200 ")}`}
                    >
                      {item.title}
                    </p>
                  </Link>
                );
              })}
              {session ? (
                <Link className="w-full" href="/auth/sign-in">
                  <Button className="w-full">
                    <p>Go to dashboard</p>
                    <MoveRightIcon className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <div className="space-y-5 mt-10">
                  <Link className="w-full" href="/auth/sign-in">
                    <Button className="w-full" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link className="w-full" href="/auth/sign-up">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="md:text-2xl text-xl font-bold">
          E Commerce Admin Portal
        </h1>
      </div>
    </>
  );
};
