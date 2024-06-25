import { redirect } from "next/navigation";
import { db } from "~/lib/db";

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const storeId = params.storeId;

  const store = await db.store.findFirst({
    where: {
      storeId: storeId,
    },
  });

  if (!store) {
    redirect("/dashboard");
  }

  return (
    <div>
      <h1>Active Store storeId : {storeId}</h1>
      <h1>Active Store Name: {store?.storeName}</h1>
    </div>
  );
}
