import { db } from "~/lib/db";
import { SizesClient } from "./_components/client";

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedSizes = sizes.map((size) => ({
    sizeId: size.sizeId,
    name: size.name,
    value: size.value,
    createdAt: size.createdAt,
  }));

  return (
    <div>
      <SizesClient sizes={formattedSizes} />
    </div>
  );
}
