import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <TRPCProvider>
      {children}
      <Toaster />
    </TRPCProvider>
  );
};
