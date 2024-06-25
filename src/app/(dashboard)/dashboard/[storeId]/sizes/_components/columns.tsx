"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { client } from "~/lib/trpc/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { deleteSizeSchema } from "~/lib/zod-schema";
import { z } from "zod";
import { AlertModal } from "~/components/modal/alert-modal";
import { useState } from "react";
import { format } from "date-fns";

type SizeForDataTable = {
  sizeId: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeForDataTable>[] = [
  {
    accessorKey: "sizeId",
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: () => <div className="text-left">Value</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("value")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {format(row.getValue("createdAt"), "MMMM do, yyyy")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast("Success", {
          description: "Size ID copied",
          duration: 1000,
        });
      };

      const router = useRouter();
      const params = useParams();

      const { mutateAsync: deleteSize } =
        client.size.deleteSize.useMutation({
          onSuccess: () => {
            toast("Success", {
              description: "Size deleted successfully",
            });
          },
          onError: () => {
            toast("Error", {
              description: "Error deleting size",
            });
          },
        });

      const handleDelete = async (
        data: z.infer<typeof deleteSizeSchema>,
      ) => {
        setLoading(true);
        await deleteSize(data);
        setLoading(false);
      };

      return (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              // @ts-ignore
              handleDelete({ sizeId: row.getValue("sizeId"), storeId: params.storeId });
            }}
            loading={loading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onCopy(row.getValue("sizeId"))}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/dashboard/${params.storeId}/sizes/${row.getValue("sizeId")}`,
                  )
                }
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
