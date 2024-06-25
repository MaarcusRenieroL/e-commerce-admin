"use client";

import type { Billboard } from "@prisma/client";
import type { FC } from "react";
import { CreateBillboardForm } from "./create-form";
import { EditBillboardForm } from "./edit-form";

type Props = {
  billboard: Billboard | null;
  storeId: string;
};

export const BillboardForm: FC<Props> = ({ billboard, storeId }) => {
  return (
    <>
      {billboard ? (
        <EditBillboardForm billboard={billboard} storeId={storeId} />
      ) : (
        <CreateBillboardForm billboard={billboard} storeId={storeId} />
      )}
    </>
  );
};
