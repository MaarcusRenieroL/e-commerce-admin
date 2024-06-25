"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Heading } from "~/components/heading";
import { AlertModal } from "~/components/modal/alert-modal";
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
import { deleteStoreSchema, settingsFormSchema } from "~/lib/zod-schema";

type Props = {
  store: Store;
};

export const SettingsForm: FC<Props> = ({ store }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      storeId: store.storeId,
      storeName: store.storeName,
    },
  });

  const { mutateAsync: updateStore } = client.store.updateStore.useMutation({
    onSuccess: () => {
      toast("Success", {
        description: "Store updated successfully",
        duration: 1000,
      });
    },
    onError: () => {
      toast("Error", {
        description: "Error updating store",
        duration: 1000,
      });
    },
  });

  const { mutateAsync: deleteStore } = client.store.deleteStore.useMutation({
    onSuccess: () => {
      toast("Success", {
        description: "Store updated successfully",
        duration: 1000,
      });
    },
    onError: () => {
      toast("Error", {
        description: "Error updating store",
        duration: 1000,
      });
    },
  });

  const handleUpdateStore = async (
    data: z.infer<typeof settingsFormSchema>,
  ) => {
    setLoading(true);
    console.log(data);
    await updateStore(data);
    router.refresh();
    setLoading(false);
  };

  const handleDeleteStore = async (data: z.infer<typeof deleteStoreSchema>) => {
    try {
      setLoading(true);
      await deleteStore(data);
      router.push("/dashboard");
      router.refresh();
      setOpen(true);
    } catch (error) {
      toast("Error", {
        description: "Make sure you have removed all products and categories",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDeleteStore({ storeId: store.storeId });
        }}
        loading={loading}
      />
      <div className="w-full flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          className="flex items-center justify-between space-x-2"
        >
          <Trash className="h-4 w-4" />
          <p>Delete store</p>
        </Button>
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateStore)}
          className="space-y-8 w-full"
        >
          <FormField
            name="storeId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter store name"
                    type="text"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="storeName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter store name"
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
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </>
  );
};
