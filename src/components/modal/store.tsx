"use client";

import { FC, useState } from "react";
import { Modal } from ".";
import { useStoreModal } from "~/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { storeSchema } from "~/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { client } from "~/lib/trpc/client";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export const StoreModal: FC = () => {
  const store = useStoreModal();

  const form = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: createStore } = client.store.addStore.useMutation({
    onSuccess: () => {
      toast("Success", {
        description: "Store created successfully",
      });
    },
    onError: (error) => {
      toast("Error", {
        description: "Error creating store",
      });
      console.log(error);
    },
  });

  const handleAddStore = async (data: z.infer<typeof storeSchema>) => {
    await createStore(data);
  };

  return (
    <Modal
      isOpen={store.isOpen}
      onClose={store.onClose}
      title="Create store"
      description="Add a new store to manage products and categories"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddStore)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Label>Store name</Label>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter store name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex items-center gap-5 justify-end mt-5">
            <Button onClick={store.onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
