import React from 'react'
import { Button } from "antd";
import { StyleSheet,css } from "aphrodite";

const styles = StyleSheet.create({
    button: {
      background: "white",
      border: "none",
      fontStyle: "italic",
      color: "#48A9FF",
    }
  });
export const CustomButton = (props) => {
    return <Button className={css(styles.button)}>{props.text}</Button>
}