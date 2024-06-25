import {
  sizeSchema,
  deleteSizeSchema,
  getSizeSchema,
  updateSizeSchema,
} from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { db } from "~/lib/db";
import { TRPCError } from "@trpc/server";

export const sizeRouter = router({
  getSizes: privateProcedure
    .input(getSizeSchema)
    .query(async ({ ctx, input }) => {
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

        const store = await db.store.findFirst({
          where: {
            storeId: storeId,
          },
        });

        if (!store) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Store not found",
          });
        }

        const sizes = await db.size.findMany({
          where: {
            storeId: storeId,
          },
        });

        return sizes;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  addSize: privateProcedure
    .input(sizeSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { storeId, name, value } = input;

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

        if (!name || !value) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const store = await db.store.findFirst({
          where: {
            storeId: storeId,
          },
        });

        if (!store) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Store doesn't exists",
          });
        }

        const existingSize = await db.size.findFirst({
          where: {
            name: name,
          },
        });

        if (existingSize) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Size already exists",
          });
        }

        const newSize = await db.size.create({
          data: {
            name: name,
            value: value,
            storeId: storeId,
          },
        });

        return {
          data: newSize,
          statusCode: 201,
          message: "Size created successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  updateSize: privateProcedure
    .input(updateSizeSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { sizeId, storeId, name, value } = input;

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

        const store = await db.store.findFirst({
          where: {
            storeId: storeId,
          },
        });

        if (!store) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Store doesn't exists",
          });
        }

        const existingSize = await db.size.findFirst({
          where: {
            sizeId: sizeId,
          },
        });

        if (!existingSize) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Size doesn't exists",
          });
        }

        const newSize = await db.size.update({
          where: {
            sizeId: existingSize.sizeId,
          },
          data: {
            name: name,
            value: value,
          },
        });

        return {
          data: newSize,
          statusCode: 201,
          message: "Size updated successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  deleteSize: privateProcedure
    .input(deleteSizeSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { sizeId, storeId } = input;

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

        const size = await db.size.findFirst({
          where: {
            sizeId: sizeId,
            storeId: storeId,
          },
        });

        if (!size) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Size doesn't exists",
          });
        }

        const deletedSize = await db.size.delete({
          where: {
            sizeId: sizeId,
            storeId: storeId,
          },
        });

        return {
          data: deletedSize,
          statusCode: 200,
          message: "Size deleted successfully",
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
