import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { ZodError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "~/lib/auth";

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const req = opts.req;
  return { req };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User not logged in",
      });
    }
    const { user } = session;

    if (!user || !user.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }

    return opts.next({
      ctx: {
        userId: user.id,
        user,
      },
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong",
    });
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
