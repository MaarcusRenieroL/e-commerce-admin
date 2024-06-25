import { FC } from "react";
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
import type { Color } from "@prisma/client";

type Props = {
  data: Color;
};

export const CellAction: FC<Props> = ({ data }) => {
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
          description: "Color created successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error creating color",
        });
      },
    });

  const handleDelete = async (data: z.infer<typeof deleteColorSchema>) => {
    await deleteColor(data);
    router.refresh();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setLoading(true);
          handleDelete({ colorId: data.colorId });
          setLoading(false);
          setOpen(false);
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
          <DropdownMenuItem onClick={() => onCopy(data.colorId)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/${params.storeId}/colors/${data.colorId}`,
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
};
