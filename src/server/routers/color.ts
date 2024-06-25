import {
  colorSchema,
  deleteColorSchema,
  getColorSchema,
  updateColorSchema,
} from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { db } from "~/lib/db";
import { TRPCError } from "@trpc/server";

export const colorRouter = router({
  getColors: privateProcedure
    .input(getColorSchema)
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

        const colors = await db.color.findMany({
          where: {
            storeId: storeId,
          },
        });

        return colors;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  addColor: privateProcedure
    .input(colorSchema)
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

        const existingColor = await db.color.findFirst({
          where: {
            name: name,
          },
        });

        if (existingColor) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Color already exists",
          });
        }

        const newColor = await db.color.create({
          data: {
            name: name,
            value: value,
            storeId: storeId,
          },
        });

        return {
          data: newColor,
          statusCode: 201,
          message: "Color created successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  updateColor: privateProcedure
    .input(updateColorSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { colorId, storeId, name, value } = input;

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

        const existingColor = await db.color.findFirst({
          where: {
            colorId: colorId,
          },
        });

        if (!existingColor) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Color doesn't exists",
          });
        }

        const newColor = await db.color.update({
          where: {
            colorId: existingColor.colorId,
          },
          data: {
            name: name,
            value: value,
          },
        });

        return {
          data: newColor,
          statusCode: 201,
          message: "Color updated successfully",
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  deleteColor: privateProcedure
    .input(deleteColorSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { colorId } = input;

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

        const color = await db.color.findFirst({
          where: {
            colorId: colorId,
          },
        });

        if (!color) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Color doesn't exists",
          });
        }

        const deletedColor = await db.color.delete({
          where: {
            colorId: colorId,
          },
        });

        return {
          data: deletedColor,
          statusCode: 200,
          message: "Color deleted successfully",
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
