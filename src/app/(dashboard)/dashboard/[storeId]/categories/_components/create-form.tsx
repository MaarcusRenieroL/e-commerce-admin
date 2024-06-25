"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Billboard } from "@prisma/client";
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
import { categorySchema } from "~/lib/zod-schema";

type Props = {
  billboards: Billboard[];
  storeId: string;
};

export const CreateCategoryForm: FC<Props> = ({ storeId, billboards }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryLabel: "",
      storeId: storeId,
      billboardName: "",
    },
  });

  const { mutateAsync: createcategory } =
    client.category.addCategory.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "category created successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error creating category",
        });
      },
    });

  const handleCreatecategory = async (data: z.infer<typeof categorySchema>) => {
    setLoading(true);
    console.log(data);
    const category = await createcategory(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/categories/${category.data.categoryId}`);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Create a category"
          description="Fill the form to create a category"
        />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleCreatecategory)}
        >
          <div className="grid grid-cols-3 gap-8">
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
                  <FormLabel>Category Label</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role" />
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
            Create category
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
