import { ApiAlert } from "~/components/api-alert";
import { Heading } from "~/components/heading";

export default function StoreApiPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="w-full p-10">
      <Heading
        title="API"
        description="List of all APIs accessed by different users"
      />
      <div className="mt-5 space-y-5">
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${process.env.NEXTAUTH_URL}/api/trpc/${params.storeId}`}
          variant="admin"
        />
      </div>
    </div>
  );
}
