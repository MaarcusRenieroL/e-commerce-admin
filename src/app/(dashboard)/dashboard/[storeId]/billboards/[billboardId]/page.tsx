import { db } from "~/lib/db";
import { BillboardForm } from "../_components/billboard-form";

export default async function BillboardIdPage({
  params,
}: {
  params: { billboardId: string; storeId: string };
}) {
  const billboard = await db.billboard.findUnique({
    where: {
      billboardId: params.billboardId,
    },
  });

  return <BillboardForm billboard={billboard} storeId={params.storeId} />;
}
