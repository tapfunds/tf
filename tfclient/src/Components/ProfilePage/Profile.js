import React from "react";
import { StyleSheet, css } from "aphrodite";
import { useSelector } from "react-redux";


const styles = StyleSheet.create({
  wrapper: {
    height: "82vh",
    minHeight: "82vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "50px",
  },
  button: {
    background: "#48A9FF",
    border: "none",
    fontStyle: "italic",
    color: "white",
  },
  footer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  text: {
    fontSize: "25px",
    
    color: "black",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  balance: {},
});

const Profile = () => {
  const currentUserState = useSelector((state) => state.Auth);

  const user = currentUserState.currentUser
  ? currentUserState.currentUser
  : "";
  console.log(user);

  return (
    <React.Fragment>
      <div className={css(styles.wrapper)}>
        <div className={css(styles.text)}>
          <h2>Whats goodie, {user.username}!</h2>
          <p>
            Sandbox Credentials for Plaid Link
          </p>
          <p>
            username: user_good
          </p>
          <p>
            password: pass_good
          </p>
        </div>
        <div>
            Soon come
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
