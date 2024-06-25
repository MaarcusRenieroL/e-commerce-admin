"use client";

import type { Size } from "@prisma/client";
import type { FC } from "react";
import { CreateSizeForm } from "./create-form";
import { EditSizeForm } from "./edit-form";

type Props = {
  size: Size | null;
  storeId: string;
};

export const SizesForm: FC<Props> = ({ size, storeId }) => {
  return (
    <>
      {size ? (
        <EditSizeForm size={size} storeId={storeId} />
      ) : (
        <CreateSizeForm storeId={storeId} />
      )}
    </>
  );
};
