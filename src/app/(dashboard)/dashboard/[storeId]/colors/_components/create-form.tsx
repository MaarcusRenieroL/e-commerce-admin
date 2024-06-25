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
import { cn } from "~/lib/utils";
import { colorSchema } from "~/lib/zod-schema";

type Props = {
  storeId: string;
};

export const CreateColorForm: FC<Props> = ({ storeId }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof colorSchema>>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      value: "",
      storeId: storeId
    },
  });

  const { mutateAsync: addColor } =
    client.color.addColor.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Color created successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error creating Color",
        });
      },
    });

  const handleCreateColor = async (data: z.infer<typeof colorSchema>) => {
    setLoading(true);
    const color = await addColor(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/colors/${color.data.colorId}`);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Create a Color"
          description="Fill the form to create a Color"
        />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleCreateColor)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color name</FormLabel>
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
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                  <FormItem>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Create Color
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
