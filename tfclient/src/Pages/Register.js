import React, { useState } from "react";
import { Label, Input, FormGroup, CardHeader, CardBody, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from 'react-router-dom';
import { Card } from "antd";
import { StyleSheet, css } from "aphrodite";

import "./Auth.css";
import { SignUp } from '../store/modules/auth/actions/authAction';

const styles = StyleSheet.create({
  button: {
    background: "#48A9FF",
    border: "none",
    fontStyle: "italic",
    color: "white",
  },
  subtext: {
    color: "black",
    padding: "10px",
  },
  card: {
    width: "360px",
    fontSize: "17px",
    fontStyle: "italic",

  },
});

const Register = () => {

  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    username:'',
    email: '',
    password: ''
  });
  const dispatch = useDispatch()

  const addUser = (credentials) => dispatch(SignUp(credentials))

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const submitUser = (e) => {
    e.preventDefault()
    addUser({
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  if(currentState.isAuthenticated){
    return <Redirect to='/' />
  }

    return (
      <div className="App" id="page-container">

        <div className="container Auth">
        <Card  className={css(styles.card)}>
          <CardHeader>Welcome To Tapfunds</CardHeader>
          <CardBody>
          <form onSubmit={submitUser}>
          <FormGroup>
            <Label>User Name</Label>
            <Input type="text" name="username" placeholder="Enter username"  onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_username ? (
              <small className="color-red">{currentState.signupError.Required_username}</small>
              ) : (
                ""
              )}
              { currentState.signupError && currentState.signupError.Taken_username ? (
              <small className="color-red">{ currentState.signupError.Taken_username }</small>
              ) : (
                ""
              )}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Enter email" onChange={handleChange} />
            { currentState.signupError && currentState.signupError.Required_email ? (
              <small className="color-red">{currentState.signupError.Required_email}</small>
              ) : (
                ""
            )}
            { currentState.signupError && currentState.signupError.Invalid_email ? (
              <small className="color-red">{ currentState.signupError.Invalid_email }</small>
              ) : (
                ""
            )}
            { currentState.signupError && currentState.signupError.Taken_email ? (
              <small className="color-red">{ currentState.signupError.Taken_email }</small>
              ) : (
                ""
            )}
            </FormGroup>
            <FormGroup>
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Enter password" onChange={handleChange}/>
            { currentState.signupError && currentState.signupError.Required_password ? (
              <small className="color-red">{ currentState.signupError.Required_password }</small>
              ) : (
                ""
              )}
              { currentState.signupError && currentState.signupError.Invalid_password ? (
              <small className="color-red">{ currentState.signupError.Invalid_password }</small>
              ) : (
                ""
              )}
            </FormGroup>
            { currentState.isLoading ? (
              <Button
              className={css(styles.button)}

                color="primary"
                type="submit"
                block
                disabled
              >
                Registering...
            </Button>
            ) : (
              <Button
              className={css(styles.button)}

                color="primary"
                type="submit"
                block
                disabled={ user.username === "" || user.email === "" || user.password === ""  }
              >
                Register
            </Button>
            )}
            </form>
            <div className="mt-2">
              <small>Have an account? <Link to="/login">Please login</Link></small>
            </div>
            </CardBody>
          </Card>
        </div>
        
      </div>
    );
}

export default Register