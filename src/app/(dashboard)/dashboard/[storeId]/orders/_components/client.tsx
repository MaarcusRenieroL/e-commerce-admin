"use client";

import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { Heading } from "~/components/heading";
import { Separator } from "~/components/ui/separator";
import { columns } from "./columns";

type Props = {
  orders: any;
};

export const OrderClient: FC<Props> = ({ orders }) => {
  return (
    <div>
        <Heading
          title={`Orders (${orders.length})`}
          description="Manage orders for your store"
        />
      <Separator className="my-5" />
      <DataTable
        data={orders}
        columns={columns}
        searchColumnName="billboardLabel"
        placeholder="Search orders"
      />
    </div>
  );
};
