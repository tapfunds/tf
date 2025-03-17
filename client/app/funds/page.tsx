import { NextPage } from "next";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const HomePage: NextPage = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  console.log("User is", user);
  return <div className="m-5">me</div>;
};

export default HomePage;
