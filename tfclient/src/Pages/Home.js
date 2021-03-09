import React from "react";
import Profile from "../Components/ProfilePage/Profile";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";




const Home = () => {
  const currentUserState = useSelector((state) => state.Auth);
  //incase someone visits the route manually
  if (!currentUserState.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
        <div >
          <Profile />
        </div>

      </div>
  )
}


export default Home;