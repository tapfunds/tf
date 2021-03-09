import React from "react";
import image from "../billDuke.jpg";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  imgwrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textwrapper: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },
});

function FourOhFour() {
  return (
    <div>
      <h2 className={css(styles.textwrapper)}>You know you done messed up right...you know that dont you</h2>
        <div className={css(styles.imgwrapper)} >
        <img src="./billDuke.jpg" alt="Bill Duke told you" />

        </div>
    </div>
  );
}

export default FourOhFour;
