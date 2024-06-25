"use client";

import type { Color } from "@prisma/client";
import type { FC } from "react";
import { CreateColorForm } from "./create-form";
import { EditColorForm } from "./edit-form";

type Props = {
  color: Color | null;
  storeId: string;
};

export const ColorsForm: FC<Props> = ({ color, storeId }) => {
  return (
    <>
      {color ? (
        <EditColorForm color={color} storeId={storeId} />
      ) : (
        <CreateColorForm storeId={storeId} />
      )}
    </>
  );
};
