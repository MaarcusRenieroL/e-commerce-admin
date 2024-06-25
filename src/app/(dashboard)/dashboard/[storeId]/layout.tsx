import type { ReactNode } from "react";

export default function DashboardStoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex-col">
      <div className="flex-1 spacey-y4 p-10">{children}</div>
    </div>
  );
}
