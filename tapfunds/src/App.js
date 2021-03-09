import React from "react";
import Nav from "./Components/Navigation/Nav";
import Routes from "./Components/Routes/Routes";
import FooterContainer from "./Components/Navigation/FooterContainer";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({

  body: {
    margin: 0,
    lineHeight: 1.6,
    color: "#333",
    background: "#48A9FF",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  footer:{
    marginTop: "auto"
  }
});

const App = () => {
  return (
    <div className={css(styles.body)}>
        <div>
          <Nav/>
        </div>
        <div >
          <Routes/>
        </div>
        <div className={css(styles.footer)}>
        <FooterContainer />
        </div>
    </div>
  );
}

export default App;


