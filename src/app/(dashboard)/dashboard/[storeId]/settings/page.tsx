import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/lib/auth";
import { getStore } from "~/lib/helpers";
import { SettingsForm } from "./_components/settings-form";

interface Props {
  params: {
    storeId: string;
  };
}

export default async function StoreSettingsPage({ params }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const store = await getStore(session.user.id, params.storeId);

  if (!store) {
    return null;
  }

  return <SettingsForm store={store} />;
}
