import React from "react";
import { Link, Redirect } from "react-router-dom";
import { CustomButton } from "../Components/Button/Button";
import { useSelector } from "react-redux";
import { TypographyThree, TypographyTwo, TypographyOne } from "../Components/ProfilePage/Logo";

function Landing() {
  const currentState = useSelector((state) => state.Auth);
  if (currentState.isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <React.Fragment>
      <div>
        <section className="App h-screen grid w-full flex-col justify-items-center ">
          <div>
          <TypographyOne />

          </div>
          <p style={{ color: "white" }}>
            Secure personal bank to bank transfers
          </p>
        </section>

        <section
          div
          className="App h-screen grid w-full flex-col justify-items-center bg-blue-50"
        >
          <div>
          <TypographyTwo />

          </div>
          <p>View account trends to advise yourself on better money habits</p>
        </section>
        <section className="App h-screen grid w-full flex-col justify-items-center bg-#48A9FF">
          <TypographyThree />
          <p style={{ color: "white" }}>
            View account balances, recent transctions, and account health of any of your accounts
            <Link to="/login">
            <CustomButton text="Tap your finances" />
          </Link>
          </p>
        </section>
      </div>
    </React.Fragment>
  );
}

export default Landing;
