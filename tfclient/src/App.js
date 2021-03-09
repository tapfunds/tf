import React from "react";
import Nav from "./Components/Navigation/Nav";
import Routes from "./Components/Routes/Routes";
import { FooterContainer } from "./Components/Navigation/FooterContainer";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({

  container: {
    // display: "flex",
    // flex: 1,
    // minHeight: "100vh",
    // flexDirection: "column",
    // justifyContent: "space-between",
  }
});

const App = () => {
  return (
    <div className={css(styles.container)}>
        <div>
          <Nav/>
        </div>
        <div>
          <Routes/>

        </div>

        <div>
        <FooterContainer />
        </div>
    </div>
  );
}

export default App;
