import { db } from "~/lib/db";
import { BillboardClient } from "./_components/client";

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div>
      <BillboardClient billboards={billboards} />
    </div>
  );
}
