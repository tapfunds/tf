import React from "react";
import { Link, Redirect } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import {CustomButton} from "../Components/Button/Button";
import { useSelector } from "react-redux";


const styles = StyleSheet.create({
  wrapper: {  
    height: "200vh",
    minHeight: "200vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

  },
  subwrapper: {
    paddingLeft: "50px",
    paddingRight: "50px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
  },
  sihnupwrapper: {
    paddingLeft: "50px",
    paddingRight: "50px",
    textAlign: "center",

  },
  text: {
    paddingTop:"15px",
    fontSize: "72px",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  subtext: {
    fontSize: "42px",
    paddingTop:"15px",

  },
});

function Landing() {
  const currentState = useSelector((state) => state.Auth);
  if(currentState.isAuthenticated){
    return <Redirect to='/home' />
  }
  return (
    <React.Fragment>
        <div className={css(styles.wrapper)}>

          <div className={css(styles.subwrapper)} style={{color: "white", backgroundColor:"#313030", height:"66vh"}}>
            <div className={css(styles.text)}>Transfer Money Fast</div>
            <p className={css(styles.subtext)} style={{color:"white"}}>
              Safely transfer funds bewteen any of your personal accounts
            </p>
          </div>

          <div className={css(styles.subwrapper)} style={{ height:"66vh"}}>
            <div className={css(styles.text)}>Understand Spending Habits</div>
            <p className={css(styles.subtext)}>
              View account trends to advise yourself on better money habits
            </p>
          </div>
          <div className={css(styles.sihnupwrapper)} style={{ height:"25vh"}}>
              <div className={css(styles.subtext)}>
              Sign up now!{" "} <br/>

              </div>
              
              <Link to="/login" ><CustomButton text="Tap your finances"/></Link>
            
          </div>
        </div>
      </React.Fragment>

  );
}


export default Landing;
