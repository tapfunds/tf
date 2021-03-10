import React from "react";
import { useSelector } from "react-redux";
import BankTap from "./BankTap";

const bank_info = [
  {
    name: "Bank of America",
    color: "red",
  },
  {
    name: "Cash App",
    color: "green",
  },
  {
    name: "Chase",
    color: "blue",
  },
  { name: "TD Bank", color: "green" },
  {
    name: "Bank of America",
    color: "red",
  },
  {
    name: "Cash App",
    color: "green",
  },
  {
    name: "Chase",
    color: "blue",
  },
  { name: "TD Bank", color: "green" },
  {
    name: "Bank of America",
    color: "red",
  },
  {
    name: "Cash App",
    color: "green",
  },
  {
    name: "Chase",
    color: "blue",
  },
  { name: "TD Bank", color: "green" },
  {
    name: "Bank of America",
    color: "red",
  },
  {
    name: "Cash App",
    color: "green",
  },
  {
    name: "Chase",
    color: "blue",
  },
  { name: "TD Bank", color: "green" },
];



const Profile = () => {
  const currentUserState = useSelector((state) => state.Auth);

  const user = currentUserState.currentUser ? currentUserState.currentUser : "";

  return (
    <React.Fragment>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className=" text-3xl font-bold text-gray-900">
            Whats goodie, {user.username}!
          </h1>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-2 bg-gray-100 ">
        {bank_info.slice(0, 5).map((bank) => (
          <div>
            <BankTap name={bank.name} color={bank.color} />
          </div>
        ))}
        <div class="bg-gray-100 py-6 flex-1 flex-col justify-start sm:py-9">
          <div
            style={{ width: "35%" }}
            class="relative  sm:max-w-xl sm:mx-auto "
          >
            <div class="absolute inset-0 shadow-lg sm:rounded-3xl"></div>
            <div class="relative sm:p-20 px-4 pb-4">
              
              <div  class="max-w-md mx-auto">
                <a href="/accounts">
                <div>
                  <img src="./plus.svg" alt="uh, oh no" />

                </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
