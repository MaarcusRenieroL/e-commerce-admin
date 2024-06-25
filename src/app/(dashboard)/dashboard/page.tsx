import { redirect } from "next/navigation";
import { DashboardStoreModal } from "~/components/modal/dashboard-modal";
import { getServerAuthSession } from "~/lib/auth";
import { db } from "~/lib/db";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    return;
  }

  const store = await db.store.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (store) {
    redirect(`/dashboard/${store.storeId}`);
  }

  return <DashboardStoreModal />;
}
