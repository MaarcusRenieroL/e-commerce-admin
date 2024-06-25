"use client";

import type { Billboard } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
import { deleteBillboardSchema } from "~/lib/zod-schema";
import { z } from "zod";
import { AlertModal } from "~/components/modal/alert-modal";
import { useState } from "react";

export const columns: ColumnDef<Billboard>[] = [
  {
    accessorKey: "billboardId",
  },
  {
    accessorKey: "billboardLabel",
    header: () => <div className="text-left">Billboard Label</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("billboardLabel")}
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
          description: "Billboard ID copied",
          duration: 1000,
        });
      };

      const router = useRouter();
      const params = useParams();

      const { mutateAsync: deleteBillboard } =
        client.billboard.deleteBillboard.useMutation({
          onSuccess: () => {
            toast("Success", {
              description: "Billboard created successfully",
            });
          },
          onError: () => {
            toast("Error", {
              description: "Error creating billboard",
            });
          },
        });

      const handleDelete = async (
        data: z.infer<typeof deleteBillboardSchema>,
      ) => {
        await deleteBillboard(data);
      };

      return (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => {
              handleDelete({ billboardId: row.getValue("billboardId") });
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
                onClick={() => onCopy(row.getValue("billboardId"))}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Id
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `/dashboard/${params.storeId}/billboards/${row.getValue("billboardId")}`,
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
