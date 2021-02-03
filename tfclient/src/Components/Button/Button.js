import React from 'react'
import { Button } from "antd";
import { StyleSheet,css } from "aphrodite";

const styles = StyleSheet.create({
    button: {
      background: "#48A9FF",
      border: "none",
      fontStyle: "italic",
      color: "white",
    }
  });
export const CustomButton = (props) => {
    return <Button className={css(styles.button)}>{props.text}</Button>
}