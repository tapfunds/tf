import { group1, members, transactions } from "@/lib/schemas";
import GroupDashboard from "./GroupDashboard";

export default async function FundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      My Post: {slug}{" "}
      <>
        <GroupDashboard
          group={group1}
          transactions={transactions}
          members={members}
        />
      </>
    </div>
  );
}
