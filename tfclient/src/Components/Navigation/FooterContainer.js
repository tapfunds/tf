import Footer from "rc-footer";
import React from "react";
import "./Footer.css"

export const FooterContainer = () => {
  return (
    <Footer
      className="footer"
      columns={[
        {
          title: "Tapfunds",
          url: "https://yuque.com",
          description: "知识创作与分享工具",
          openExternal: true,
        },
      ]}
      bottom="Made with ❤ by Qwelian Tanner"
    />
  );
}

