import { storeSchema } from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";

export const storeRouter = router({
  addStore: privateProcedure
    .input(storeSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { name } = input;

        const loggedInUser = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!loggedInUser) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "User must log in",
          });
        }

        const existingStore = await db.store.findFirst({
          where: {
            storeName: name,
          },
        });

        if (existingStore) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Store already exists",
          });
        }

        const newStore = await db.store.create({
          data: {
            userId: userId,
            storeName: name,
          },
        });

        return {
          data: newStore,
          statusCode: 201,
          message: "Store created successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
});
