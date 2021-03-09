import React from "react";
import { useSelector } from "react-redux";
import BankTap from "./BankTap";

const Profile = () => {
  const currentUserState = useSelector((state) => state.Auth);

  const user = currentUserState.currentUser ? currentUserState.currentUser : "";
  console.log(user);

  return (
    <React.Fragment>
      <h2>Whats goodie, {user.username}!</h2>

      <div>
        <BankTap />
      </div>
    </React.Fragment>
  );
};

export default Profile;
