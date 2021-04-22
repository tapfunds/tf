import React from "react";
import { Link, Redirect } from "react-router-dom";
import { CustomButton } from "../Components/Button/Button";
import { useSelector } from "react-redux";
import {
  TypographyThree,
  TypographyTwo,
  TypographyOne,
} from "../Components/ProfilePage/ParticleNames";

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

        </section>

        <section
          div
          className="App h-screen grid w-full flex-col justify-items-center bg-#48A9FF"
        >
          <div>
            <TypographyTwo />
          </div>

        </section>
        <section className="App h-screen grid w-full flex-col justify-items-center bg-#48A9FF">
          <TypographyThree />
          <div>
            <Link to="/login">
              <CustomButton text="Tap your finances" />
            </Link>
          </div>
            
        </section>
      </div>
    </React.Fragment>
  );
}

export default Landing;
