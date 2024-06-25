import { db } from "~/lib/db";
import { CategoriesClient } from "./_components/client";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await db.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
  });

  const formattedCategories = categories.map((category) => ({
    categoryId: category.categoryId,
    categoryLabel: category.categoryLabel,
    billboardLabel: category.billboard.billboardLabel,
    createdAt: category.createdAt,
  }));

  return (
    <div>
      <CategoriesClient categories={formattedCategories} />
    </div>
  );
}
