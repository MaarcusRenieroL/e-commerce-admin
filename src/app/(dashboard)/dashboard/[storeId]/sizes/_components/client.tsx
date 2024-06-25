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
  sizes: any;
};

export const SizesClient: FC<Props> = ({ sizes }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <Heading
          title={`Sizes (${sizes.length})`}
          description="Manage sizes for your store"
        />
        <Button
          onClick={() => router.push(`/dashboard/${params.storeId}/sizes/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator className="my-5" />
      <DataTable
        data={sizes}
        columns={columns}
        searchColumnName="name"
        placeholder="Search sizes"
      />
    </div>
  );
};
