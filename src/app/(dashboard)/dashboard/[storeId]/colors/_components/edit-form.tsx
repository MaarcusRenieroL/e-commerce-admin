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
import { deleteColorSchema, updateColorSchema } from "~/lib/zod-schema";
import { AlertModal } from "~/components/modal/alert-modal";
import type { Color } from "@prisma/client";

type Props = {
  storeId: string;
  color: Color
};

export const EditColorForm: FC<Props> = ({
  storeId,
  color
}) => {

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateColorSchema>>({
    resolver: zodResolver(updateColorSchema),
    defaultValues: {
      storeId: storeId,
      name: color.name,
      value: color.value,
    },
  });

  const { mutateAsync: updateColor } =
    client.color.updateColor.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Color updated successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error updated category",
        });
      },
    });

  const handleUpdateCategory = async (
    data: z.infer<typeof updateColorSchema>,
  ) => {
    setLoading(true);
    console.log(data);
    await updateColor(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/colors/${color.colorId}`);
  };

  const { mutateAsync: deleteColor } =
    client.color.deleteColor.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Color deleted successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error deleting category",
        });
      },
    });

  const handleDelete = async (data: z.infer<typeof deleteColorSchema>) => {
    await deleteColor(data);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDelete({ colorId: color?.colorId ?? "", storeId: storeId });
          router.push(`/dashboard/${storeId}/colors`);
          router.refresh();
        }}
        loading={loading}
      />
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Edit category"
          description="Fill the form to edit a category"
        />
        <Button variant="destructive" color="sm" onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Color
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
                  <FormLabel>Color Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter color name"
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
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                  <div className="flex items-center gap-4">
                      <Input
                        placeholder="Enter color value"
                        type="text"
                        {...field}
                        disabled={loading}
                      />
                      <div className="ml-2 p-4 border rounded-full" style={{ backgroundColor: field.value }} />
                    </div>
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
