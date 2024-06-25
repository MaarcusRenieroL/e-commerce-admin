import { db } from "~/lib/db";
import { ProductsClient } from "./_components/client";
import { format } from "date-fns";
import { formatter } from "~/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await db.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      store: true,
      category: true,
      color: true,
      size: true,
    },
  });

  const formattedProducts = products.map((product) => ({
    productId: product.productId,
    name: product.productName,
    price: formatter.format(product.price.toNumber()),
    category: product.category.categoryLabel,
    size: product.size.name,
    color: product.color.name,
    createdAt: product.createdAt,
  }));

  return (
    <div>
      <ProductsClient products={formattedProducts} />
    </div>
  );
}
