import React from "react";
import { useSelector } from "react-redux";
import BankTap from "./BankTap";

const bank_info = [
  {
    name:"Bank of America",
    color:"red"
  },
  {
    name:"Cash App",
    color:"green"
  },
  {
    name:"Chase",
    color: "blue"
  },
  {name:"TD Bank",
  color: "green"
  },  {
    name:"Bank of America",
    color:"red"
  },
  {
    name:"Cash App",
    color:"green"
  },
  {
    name:"Chase",
    color: "blue"
  },
  {name:"TD Bank",
  color: "green"
  },  {
    name:"Bank of America",
    color:"red"
  },
  {
    name:"Cash App",
    color:"green"
  },
  {
    name:"Chase",
    color: "blue"
  },
  {name:"TD Bank",
  color: "green"
  },  {
    name:"Bank of America",
    color:"red"
  },
  {
    name:"Cash App",
    color:"green"
  },
  {
    name:"Chase",
    color: "blue"
  },
  {name:"TD Bank",
  color: "green"
  },
]

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
        {bank_info.map((bank) => 
        <div>
          <BankTap name={bank.name} color={bank.color}/>
        </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
