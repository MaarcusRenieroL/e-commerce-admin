import type { FC, ReactNode } from "react";
import { TRPCProvider } from "./trpc-provider";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return <TRPCProvider>{children}</TRPCProvider>;
};
