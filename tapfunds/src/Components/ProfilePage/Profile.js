import React from "react";
import { useSelector } from "react-redux";
import BankTap from "./BankTap";
// import { fetchUserAccounts } from "../../store/modules/accounts/actions/accountActions";

const bank_info = [
  {
    id:"1",
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
  color: "green" 
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
    color: "green" 
  },
  {
    id: "9",
    name: "Bank of America",
    color: "red",
  },
];

const Profile = () => {
  const currentUserState = useSelector((state) => state.Auth);

  const user = currentUserState.currentUser ? currentUserState.currentUser : "";
  // const dispatch = useDispatch();
  // const getAccountInfo = (userDetails) => dispatch(fetchUserAccounts(userDetails));

  // TODO: create useEffect to handle fetch of data, limit amount of data pulled on  

  return (
    <React.Fragment>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className=" text-3xl font-bold text-gray-900">
            Whats goodie, {user.username}!
          </h1>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-2 bg-blue-50 ">
        {bank_info.slice(0, 5).map((bank) => (
          <div key={bank.id}>
            <BankTap name={bank.name} color={bank.color} />
          </div>
        ))}
        <div className=" py-6 flex-1 flex-col justify-start sm:py-9">
          <div
            style={{ width: "35%" }}
            className="relative sm:max-w-xl sm:mx-auto "
          >
            <div className="absolute inset-0 shadow-lg bg-white sm:rounded-3xl"></div>
            <div className="relative sm:p-20 px-4 pb-4">
              <div className="max-w-md mx-auto">
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
