"use client";

import type { Billboard, Category } from "@prisma/client";
import type { FC } from "react";
import { CreateCategoryForm } from "./create-form";
import { EditCategoryForm } from "./edit-form";

type Props = {
  category: Category | null;
  storeId: string;
  billboards: Billboard[];
};

export const CategoriesForm: FC<Props> = ({
  category,
  storeId,
  billboards,
}) => {
  return (
    <>
      {category ? (
        <EditCategoryForm
          billboards={billboards}
          category={category}
          storeId={storeId}
        />
      ) : (
        <CreateCategoryForm billboards={billboards} storeId={storeId} />
      )}
    </>
  );
};
