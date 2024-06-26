"use client";

import type { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { DASHBOARD_SIDEBAR_ITEMS, ROUTES } from "~/lib/constants";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { StoreSwitcher } from "./store-switcher";
import { Store } from "@prisma/client";
import { ModeToggle } from "../theme-toggle";
import { Account } from "./account";

type Props = {
  items: Store[];
  email: string;
};

export const Sidebar: FC<Props> = ({ items, email }) => {
  const pathname = usePathname();
  return (
    <div className="lg:hidden flex h-16 items-center justify-between border-b px-10 py-6 space-x-5">
      <div className="space-x-5 flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>E Commerce Admin</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-5 mt-10">
              {DASHBOARD_SIDEBAR_ITEMS.map((item) => {
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
            </div>
          </SheetContent>
        </Sheet>
        <StoreSwitcher items={items} />
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Account email={email} />
      </div>
    </div>
  );
};
