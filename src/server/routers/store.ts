import {
  deleteStoreSchema,
  settingsFormSchema,
  storeSchema,
} from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "~/lib/db";
import { getStore, getStoreByStoreName } from "~/lib/helpers";

export const storeRouter = router({
  getStores: privateProcedure.query(async ({ ctx }) => {
    try {
      const { userId } = ctx;

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

      const stores = await db.store.findMany({
        where: {
          userId: userId,
        },
      });

      if (!stores) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No stores found",
        });
      }

      return stores;
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
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
  updateStore: privateProcedure
    .input(settingsFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { storeId, storeName } = input;

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

        const store = await getStore(userId, storeId);

        if (!store) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Store doesn't exists",
          });
        }

        const updatedStore = await db.store.update({
          where: {
            storeId: store.storeId,
          },
          data: {
            storeName: storeName,
          },
        });

        return {
          data: updatedStore,
          statusCode: 201,
          message: "Store updated successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  deleteStore: privateProcedure
    .input(deleteStoreSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { storeId } = input;

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

        const store = await getStore(userId, storeId);

        if (!store) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Store doesn't exists",
          });
        }

        const deletedStore = await db.store.delete({
          where: {
            storeId: store.storeId,
          },
        });

        return {
          data: deletedStore,
          statusCode: 201,
          message: "Store deleted successfully",
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
