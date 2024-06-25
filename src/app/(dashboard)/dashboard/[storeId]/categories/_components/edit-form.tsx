"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { client } from "~/lib/trpc/client";
import { deleteCategorySchema, updateCategorySchema } from "~/lib/zod-schema";
import { AlertModal } from "~/components/modal/alert-modal";

type Props = {
  category: Category | null;
  billboards: Billboard[];
  storeId: string;
};

export const EditCategoryForm: FC<Props> = ({
  category,
  storeId,
  billboards,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      categoryId: category?.categoryId || "",
      categoryLabel: category?.categoryLabel || "",
      storeId: category?.storeId || storeId,
      billboardName:
        billboards.find(
          (billboard) => billboard.billboardId === category?.billboardId,
        )?.billboardLabel || "",
    },
  });

  const { mutateAsync: updateCategory } =
    client.category.updateCategory.useMutation({
      onSuccess: () => {
        toast("Success", { description: "Category updated successfully" });
      },
      onError: () => {
        toast("Error", { description: "Error updating category" });
      },
    });

  const handleUpdateCategory = async (
    data: z.infer<typeof updateCategorySchema>,
  ) => {
    setLoading(true);
    await updateCategory(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/categories`);
  };

  const { mutateAsync: deleteCategory } =
    client.category.deleteCategory.useMutation({
      onSuccess: () => {
        toast("Success", { description: "Category deleted successfully" });
      },
      onError: () => {
        toast("Error", { description: "Error deleting category" });
      },
    });

  const handleDelete = async (data: z.infer<typeof deleteCategorySchema>) => {
    await deleteCategory(data);
  };

  if (!category) {
    return <div>No category selected</div>;
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDelete({ categoryId: category?.categoryId ?? "" });
          router.push(`/dashboard/${storeId}/categories`);
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
          Delete Category
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
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Category Id</FormLabel>
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
              name="categoryLabel"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
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
              name="billboardName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Billboard" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup defaultValue="">
                          <SelectLabel>Billboards</SelectLabel>
                          {billboards.map((billboard) => (
                            <SelectItem
                              key={billboard.billboardId}
                              value={billboard.billboardLabel}
                            >
                              {billboard.billboardLabel}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
