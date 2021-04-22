import React, { useState } from "react";
import {
  Label,
  Input,
  FormGroup,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Card } from "antd";

import { SignUp } from "../store/modules/auth/actions/authAction";

const Register = () => {
  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const addUser = (credentials) => dispatch(SignUp(credentials));

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const submitUser = (e) => {
    e.preventDefault();
    addUser({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  };

  if (currentState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-green-50">
        <Card className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
          <CardHeader  className="px-4 pb-4">Welcome To Tapfunds</CardHeader>
          <CardBody>
            <form onSubmit={submitUser}>
              <FormGroup className="px-4 pb-4">
                <Label htmlFor="username" className="text-sm block font-bold  pb-2">User Name</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "

                  onChange={handleChange}
                />
                {currentState.signupError &&
                currentState.signupError.Required_username ? (
                  <small className="color-red">
                    {currentState.signupError.Required_username}
                  </small>
                ) : (
                  ""
                )}
                {currentState.signupError &&
                currentState.signupError.Taken_username ? (
                  <small className="color-red">
                    {currentState.signupError.Taken_username}
                  </small>
                ) : (
                  ""
                )}
              </FormGroup>
              <FormGroup className="px-4 pb-4">
                <Label htmlFor="email" className="text-sm block font-bold  pb-2">Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "

                  onChange={handleChange}
                />
                {currentState.signupError &&
                currentState.signupError.Required_email ? (
                  <small className="color-red">
                    {currentState.signupError.Required_email}
                  </small>
                ) : (
                  ""
                )}
                {currentState.signupError &&
                currentState.signupError.Invalid_email ? (
                  <small className="color-red">
                    {currentState.signupError.Invalid_email}
                  </small>
                ) : (
                  ""
                )}
                {currentState.signupError &&
                currentState.signupError.Taken_email ? (
                  <small className="color-red">
                    {currentState.signupError.Taken_email}
                  </small>
                ) : (
                  ""
                )}
              </FormGroup>
              <FormGroup className="px-4 pb-4">
                <Label htmlFor="password" className="text-sm block font-bold  pb-2">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "

                  onChange={handleChange}
                />
                {currentState.signupError &&
                currentState.signupError.Required_password ? (
                  <small className="color-red">
                    {currentState.signupError.Required_password}
                  </small>
                ) : (
                  ""
                )}
                {currentState.signupError &&
                currentState.signupError.Invalid_password ? (
                  <small className="color-red">
                    {currentState.signupError.Invalid_password}
                  </small>
                ) : (
                  ""
                )}
              </FormGroup>
              {currentState.isLoading ? (
                <div className="px-4 pb-4"> 

                <Button color="primary" type="submit" block disabled>
                  Registering...
                </Button>
                </div>

              ) : (
                <div className="px-4 pb-4"> 

                <Button
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

                  type="submit"
                  block
                  disabled={
                    user.username === "" ||
                    user.email === "" ||
                    user.password === ""
                  }
                >
                  Sign Up
                </Button>
                </div>
              )}
            </form>
            <div className="px-4 pb-4">
              <small>
                Have an account? <Link to="/login">Please login</Link>
              </small>
            </div>
          </CardBody>
        </Card>
      </div>
  );
};

export default Register;
