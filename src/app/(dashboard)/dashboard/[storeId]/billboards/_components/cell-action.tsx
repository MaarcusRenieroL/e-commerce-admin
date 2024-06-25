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
import { deleteBillboardSchema } from "~/lib/zod-schema";
import { z } from "zod";
import { AlertModal } from "~/components/modal/alert-modal";
import { useState } from "react";
import { Billboard } from "@prisma/client";

type Props = {
  data: Billboard;
};

export const CellAction: FC<Props> = ({ data }) => {
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

  const handleDelete = async (data: z.infer<typeof deleteBillboardSchema>) => {
    await deleteBillboard(data);
    router.refresh();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setLoading(true);
          handleDelete({ billboardId: data.billboardId });
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
          <DropdownMenuItem onClick={() => onCopy(data.billboardId)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/dashboard/${params.storeId}/billboards/${data.billboardId}`,
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
