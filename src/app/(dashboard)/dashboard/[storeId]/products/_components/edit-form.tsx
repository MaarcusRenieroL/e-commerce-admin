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
import { deleteProductSchema, updateProductSchema } from "~/lib/zod-schema";
import Image from "next/image";
import { AlertModal } from "~/components/modal/alert-modal";
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
  product: Product & {
    category: Category;
    size: Size;
    color: Color;
  };
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  storeId: string;
};

export const EditProductForm: FC<Props> = ({
  product,
  storeId,
  categories,
  sizes,
  colors,
}) => {
  if (!product) {
    return;
  }

  const [loading, setLoading] = useState(false);
  const [imageArray, setImageArray] = useState<string[]>(product.images ?? "");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.productName,
      images: imageArray.map((image) => image),
      price: String(product.price),
      categoryName: product.category.categoryLabel,
      sizeName: product.size.name,
      colorName: product.color.name,
      storeId: storeId,
    },
  });

  const { mutateAsync: updateProduct } =
    client.product.updateProduct.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Product updated successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error updating product",
        });
      },
    });

  const handleUpdateProduct = async (
    data: z.infer<typeof updateProductSchema>,
  ) => {
    setLoading(true);
    data.images = imageArray.map((image) => image);
    console.log(data);
    const product = await updateProduct(data);
    setLoading(false);
    router.push(`/dashboard/${storeId}/products/${product.data.productId}`);
  };

  const { mutateAsync: deleteProduct } =
    client.product.deleteProduct.useMutation({
      onSuccess: () => {
        toast("Success", {
          description: "Product deleted successfully",
        });
      },
      onError: () => {
        toast("Error", {
          description: "Error deleting product",
        });
      },
    });

  const handleDelete = async (data: z.infer<typeof deleteProductSchema>) => {
    await deleteProduct(data);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          handleDelete({ productId: product.productId, storeId: storeId });
          router.push(`/dashboard/${storeId}/products`);
          router.refresh();
        }}
        loading={loading}
      />
      <div className="w-full flex items-center justify-between">
        <Heading
          title="Edit product"
          description="Fill the form to edit a product"
        />
        <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Product
        </Button>
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <div className="flex items-center justify-between my-5">
          {imageArray.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imageArray.map((image: any) => (
                <div key={image.key} className="relative w-32 h-32">
                  <Image
                    src={image}
                    alt="product image"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      onClick={() => {
                        setImageArray((prev) =>
                          prev.filter((img) => img !== image),
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
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(response: any) => {
              setImageArray(response);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(handleUpdateProduct)}
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
            Update product
          </Button>
        </form>
      </Form>
      <Separator className="mt-5" />
    </>
  );
};
