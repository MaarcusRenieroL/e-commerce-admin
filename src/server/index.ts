import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./trpc";
import { userRouter } from "./routers/users";
import { storeRouter } from "./routers/store";
import { billboardRouter } from "./routers/billboard";
import { categoryRouter } from "./routers/category";
import { sizeRouter } from "./routers/size";

export const appRouter = router({
  user: userRouter,
  store: storeRouter,
  billboard: billboardRouter,
  category: categoryRouter,
  size: sizeRouter,
});

export type AppRouter = typeof appRouter;
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
