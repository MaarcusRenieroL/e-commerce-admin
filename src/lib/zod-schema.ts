import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email",
      })
      .min(2, {
        message: "Email must be at least 2 characters long",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .min(6, {
        message: "Confirm Password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email()
    .min(2, {
      message: "Email must be at least 2 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});

export const storeSchema = z.object({
  name: z
    .string({
      required_error: "Store name is required",
    })
    .min(4, {
      message: "Store name should be at least 4 characters long",
    }),
});

export const settingsFormSchema = z.object({
  storeId: z.string(),
  storeName: z
    .string({
      required_error: "Store name is required",
    })
    .min(4, {
      message: "Store name should at least be 4 characters long",
    }),
});

export const deleteStoreSchema = z.object({
  storeId: z.string(),
});

export const getBillboardSchema = z.object({
  storeId: z.string(),
});

export const billboardSchema = z.object({
  billboardLabel: z
    .string({
      required_error: "Billboard label name is required",
    })
    .min(4, {
      message: "Billboard label name must at least be 4 characters long",
    }),
  imageUrl: z.string({
    required_error: "Image URL is requred",
  }),
  storeId: z.string(),
});

export const updateBillboardSchema = z.object({
  billboardId: z.string(),
  billboardLabel: z
    .string({
      required_error: "Billboard label name is required",
    })
    .min(4, {
      message: "Billboard label name must at least be 4 characters long",
    }),
  imageUrl: z.string({
    required_error: "Image URL is requred",
  }),
  storeId: z.string(),
});

export const deleteBillboardSchema = z.object({
  billboardId: z.string(),
});

export const getCategoriesSchema = z.object({
  storeId: z.string(),
  billboardId: z.string(),
});

export const categorySchema = z.object({
  categoryLabel: z
    .string({
      required_error: "Category label name is required",
    })
    .min(4, {
      message: "Category label name must at least be 4 characters long",
    }),
  storeId: z.string(),
  billboardName: z.string(),
});

export const updateCategorySchema = z.object({
  categoryId: z.string(),
  categoryLabel: z
    .string({
      required_error: "Category label name is required",
    })
    .min(4, {
      message: "Category label name must at least be 4 characters long",
    }),
  storeId: z.string(),
  billboardName: z.string(),
});

export const deleteCategorySchema = z.object({
  categoryId: z.string(),
});

export const getSizeSchema = z.object({
  storeId: z.string(),
  billboardId: z.string(),
});

export const sizeSchema = z.object({
  storeId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(4, {
      message: "Name must be at least 4 characters long",
    }),
  value: z
    .string({
      required_error: "Value is required",
    })
    .min(1, {
      message: "Value must be at least 1 character long",
    }),
});

export const updateSizeSchema = z.object({
  storeId: z.string(),
  sizeId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(4, {
      message: "Name must be at least 4 characters long",
    }),
  value: z
    .string({
      required_error: "Value is required",
    })
    .min(1, {
      message: "Value must be at least 1 character long",
    }),
});

export const deleteSizeSchema = z.object({
  sizeId: z.string(),
});

export const getColorSchema = z.object({
  storeId: z.string(),
  billboardId: z.string(),
});

export const colorSchema = z.object({
  storeId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  value: z
    .string({
      required_error: "Value is required",
    })
    .min(1, {
      message: "Value must be at least 1 character long",
    }),
});

export const updateColorSchema = z.object({
  storeId: z.string(),
  colorId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(4, {
      message: "Name must be at least 4 characters long",
    }),
  value: z
    .string({
      required_error: "Value is required",
    })
    .min(1, {
      message: "Value must be at least 1 character long",
    }),
});

export const deleteColorSchema = z.object({
  colorId: z.string(),
});

export const getProductSchema = z.object({
  storeId: z.string(),
});

export const productSchema = z.object({
  storeId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  images: z.array(z.string(), {
    required_error: "Image is required",
  }),
  price: z.string({
    required_error: "Price is required",
  }),
  categoryName: z.string({
    required_error: "Category is required",
  }),
  sizeName: z.string({
    required_error: "Size is required",
  }),
  colorName: z.string({
    required_error: "Color is required",
  }),
});

export const updateProductSchema = z.object({
  storeId: z.string(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    }),
  images: z.array(z.string(), {
    required_error: "Image is required",
  }),
  price: z.string({
    required_error: "Price is required",
  }),
  categoryName: z.string({
    required_error: "Category is required",
  }),
  sizeName: z.string({
    required_error: "Size is required",
  }),
  colorName: z.string({
    required_error: "Color is required",
  }),
});

export const deleteProductSchema = z.object({
  productId: z.string(),
});
