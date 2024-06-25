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
