import Footer from "rc-footer";
import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({

    footer: {
      display: 'flex',
      flex: 1,
      alignContent: "center",
    flexDirection: "column",
    justifyContent: "flex-end",
    }
  });

export const FooterContainer = () => {
  return (
      <div className={css(styles.footer)}>

    <Footer
      columns={[
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
              alt="lovey"
            />
          ),
          title: "语雀",
          url: "https://yuque.com",
          description: "知识创作与分享工具",
          openExternal: true,
        },
      ]}
      bottom="Made with ❤ by Qwelian Tanner"
    />
</div>

  );
}

