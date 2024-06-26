import type { ReactNode } from "react";
import { Navbar } from "~/components/landing-page/navbar";
import { Footer } from "~/components/landing-page/footer";

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1"> {children}</main>
      <Footer />
    </div>
  );
}
