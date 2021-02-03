import React from "react";
import Profile from "../Components/ProfilePage/Profile";
import { StyleSheet, css } from "aphrodite";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


const styles = StyleSheet.create({
  wrapper: {
    height: "300vh",
    display: "flex",
    flexDirection: "column",
    alignSelf: "auto",
    justifyContent: "space-between"

  },
  child:{
    display: "flex",
    flexDirection: "column",
    alignSelf: "auto",
    padding: "13px",
    paddingBottom: "13px"
  },
  footer:{
    display: "flex",
    flexDirection: "column",
    paddingTop: "13px",
  }
});

const Home = () => {
  const currentUserState = useSelector((state) => state.Auth);
  //incase someone visits the route manually
  if (!currentUserState.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <div className={css(styles.wrapper)}>
        <div className={css(styles.child)}>
          <Profile />
        </div>
      </div>
      </div>
  )
}


export default Home;