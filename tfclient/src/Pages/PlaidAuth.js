import React from "react";
import Link from "../Components/PlaidAuth/Link";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const PlaidAuth = ({ props }) => {
  const currentUserState = useSelector((state) => state.Auth);
  //incase someone visits the route manually
  if (!currentUserState.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
        <div>
          Here is when auth begins
          <Link />
        </div>

  );
};


export default PlaidAuth;
