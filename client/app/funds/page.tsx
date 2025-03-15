"use client";

import { NextPage } from "next";
import { useState } from "react";
import { getUser } from "../../lib/dal";

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
    id: "5",
    name: "Chime",
    color: "#4ade80",
  },
  {
    id: "7",
    name: "Credit One",
    color: "#0ea5e9",
  },
  {
    id: "9",
    name: "Robins",
    color: "#1B82EAFF",
  },
];

const HomePage: NextPage = async() => {
  const [selectedBank, setSelectedBank] = useState<string>(bank_info[0].id);

  const handleTabClick = (id: string) => {
    setSelectedBank(id);
  };

  // const user = await getUser();
  // console.log(user)
  return (
    <div className="m-5">
      <div className="bg-white shadow m-5 mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">Hello, X!</h1>
      </div>
      {/* Tab navigation for Banks */}
      <div className="flex space-x-4 border-b-2 pb-4">
        {bank_info.map((bank) => (
          <button
            key={bank.id}
            className={`text-lg font-semibold py-2 px-4 rounded-lg ${
              selectedBank === bank.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-100"
            }`}
            onClick={() => handleTabClick(bank.id)}
          >
            {bank.name}
          </button>
        ))}
      </div>
      {/* Bank Details */}
      <div className="mt-6">
        {bank_info.map(
          (bank) =>
            selectedBank === bank.id && (
              <div
                key={bank.id}
                className="p-6 bg-gray-100 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-semibold">{bank.name}</h2>
                <p className="mt-4">Details for {bank.name} go here.</p>
                <div className="mt-4">
                  <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-400 transition">
                    View More Details
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default HomePage;
