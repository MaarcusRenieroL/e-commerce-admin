"use client";

import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { Heading } from "~/components/heading";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

type Props = {
  billboards: Billboard[];
};

export const BillboardClient: FC<Props> = ({ billboards }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <Heading
          title="Billboards (0)"
          description="Manage billboards for your store"
        />
        <Button
          onClick={() =>
            router.push(`/dashboard/${params.storeId}/billboards/new`)
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator className="my-5" />
      <div></div>
    </div>
  );
};
