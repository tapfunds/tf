import React, { useState } from "react";
import {
  Label,
  Input,
  FormGroup,
  Button,
  CardHeader,
  CardBody,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { SignIn } from "../store/modules/auth/actions/authAction";
import { Card } from "antd";

const Login = () => {
  const currentState = useSelector((state) => state.Auth);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const userLogin = (credentials) => dispatch(SignIn(credentials));

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const submitUser = (e) => {
    e.preventDefault();
    userLogin({
      email: user.email,
      password: user.password,
    });
  };

  if (currentState.isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-blue-50">
      <Card className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
        <CardHeader className="px-4 pb-4">Login</CardHeader>
        <CardBody>
          <form onSubmit={submitUser}>
            <div className="mb-2">
              {currentState.loginError &&
              currentState.loginError.Incorrect_details ? (
                <small className="color-red">
                  {currentState.loginError.Incorrect_details}
                </small>
              ) : (
                ""
              )}
              {currentState.loginError && currentState.loginError.No_record ? (
                <small className="color-red">
                  {currentState.loginError.No_record}
                </small>
              ) : (
                ""
              )}
            </div>
            <FormGroup className="px-4 pb-4">
              <Label htmlFor="email" className="text-sm block font-bold  pb-2">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "
                placeholder="monica@example.com"
              />
              {currentState.loginError &&
              currentState.loginError.Required_email ? (
                <small className="color-red">
                  {currentState.loginError.Required_email}
                </small>
              ) : (
                ""
              )}
              {currentState.loginError &&
              currentState.loginError.Invalid_email ? (
                <small className="color-red">
                  {currentState.loginError.Invalid_email}
                </small>
              ) : (
                ""
              )}
            </FormGroup>
            <FormGroup className="px-4 pb-4">
              <Label
                htmlFor="password"
                className="text-sm block font-bold pb-2"
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                placeholder="May we have your password?"
              />
              {currentState.loginError &&
              currentState.loginError.Required_password ? (
                <small className="color-red">
                  {currentState.loginError.Required_password}
                </small>
              ) : (
                ""
              )}
              {currentState.loginError &&
              currentState.loginError.Invalid_password ? (
                <small className="color-red">
                  {currentState.loginError.Invalid_password}
                </small>
              ) : (
                ""
              )}
              {currentState.loginError &&
              currentState.loginError.Incorrect_password ? (
                <small className="color-red">
                  {currentState.loginError.Incorrect_password}
                </small>
              ) : (
                ""
              )}
            </FormGroup>

            {currentState.isLoading ? (
              <div className="px-4 pb-4">
                <Button color="primary" type="submit" block disabled>
                  Login...
                </Button>
              </div>
            ) : (
              <div className="px-4 pb-4">
                <Button
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  block
                  disabled={user.email === "" || user.password === ""}
                >
                  Login
                </Button>
              </div>
            )}
          </form>
          <div
            className="px-4 pb-4"
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#48A9FF",
            }}
          >
            <div>
              <small>
                <Link to="/signup">Sign Up</Link>
              </small>
            </div>
            <div>
              <small>
                <Link to="/reset">Forgot Password?</Link>
              </small>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
