"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { type FC, type ReactNode, useState } from "react";

import { client } from "~/lib/trpc/client";
import SuperJSON from "superjson";

type Props = {
  children?: ReactNode;
};

export const TRPCProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    client.createClient({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: "/api/trpc",
        }),
      ],
    }),
  );
  return (
    <client.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </client.Provider>
  );
};
