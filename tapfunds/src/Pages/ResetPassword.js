import React, { useState } from "react";
import {
  Label,
  Input,
  FormGroup,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { ResetPassword } from "../store/modules/auth/actions/authAction";
import Message from "../Components/Message/Message";

const PasswordReset = (props) => {
  const currentState = useSelector((state) => state.Auth);

  const [resetDetails, setResetDetails] = useState({
    token: props.match.params.token,
    new_password: "",
    retype_password: "",
  });

  const dispatch = useDispatch();

  const resetPass = (details) => dispatch(ResetPassword(details, clearInput));

  const [showLogin, setShowLogin] = useState(false);

  const clearInput = () => {
    setShowLogin(true);
    setResetDetails({
      token: "",
      new_password: "",
      retype_password: "",
    });
  };

  const handleChange = (e) => {
    setResetDetails({
      ...resetDetails,
      [e.target.name]: e.target.value,
    });
  };

  const submitRequest = (e) => {
    e.preventDefault();
    resetPass({
      token: resetDetails.token,
      new_password: resetDetails.new_password,
      retype_password: resetDetails.retype_password,
    });
  };

  if (currentState.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="App h-screen w-full flex justify-center items-center bg-purple-50">
      <Card className="w-full max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
        <CardHeader className="px-4 pb-4">Reset Password</CardHeader>
        <CardBody>
          <FormGroup className="px-4 pb-4">
            {currentState.successMessage != null &&
            currentState.resetError == null ? (
              <span>
                <Message msg={currentState.successMessage} />
              </span>
            ) : (
              ""
            )}
          </FormGroup>
          <FormGroup className="px-4 pb-4">
            {currentState.resetError &&
            currentState.resetError.Invalid_token ? (
              <span>
                <small className="color-red">
                  {currentState.resetError.Invalid_token}
                </small>
                <small className="ml-2">
                  <Link to="/forgotpassword">here </Link>
                </small>
              </span>
            ) : (
              ""
            )}
            {currentState.resetError &&
            currentState.resetError.Empty_passwords ? (
              <small className="color-red">
                {currentState.resetError.Empty_passwords}
              </small>
            ) : (
              ""
            )}
            {currentState.resetError &&
            currentState.resetError.Invalid_Passwords ? (
              <small className="color-red">
                {currentState.resetError.Invalid_Passwords}
              </small>
            ) : (
              ""
            )}
            {currentState.resetError &&
            currentState.resetError.Password_unequal ? (
              <small className="color-red">
                {currentState.resetError.Password_unequal}
              </small>
            ) : (
              ""
            )}
          </FormGroup>

          {showLogin ? (
            <a href="/login" className="btn btn-primary form-control">
              Login
            </a>
          ) : (
            <form onSubmit={submitRequest}>
              <FormGroup className="px-4 pb-4">
                <Label
                  htmlFor="newpassword"
                  className="text-sm block font-bold pb-2"
                >
                  New Password
                </Label>
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  type="password"
                  name="new_password"
                  value={resetDetails.new_password}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="px-4 pb-4">
                <Label
                  htmlFor="checkpassword"
                  className="text-sm block font-bold pb-2"
                >
                  Retype Password
                </Label>
                <Input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                  type="password"
                  name="retype_password"
                  value={resetDetails.retype_password}
                  onChange={handleChange}
                />
              </FormGroup>
              {currentState.isLoading ? (
                <div className="px-4 pb-4">
                  <Button color="primary" type="submit" block disabled>
                    Reseting...
                  </Button>
                </div>
              ) : (
                <div className="px-4 pb-4">
                  <Button
                    color="primary"
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    block
                    disabled={
                      resetDetails.new_password === "" ||
                      resetDetails.retype_password === ""
                    }
                  >
                    Save Password
                  </Button>
                </div>
              )}
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PasswordReset;
