import type { ReactNode } from "react";
import { Navbar } from "~/components/landing-page/navbar";
import { Footer } from "~/components/landing-page/footer";
import { getServerAuthSession } from "~/lib/auth";

export default async function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar session={session} />
      <main className="flex-1"> {children}</main>
      <Footer />
    </div>
  );
}
