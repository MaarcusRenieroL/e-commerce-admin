"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { sizeSchema } from "~/lib/zod-schema";

type Props = {
  storeId: string;
};

export const CreateSizeForm: FC<Props> = ({ storeId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof sizeSchema>>({
    resolver: zodResolver(sizeSchema),
    defaultValues: {
      name: "",
      value: "",
      storeId: storeId
    },
  });

  const { mutateAsync: createcategory } =
    client.size.addSize.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Size created successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error creating Size",
        });
      },
    });

  const handleCreateSize = async (data: z.infer<typeof sizeSchema>) => {
    setLoading(true);
    console.log(data);
    const size = await createcategory(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/sizes/${size.data.sizeId}`);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Create a Size"
          description="Fill the form to create a Size"
        />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleCreateSize)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size name</FormLabel>
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
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                  <FormItem>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Create Size
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
