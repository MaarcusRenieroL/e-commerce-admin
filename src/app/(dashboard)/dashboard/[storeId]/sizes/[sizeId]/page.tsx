import { db } from "~/lib/db";
import { SizesForm } from "../_components/sizes-form";

export default async function CategoryIdPage({
  params,
}: {
  params: { sizeId: string; storeId: string };
}) {
  const size = await db.size.findUnique({
    where: {
      sizeId: params.sizeId,
    },
  });

  return <SizesForm storeId={params.storeId} size={size} />;
}
