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
import { deleteColorSchema } from "~/lib/zod-schema";
import { z } from "zod";
import { AlertModal } from "~/components/modal/alert-modal";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "~/lib/utils";

type ColorForDataTable = {
  colorId: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorForDataTable>[] = [
  {
    accessorKey: "colorId",
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
        <div className="text-left font-medium flex items-center gap-4">
          {row.getValue("value")}

                      <div className="ml-2 p-4 border rounded-full" style={{ backgroundColor: row.getValue("value") }} />
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
          description: "Color ID copied",
          duration: 1000,
        });
      };

      const router = useRouter();
      const params = useParams();

      const { mutateAsync: deleteColor } =
        client.color.deleteColor.useMutation({
          onSuccess: () => {
            toast("Success", {
              description: "Color deleted successfully",
            });
          },
          onError: () => {
            toast("Error", {
              description: "Error deleting color",
            });
          },
        });

      const handleDelete = async (
        data: z.infer<typeof deleteColorSchema>,
      ) => {
        setLoading(true);
        await deleteColor(data);
        setLoading(false);
      };

      return (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              // @ts-ignore
              handleDelete({ colorId: row.getValue("colorId"), storeId: params.storeId });
            }}
            loading={loading}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" color="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onCopy(row.getValue("colorId"))}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/dashboard/${params.storeId}/colors/${row.getValue("colorId")}`,
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
