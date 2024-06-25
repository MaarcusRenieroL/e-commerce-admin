import {
  categorySchema,
  deleteCategorySchema,
  getCategoriesSchema,
  updateCategorySchema,
} from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { db } from "~/lib/db";
import { TRPCError } from "@trpc/server";

export const categoryRouter = router({
  getCategorys: privateProcedure
    .input(getCategoriesSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { storeId, billboardId } = input;

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

        const billboard = await db.billboard.findFirst({
          where: {
            billboardId: billboardId,
          },
        });

        if (!billboard) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "category not found",
          });
        }

        const categories = await db.category.findMany({
          where: {
            storeId: storeId,
            billboardId: billboardId,
          },
        });

        return categories;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  addCategory: privateProcedure
    .input(categorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { storeId, billboardName, categoryLabel } = input;

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

        if (!categoryLabel || !billboardName) {
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

        const billboard = await db.billboard.findFirst({
          where: {
            billboardLabel: billboardName,
          },
        });

        if (!billboard) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Billboard doesn't exists",
          });
        }

        const existingCategory = await db.category.findFirst({
          where: {
            categoryLabel: categoryLabel,
          },
        });

        if (existingCategory) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category already exists",
          });
        }

        const newCategory = await db.category.create({
          data: {
            categoryLabel: categoryLabel,
            storeId: storeId,
            billboardId: billboard.billboardId,
          },
        });

        return {
          data: newCategory,
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
  updateCategory: privateProcedure
    .input(updateCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { categoryId, storeId, categoryLabel, billboardName } = input;

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

        const billboard = await db.billboard.findFirst({
          where: {
            billboardLabel: billboardName,
          },
        });

        if (!billboard) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Billboard doesn't exists",
          });
        }

        const existingCategory = await db.category.findFirst({
          where: {
            categoryLabel: categoryLabel,
          },
        });

        if (!existingCategory) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category doesn't exists",
          });
        }

        const newCategory = await db.category.update({
          where: {
            categoryId: categoryId,
          },
          data: {
            categoryLabel: categoryLabel,
          },
        });

        return {
          data: newCategory,
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
  deleteCategory: privateProcedure
    .input(deleteCategorySchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { categoryId } = input;

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

        const category = await db.category.findFirst({
          where: {
            categoryId: categoryId,
          },
        });

        if (!category) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category doesn't exists",
          });
        }

        const deletedCategory = await db.category.delete({
          where: {
            categoryId: category.categoryId,
          },
        });

        return {
          data: deletedCategory,
          statusCode: 201,
          message: "Category deleted successfully",
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
