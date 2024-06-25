import {
  billboardSchema,
  deleteBillboardSchema,
  getBillboardSchema,
  updateBillboardSchema,
} from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { db } from "~/lib/db";
import { TRPCError } from "@trpc/server";

export const billboardRouter = router({
  getBillboards: privateProcedure
    .input(getBillboardSchema)
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

        const billboards = await db.billboard.findMany({
          where: {
            storeId: storeId,
          },
        });

        return billboards;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  addBillboard: privateProcedure
    .input(billboardSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { storeId, billboardLabel, imageUrl } = input;

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

        if (!billboardLabel || !imageUrl) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const existingBillboard = await db.billboard.findFirst({
          where: {
            billboardLabel: billboardLabel,
          },
        });

        if (existingBillboard) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Billboard already exists",
          });
        }

        const newBillboard = await db.billboard.create({
          data: {
            billboardLabel: billboardLabel,
            imageUrl: imageUrl,
            storeId: storeId,
          },
        });

        return {
          data: newBillboard,
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
  updateBillboard: privateProcedure
    .input(updateBillboardSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { billboardId, storeId, billboardLabel, imageUrl } = input;

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

        const existingBillboard = await db.billboard.findFirst({
          where: {
            billboardLabel: billboardLabel,
          },
        });

        if (existingBillboard) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Billboard already exists",
          });
        }

        const newBillboard = await db.billboard.update({
          where: {
            billboardId: billboardId,
            storeId: storeId,
          },
          data: {
            billboardLabel: billboardLabel,
            imageUrl: imageUrl,
          },
        });

        return {
          data: newBillboard,
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
  deleteBillboard: privateProcedure
    .input(deleteBillboardSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { billboardId } = input;

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

        const billboard = await db.billboard.findFirst({
          where: {
            billboardId: billboardId,
          },
        });

        if (!billboard) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Billboard doesn't exists",
          });
        }

        const deletedBillboard = await db.billboard.delete({
          where: {
            billboardId: billboard.billboardId,
          },
        });

        return {
          data: deletedBillboard,
          statusCode: 201,
          message: "Billboard deleted successfully",
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
