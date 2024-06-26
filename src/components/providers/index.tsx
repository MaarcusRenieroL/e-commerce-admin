import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";
import { Toaster } from "sonner";
import { NextAuthProvider } from "./next-auth-provider";
import { ModalProvider } from "./modal-provider";
import { UploadThingProvider } from "./upload-thing-provider";
import { ThemeProvider } from "./next-themes-provider";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <TRPCProvider>
      <NextAuthProvider>
        <UploadThingProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <ModalProvider />
      </NextAuthProvider>
    </TRPCProvider>
  );
};
