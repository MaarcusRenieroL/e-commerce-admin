import { db } from "~/lib/db";
import { ProductForm } from "../_components/product-form";

export default async function ProductIdPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await db.product.findUnique({
    where: {
      productId: params.productId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
  });

  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <ProductForm
      categories={categories}
      sizes={sizes}
      colors={colors}
      product={product}
      storeId={params.storeId}
    />
  );
}
