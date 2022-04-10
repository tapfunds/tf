import React from "react";
import Link from "../Components/PlaidAuth/Link";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PlaidAuth = () => {
  interface UserState {
    Auth: { isAuthenticated: boolean };
  }
  const userAuth = (state: UserState) => state.Auth.isAuthenticated;
  const currentUserState = useSelector(userAuth);
  //incase someone visits the route manually
  if (!currentUserState) {
    return <Redirect to="/login"/>;
  }
  return (
    <div className="App h-screen w-full flex flex-col justify-center items-center bg-blue-50">
      <div className="w-full max-w-md  flex flex-col justify-center items-center bg-white shadow-md rounded px-8 py-8 pt-8">
        <div className="px-4 pb-4">
          <h1 className="text-lg block font-bold  pb-2">Tap an account</h1>
          <h3 className="text-sm block font-bold  pb-2">Sandbox Credentials</h3>
          <h3 className="text-sm block font-bold  pb-2">username: user_good</h3>
          <h3 className="text-sm block font-bold  pb-2">password: pass_good</h3>
        </div>
        <div >
          <Link />
        </div>
      </div>
    </div>
  );
};

export default PlaidAuth;
