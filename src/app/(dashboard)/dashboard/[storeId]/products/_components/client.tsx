"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { Heading } from "~/components/heading";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { columns } from "./columns";

type Props = {
  products: any;
};

export const ProductsClient: FC<Props> = ({ products }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/products/new`)
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator className="my-5" />
      <DataTable
        data={products}
        columns={columns}
        searchColumnName="name"
        placeholder="Search products"
      />
    </div>
  );
};
