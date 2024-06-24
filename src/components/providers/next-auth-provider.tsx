"use client";

import type { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: ReactNode;
};

export const NextAuthProvider: FC<Props> = ({ children }) => {
  return (
    <SessionProvider refetchWhenOffline={false}>{children}</SessionProvider>
  );
};
