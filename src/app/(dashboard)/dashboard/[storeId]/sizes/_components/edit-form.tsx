"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Heading } from "~/components/heading";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { client } from "~/lib/trpc/client";
import { deleteSizeSchema, updateSizeSchema } from "~/lib/zod-schema";
import { AlertModal } from "~/components/modal/alert-modal";
import type { Size } from "@prisma/client";

type Props = {
  storeId: string;
  size: Size
};

export const EditSizeForm: FC<Props> = ({
  storeId,
  size
}) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateSizeSchema>>({
    resolver: zodResolver(updateSizeSchema),
    defaultValues: {
      storeId: storeId,
      name: size.name,
      value: size.value,
      sizeId: size.sizeId
    },
  });

  const { mutateAsync: updateSize } =
    client.size.updateSize.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Size updated successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error updated category",
        });
      },
    });

  const handleUpdateCategory = async (
    data: z.infer<typeof updateSizeSchema>,
  ) => {
    setLoading(true);
    console.log(data);
    await updateSize(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/sizes/${size.sizeId}`);
  };

  const { mutateAsync: deleteSize } =
    client.size.deleteSize.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Size deleted successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error deleting category",
        });
      },
    });

  const handleDelete = async (data: z.infer<typeof deleteSizeSchema>) => {
    await deleteSize(data);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDelete({ sizeId: size?.sizeId ?? "", storeId: storeId });
          router.push(`/dashboard/${storeId}/sizes`);
          router.refresh();
        }}
        loading={loading}
      />
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Edit category"
          description="Fill the form to edit a category"
        />
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Size
        </Button>
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleUpdateCategory)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="storeId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Store Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category id"
                      type="text"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter size name"
                      type="text"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="value"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter size value"
                      type="text"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Update category
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
