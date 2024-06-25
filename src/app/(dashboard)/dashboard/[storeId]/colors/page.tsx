import { db } from "~/lib/db";
import { ColorsClient } from "./_components/client";

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedcolors = colors.map((color) => ({
    colorId: color.colorId,
    name: color.name,
    value: color.value,
    createdAt: color.createdAt,
  }));

  return (
    <div>
      <ColorsClient colors={formattedcolors} />
    </div>
  );
}
