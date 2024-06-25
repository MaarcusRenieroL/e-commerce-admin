"use client";

import type { Category, Color, Product, Size } from "@prisma/client";
import type { FC } from "react";
import { CreateProductForm } from "./create-form";
import { EditProductForm } from "./edit-form";

type Props = {
  product: Product & {
    category: Category
    size: Size
    color: Color
  };
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  storeId: string;
};

export const ProductForm: FC<Props> = ({
  product,
  storeId,
  categories,
  sizes,
  colors,
}) => {
  return (
    <>
      {product ? (
        <EditProductForm
          product={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
          storeId={storeId}
        />
      ) : (
        <CreateProductForm
          categories={categories}
          sizes={sizes}
          colors={colors}
          storeId={storeId}
        />
      )}
    </>
  );
};
