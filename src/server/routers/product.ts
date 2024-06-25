import {
  productSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "~/lib/zod-schema";
import { privateProcedure, router } from "../trpc";
import { db } from "~/lib/db";
import { TRPCError } from "@trpc/server";

export const productRouter = router({
  getProducts: privateProcedure
    .input(getProductSchema)
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

        const products = await db.product.findMany({
          where: {
            storeId: storeId,
          },
        });

        return products;
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  addProduct: privateProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const {
          name,
          storeId,
          images,
          price,
          categoryName,
          sizeName,
          colorName,
        } = input;

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

        console.log(input);

        if (!name) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Name is required",
          });
        }

        if (!storeId) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Store is required",
          });
        }

        if (!images) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Image is required",
          });
        }

        if (!price) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Price is required",
          });
        }

        if (!categoryName) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category is required",
          });
        }

        if (!sizeName) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Size is required",
          });
        }

        if (!colorName) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Color is required",
          });
        }

        const existingProduct = await db.product.findFirst({
          where: {
            productName: name,
          },
        });

        if (existingProduct) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product already exists",
          });
        }

        const category = await db.category.findFirst({
          where: {
            categoryLabel: categoryName,
          },
        });

        if (!category) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category doesn't exists",
          });
        }

        const size = await db.size.findFirst({
          where: {
            name: sizeName,
          },
        });

        if (!size) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Size doesn't exists",
          });
        }

        const color = await db.color.findFirst({
          where: {
            name: colorName,
          },
        });

        if (!color) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Color doesn't exists",
          });
        }

        const newProduct = await db.product.create({
          data: {
            productName: name,
            storeId: storeId,
            images: images,
            price: parseFloat(price),
            categoryId: category.categoryId,
            sizeId: size.sizeId,
            colorId: color.colorId,
          },
        });

        return {
          data: newProduct,
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
  updateProduct: privateProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const {
          name,
          storeId,
          images,
          price,
          categoryName,
          sizeName,
          colorName,
        } = input;

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

        if (
          !name ||
          !storeId ||
          !images ||
          !price ||
          !categoryName ||
          !sizeName ||
          !colorName
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing required fields",
          });
        }

        const existingProduct = await db.product.findFirst({
          where: {
            productName: name,
          },
        });

        if (!existingProduct) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product doesn't exists",
          });
        }

        const category = await db.category.findFirst({
          where: {
            categoryLabel: categoryName,
          },
        });

        if (!category) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Category doesn't exists",
          });
        }

        const size = await db.size.findFirst({
          where: {
            name: sizeName,
          },
        });

        if (!size) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Size doesn't exists",
          });
        }

        const color = await db.color.findFirst({
          where: {
            name: colorName,
          },
        });

        if (!color) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Color doesn't exists",
          });
        }

        const updatedProduct = await db.product.update({
          where: {
            productId: existingProduct.productId,
          },
          data: {
            productName: name,
            storeId: storeId,
            images: images,
            price: price,
            categoryId: category.categoryId,
            sizeId: size.sizeId,
            colorId: color.colorId,
          },
        });

        return {
          data: updatedProduct,
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
  deleteProduct: privateProcedure
    .input(deleteProductSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId } = ctx;
        const { productId } = input;

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

        const existingProduct = await db.product.findFirst({
          where: {
            productId: productId,
          },
        });

        if (!existingProduct) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Product doesn't exists",
          });
        }

        const deletedProduct = await db.product.delete({
          where: {
            productId: productId,
          },
        });

        return {
          data: deletedProduct,
          statusCode: 201,
          message: "Product deleted successfully",
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
