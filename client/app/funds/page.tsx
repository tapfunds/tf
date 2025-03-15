import { NextPage } from "next";
import { getUser } from "@/lib/dal";

const HomePage: NextPage = async () => {
  const user = await getUser();
  console.log("User is", user);
  return <div className="m-5">me</div>;
};

export default HomePage;
