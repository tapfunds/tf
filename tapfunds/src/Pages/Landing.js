import React from "react";
import { Link, Redirect } from "react-router-dom";
import {CustomButton} from "../Components/Button/Button";
import { useSelector } from "react-redux";
import Logo from "../Components/ProfilePage/Logo";

function Landing() {
  const currentState = useSelector((state) => state.Auth);
  if(currentState.isAuthenticated){
    return <Redirect to='/home' />
  }
  return (
    <React.Fragment>
        <div >
          {/* <Logo/> */}
          <div  style={{color: "white", backgroundColor:"#313030", height:"66vh"}}>
            <div >Transfer Money Fast</div>
            <p style={{color:"white"}}>
              Secure, fast, personal bank to bank transfers
            </p>
          </div>

          <div  style={{ height:"66vh"}}>
            <div >Understand Spending Habits</div>
            <p >
              View account trends to advise yourself on better money habits
            </p>
          </div>
          <div  style={{ height:"25vh"}}>
              <div >
              Sign up now!{" "} <br/>

              </div>
              
              <Link to="/login" ><CustomButton text="Tap your finances"/></Link>
            
          </div>
        </div>
      </React.Fragment>

  );
}


export default Landing;
