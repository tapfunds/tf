import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Stats = ({ props }) => {
  const currentUserState = useSelector((state) => state.Auth);
  //incase someone visits the route manually
  if (!currentUserState.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
        <div>
          Stats
        </div>
  );
};


export default Stats;
