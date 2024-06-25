import { db } from "~/lib/db";
import { ColorsForm } from "../_components/color-form";

export default async function CategoryIdPage({
  params,
}: {
  params: { colorId: string; storeId: string };
}) {
  const color = await db.color.findUnique({
    where: {
      colorId: params.colorId,
    },
  });

  return <ColorsForm storeId={params.storeId} color={color} />;
}
