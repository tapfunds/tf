import React, { useState } from "react";
import { Label, FormGroup, Card, CardHeader, CardBody } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { ForgotPassword } from "../store/modules/auth/actions/authAction";
import Message from "../Components/Message/Message";

const PasswordForgot = () => {
  const currentState = useSelector((state) => state.Auth);

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const forgotPass = (userEmail) =>
    dispatch(ForgotPassword(userEmail, clearInput));

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const clearInput = () => {
    setEmail("");
  };

  const submitRequest = (e) => {
    e.preventDefault();
    forgotPass({
      email,
    });
  };

  if (currentState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-blue-50">
      <Card className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
        <CardHeader className="px-4 pb-4">Forgot Password</CardHeader>
        <CardBody>
          <FormGroup className="px-4 pb-4">
            {currentState.successMessage != null &&
            currentState.forgotError == null ? (
              <span>
                <Message msg={currentState.successMessage} />
              </span>
            ) : (
              ""
            )}
          </FormGroup>

          <form onSubmit={submitRequest}>
            <FormGroup className="px-4 pb-4">
              <Label
                htmlFor="email"
                className="text-sm block font-bold pb-2"
              >
                Email
              </Label>
              <input
                type="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                data-test="inputEmail"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
              />
              {currentState.forgotError &&
              currentState.forgotError.Required_email ? (
                <small className="color-red">
                  {currentState.forgotError.Required_email}
                </small>
              ) : (
                ""
              )}
              {currentState.forgotError && currentState.forgotError.No_email ? (
                <small className="color-red">
                  {currentState.forgotError.No_email}
                </small>
              ) : (
                ""
              )}
              {currentState.forgotError &&
              currentState.forgotError.Invalid_email ? (
                <small className="color-red">
                  {currentState.forgotError.Invalid_email}
                </small>
              ) : (
                ""
              )}
            </FormGroup>

            {currentState.isLoading ? (
              <div className="px-4 pb-4">
                <button
                  className="btn btn-primary w-100"
                  color="primary"
                  type="submit"
                  disabled
                >
                  Sending Request...
                </button>
              </div>
            ) : (
              <div className="px-4 pb-4">
                <button
                  data-test="resetButton"
                  className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  color="primary"
                  type="submit"
                  disabled={email === ""}
                >
                  Reset Password
                </button>
              </div>
            )}
          </form>
          <div
            className="px-4 pb-4"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <small>
                <Link to="/signup">Sign Up</Link>
              </small>
            </div>
            <div>
              <small>
                <Link to="/login">Login</Link>
              </small>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PasswordForgot;
