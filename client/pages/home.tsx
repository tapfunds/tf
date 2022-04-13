import type { NextPage } from "next";
import BankCard from "../components/Card/Bank";
import Image from "next/image";

interface Bank {
  id: string;
  name: string;
  color: string;
}
const bank_info: Bank[] = [
  {
    id: "1",
    name: "Bank of America",
    color: "red",
  },
  {
    id: "2",
    name: "Cash App",
    color: "green",
  },
  {
    id: "3",
    name: "Chase",
    color: "blue",
  },
  {
    id: "4",
    name: "TD Bank",
    color: "green",
  },
  {
    id: "5",
    name: "Bank of America",
    color: "red",
  },
  {
    id: "6",
    name: "Cash App",
    color: "green",
  },
  {
    id: "7",
    name: "Chase",
    color: "blue",
  },
  {
    id: "8",
    name: "TD Bank",
    color: "green",
  },
  {
    id: "9",
    name: "Bank of America",
    color: "red",
  },
];
const Home: NextPage = () => {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className=" text-3xl font-bold text-gray-900">Hello, X!</h1>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-2 bg-blue-50 ">
        {bank_info.slice(0, 5).map((bank) => (
          <div key={bank.id}>
            <BankCard name={bank.name} color={bank.color} />
          </div>
        ))}
        <div className="py-6 flex-1 flex-col justify-start sm:py-9 relative sm:max-w-xl sm:mx-auto ">
          <a href="/accounts">
            <div>
              <Image src="/plus.svg" alt="Plus Sign" width={100} height={100} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
