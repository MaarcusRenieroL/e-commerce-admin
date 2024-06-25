"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FC } from "react";
import { ROUTES } from "~/lib/constants";
import { cn } from "~/lib/utils";

export const RoutesNavbar: FC = () => {
  const pathname = usePathname();
  const params = useParams();
  return (
    <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {ROUTES.map((route) => (
        <Link
          href={`/dashboard/${params.storeId}${route.href}`}
          key={route.title}
          className={cn(
            "text-sm font-medium transition-colors hover:underline hover:underline-offset-4",
            pathname === `/dashboard/${params.storeId}${route.href}`
              ? "underline underline-offset-4"
              : "text-black",
          )}
        >
          {route.title}
        </Link>
      ))}
    </div>
  );
};
