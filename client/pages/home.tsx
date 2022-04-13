import type { NextPage } from "next";
import { BankCard } from "../components";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

interface Bank {
  id: string;
  name: string;
  color: string;
}
const bank_info: Bank[] = [
  {
    id: "1",
    name: "Bank of America",
    color: "#be123c",
  },
  {
    id: "2",
    name: "Cash App",
    color: "#22c55e",
  },
  {
    id: "3",
    name: "Chase",
    color: "#27272a",
  },
  {
    id: "4",
    name: "TD Bank",
    color: "#16a34a",
  },
  {
    id: "5",
    name: "Chime",
    color: "#4ade80",
  },
  {
    id: "6",
    name: "Varo",
    color: "#9333ea",
  },
  {
    id: "7",
    name: "Credit One",
    color: "#0ea5e9",
  },
  {
    id: "8",
    name: "Greenwood Bank",
    color: "#134e4a",
  },
  {
    id: "9",
    name: "Robins",
    color: "#f8fafc",
  },
];
const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Tapfunds</title>
        <meta name="description" content="Modern Banking Solution" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="bg-white shadow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className=" text-3xl font-bold text-gray-900">Hello, X!</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 bg-blue-50 ">
        {bank_info.map((bank) => (
          <div key={bank.id}>
            <BankCard name={bank.name} color={bank.color} />
          </div>
        ))}
        <div className="py-6 flex-1 flex-col justify-start sm:py-9 relative sm:max-w-xl sm:mx-auto ">
          <Link href="/link">
            <div>
              <Image src="/plus.svg" alt="Plus Sign" width={100} height={100} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
