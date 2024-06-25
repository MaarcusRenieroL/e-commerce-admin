import { db } from "~/lib/db";
import { CategoriesForm } from "../_components/category-form";

export default async function CategoryIdPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await db.category.findUnique({
    where: {
      categoryId: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <CategoriesForm
      billboards={billboards}
      storeId={params.storeId}
      category={category}
    />
  );
}
