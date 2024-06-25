import { FC } from "react";
import { StoreSwitcher } from "./store-switcher";
import { server } from "~/lib/trpc/server";
import { RoutesNavbar } from "./routes-nav";

export const Navbar: FC = async () => {
  const stores = await server.store.getStores();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-between px-10 py-6 space-x-5">
        <div className="flex items-center">
          <StoreSwitcher items={stores} />
          <RoutesNavbar />
        </div>
        <div>user</div>
      </div>
    </div>
  );
};
