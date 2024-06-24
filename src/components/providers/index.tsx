import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";
import { Toaster } from "sonner";
import { NextAuthProvider } from "./next-auth-provider";
import { ModalProvider } from "./modal-provider";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <TRPCProvider>
      <NextAuthProvider>
        {children}
        <Toaster />
        <ModalProvider />
      </NextAuthProvider>
    </TRPCProvider>
  );
};
