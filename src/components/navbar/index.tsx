import { FC } from "react";
import { StoreSwitcher } from "./store-switcher";
import { server } from "~/lib/trpc/server";
import { RoutesNavbar } from "./routes-nav";
import { Account } from "./account";
import { getServerAuthSession } from "~/lib/auth";
import { ModeToggle } from "../theme-toggle";
import { Sidebar } from "./sidebar";

export const Navbar: FC = async () => {
  const stores = await server.store.getStores();
  const session = await getServerAuthSession();

  if (!session) {
    return;
  }

  return (
    <>
      <Sidebar items={stores} email={session.user.email ?? ""} />
      <div className="hidden lg:block border-b">
        <div className="flex h-16 items-center justify-between px-10 py-6 space-x-5">
          <div className="flex items-center">
            <StoreSwitcher items={stores} />
            <RoutesNavbar />
          </div>
          <div className="flex items-center space-x-5">
            <ModeToggle />
            <Account email={session.user.email ?? ""} />
          </div>
        </div>
      </div>
    </>
  );
};
