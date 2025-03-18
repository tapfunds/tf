import { NextPage } from "next";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import Dashboard from "./Dashboard";
import { accounts, budgets, group1, group2, transactions } from "@/lib/schemas";

const HomePage: NextPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  console.log("User is", user);
  return (
    <div className="m-5">
      <Dashboard
        user={user}
        budgets={budgets}
        transactions={transactions}
        groups={[group1, group2]}
        accounts={accounts}
      />
    </div>
  );
};

export default HomePage;
