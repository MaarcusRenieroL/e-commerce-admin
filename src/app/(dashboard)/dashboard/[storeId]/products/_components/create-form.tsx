"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Category, Product, Size, Color } from "@prisma/client";
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
import { productSchema } from "~/lib/zod-schema";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type Props = {
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  storeId: string;
};

type Image = {
  name: string;
  size: number;
  key: string;
  serverData: {
    uploadedBy: string;
  };
  url: string;
  customId: null;
  type: string;
};


export const CreateProductForm: FC<Props> = ({
  storeId,
  categories,
  sizes,
  colors,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState<Image[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      images: imageArray.map((image) => image.url),
      price: "",
      categoryName: "",
      sizeName: "",
      colorName: "",
      storeId: storeId,
    },
  });

  const { mutateAsync: createProduct } = client.product.addProduct.useMutation({
    onSuccess: () => {
      toast("Success", {
        description: "Product created successfully",
      });
    },
    onError: () => {
      toast("Error", {
        description: "Error creating product",
      });
    },
  });

  const handleCreateProduct = async (data: z.infer<typeof productSchema>) => {
    setLoading(true);
    data.images = imageArray.map((image) => image.url);
    console.log(data);
    const product = await createProduct(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/products/${product.data.productId}`);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Create a product"
          description="Fill the form to create a product"
        />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <div className="flex flex-col items-start justify-between my-5">
          {imageArray.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imageArray.map((image) => (
                <div
                  key={image.key}
                  className="relative w-32 h-32"
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      onClick={() => {
                        setImageArray((prev) =>
                          prev.filter((img) => img.key !== image.key)
                        );
                      }}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="space-y-2 flex flex-col items-start my-5">
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Add Product Image
            </Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(response: any) => {
                setImageArray(response)
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleCreateProduct)}
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Label</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
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
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product price"
                      type="number"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="categoryName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup defaultValue="">
                          <SelectLabel>Category</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.categoryId}
                              value={category.categoryLabel}
                            >
                              {category.categoryLabel}
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
            <FormField
              name="sizeName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup defaultValue="">
                          <SelectLabel>Size</SelectLabel>
                          {sizes.map((size) => (
                            <SelectItem key={size.sizeId} value={size.name}>
                              {size.name}
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
            <FormField
              name="colorName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup defaultValue="">
                          <SelectLabel>Color</SelectLabel>
                          {colors.map((color) => (
                            <SelectItem key={color.colorId} value={color.name}>
                              {color.name}
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
            Create product
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};

