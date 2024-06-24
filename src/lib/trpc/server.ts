import { appRouter } from "~/server";
import { httpBatchLink } from "@trpc/client";
const url = "/api/trpc";
// @ts-ignore
export const server = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      url,
    }),
  ],
});
