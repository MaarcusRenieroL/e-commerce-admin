"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "~/lib/utils";
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
import { updateBillboardSchema } from "~/lib/zod-schema";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";

type Props = {
  billboard: Billboard | null;
  storeId: string;
};

export const EditBillboardForm: FC<Props> = ({ billboard, storeId }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(billboard?.imageUrl ?? "");
  const router = useRouter();

  const form = useForm<z.infer<typeof updateBillboardSchema>>({
    resolver: zodResolver(updateBillboardSchema),
    defaultValues: {
      billboardId: billboard?.billboardId,
      billboardLabel: billboard?.billboardLabel,
      imageUrl: billboard?.imageUrl,
      storeId: billboard?.storeId,
    },
  });

  const { mutateAsync: updateBillboard } =
    client.billboard.updateBillboard.useMutation({
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

  const handleUpdateBillboard = async (
    data: z.infer<typeof updateBillboardSchema>,
  ) => {
    setLoading(true);
    data.imageUrl = imageUrl;
    console.log(data);
    await updateBillboard(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/billboards`);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Edit billboard"
          description="Fill the form to edit a billboard"
        />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <div className="flex items-center justify-between my-5">
          {imageUrl ? (
            <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => setImageUrl("")}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={imageUrl ?? ""}
                alt=""
                className="w-full h-full"
                fill
              />
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-start my-5">
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Add Billboard Image
              </Label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(response) => {
                  setImageUrl(response[0].url);
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          )}
        </div>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleUpdateBillboard)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="billboardId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Billboard Id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter billboard id"
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
              name="billboardLabel"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter billboard name"
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
            Create billboard
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
