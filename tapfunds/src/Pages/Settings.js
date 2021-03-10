import React, { useState, Fragment } from "react";
// import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Message from "../Components/Message/Message";
import {
  Label,
  Input,
  FormGroup,
  Button,
  CardBody,
  Col,
  Row,
  Form,
  CustomInput,
  CardHeader,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import {
  updateUserAvatar,
  updateUser,
  deleteUser,
  SignOut,
} from "../store/modules/auth/actions/authAction";
import { StyleSheet, css } from "aphrodite";
const styles = StyleSheet.create({

  body: {

    minHeight: "130vh",
    background: "#FFFBEB",
    padding:"10%"

  }
});
const Settings = () => {
  const [modal, setModal] = useState(false);

  const toggle = (e) => {
    setModal(!modal);
  };

  const currentUserState = useSelector((state) => state.Auth);

  const AuthID = currentUserState.currentUser
    ? currentUserState.currentUser.id
    : "";

  const dispatch = useDispatch();
  const logoutUser = () => dispatch(SignOut());
  const userAvatarUpdate = (userDetails) =>
    dispatch(updateUserAvatar(userDetails));
  const userUpdate = (userDetails) =>
    dispatch(updateUser(userDetails, clearInput));
  const deleteAccount = (id) => dispatch(deleteUser(id));

  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState();
  const [user, setUser] = useState({
    email: currentUserState.currentUser.email,
    current_password: "",
    new_password: "",
  });

  const clearInput = () => {
    setUser({
      ...user,
      current_password: "",
      new_password: "",
    });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let thefile = e.target.files[0];

    reader.onloadend = () => {
      setFile(thefile);
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(thefile);
  };

  let imagePreview = null;
  if (currentUserState.currentUser.avatar_path && !uploadedFile) {
    imagePreview = (
      <img
        className="img_style"
        src={currentUserState.currentUser.avatar_path}
        alt="profile"
      />
    );
  } else if (uploadedFile) {
    imagePreview = (
      <img className="img_style" src={uploadedFile} alt="profile" />
    );
  } else {
    imagePreview = <img className="img_style" src={"Default"} alt="profile" />;
  }

  //incase someone visits the route manually
  if (!currentUserState.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const submitUserAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    userAvatarUpdate(formData);
  };

  const submitUser = (e) => {
    e.preventDefault();
    userUpdate({
      email: user.email,
      current_password: user.current_password,
      new_password: user.new_password,
    });
  };

  const shutDown = (e) => {
    e.preventDefault();
    deleteAccount(AuthID);
  };

  const logout = (e) => {
    e.preventDefault();
    logoutUser();
  };
  return (
    <div className={css(styles.body)}>
      <div  class="App h-screen w-full flex justify-center  bg-yellow-50">
        <div className=" max-w-md bg-white shadow-md rounded px-8 py-8 pt-8">
            <div className="text-center">
              <CardHeader className="px-4 pb-4 text-lg block font-bold pb-2">
                Update Profile
              </CardHeader>
            </div>
            <Row className="mt-1">
              <Col>
                <FormGroup className="px-4 pb-4">
                  {currentUserState.authSuccessImage != null &&
                  currentUserState.avatarError == null ? (
                    <Message msg={currentUserState.authSuccessImage} />
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
            </Row>
            <CardBody>
              <div className="text-center mb-3">{imagePreview}</div>
              <Form onSubmit={submitUserAvatar} encType="multipart/form-data">
                <div>
                  <FormGroup className="px-4 pb-4">
                    <CustomInput
                      type="file"
                      accept="image/*"
                      id="exampleCustomFileBrowser"
                      onChange={(e) => handleImageChange(e)}
                    />
                    {currentUserState.avatarError &&
                    currentUserState.avatarError.Too_large ? (
                      <small className="color-red">
                        {currentUserState.avatarError.Too_large}
                      </small>
                    ) : (
                      ""
                    )}
                    {currentUserState.avatarError &&
                    currentUserState.avatarError.Not_Image ? (
                      <small className="color-red">
                        {currentUserState.avatarError.Not_Image}
                      </small>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                </div>
                {currentUserState.isLoadingAvatar ? (
                  <Button
                    className="bg-blue-100 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    color="primary"
                    type="submit"
                    disabled
                  >
                    Updating...
                  </Button>
                ) : (
                  <Button
                    className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    color="primary"
                    type="submit"
                    disabled={uploadedFile == null || file == null}
                  >
                    Update Photo
                  </Button>
                )}
              </Form>
              <Row>
                <Col className="px-4 pb-4" sm="12" md={{ size: 10, offset: 1 }}>
                  <Label 
                className="text-sm block font-bold pb-2 text-xl"

                  style={{ margin: "10px 0px 10px" }}>
                    Username:{" "}
                    <strong >{currentUserState.currentUser.username}</strong>
                  </Label>
                </Col>
              </Row>

              <Form onSubmit={submitUser}>
                <Row>
                  <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <FormGroup className="px-4 pb-4">
                      <Label className="text-sm block font-bold pb-2" for="exampleAddress">Email:{" "}</Label>
                      <Input
                        type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"

                        name="email"
                        value={user.email}
                        onChange={handleChange}
                      />
                      {currentUserState.userError &&
                      currentUserState.userError.Required_email ? (
                        <small className="color-red">
                          {currentUserState.userError.Required_email}
                        </small>
                      ) : (
                        ""
                      )}
                      {currentUserState.userError &&
                      currentUserState.userError.Invalid_email ? (
                        <small className="color-red">
                          {currentUserState.userError.Invalid_email}
                        </small>
                      ) : (
                        ""
                      )}
                      {currentUserState.userError &&
                      currentUserState.userError.Taken_email ? (
                        <small className="color-red">
                          {currentUserState.userError.Taken_email}
                        </small>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <FormGroup className="px-4 pb-4">
                      <Label
                        className="text-sm block font-bold pb-2"
                        for="exampleAddress"
                      >
                        Current Password
                      </Label>
                      <Input
                        type="password"
                        name="current_password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                        value={user.current_password}
                        onChange={handleChange}
                      />
                      {currentUserState.userError &&
                      currentUserState.userError.Password_mismatch ? (
                        <small className="color-red">
                          {currentUserState.userError.Password_mismatch}
                        </small>
                      ) : (
                        ""
                      )}
                      {currentUserState.userError &&
                      currentUserState.userError.Empty_current ? (
                        <small className="color-red">
                          {currentUserState.userError.Empty_current}
                        </small>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <FormGroup className="px-4 pb-4">
                      <Label
                        className="text-sm block font-bold pb-2"
                        for="exampleAddress"
                      >
                        New Password
                      </Label>
                      <Input
                        type="password"
                        name="new_password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                        value={user.new_password}
                        onChange={handleChange}
                      />
                      {currentUserState.userError &&
                      currentUserState.userError.Invalid_password ? (
                        <small className="color-red">
                          {currentUserState.userError.Invalid_password}
                        </small>
                      ) : (
                        ""
                      )}
                      {currentUserState.userError &&
                      currentUserState.userError.Empty_new ? (
                        <small className="color-red">
                          {currentUserState.userError.Empty_new}
                        </small>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row >
                  <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <FormGroup className="px-4 pb-4">
                      {currentUserState.isUpdatingUser ? (
                        <Button color="primary" type="submit" block disabled>
                          Updating...
                        </Button>
                      ) : (
                        <Button
                          className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          color="primary"
                          type="submit"
                          block
                        >
                          Update
                        </Button>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row >
                  <Col sm="12" md={{ size: 10, offset: 1 }}>
                    <FormGroup className="px-4 pb-4">
                      {currentUserState.authSuccessUser != null &&
                      currentUserState.userError == null ? (
                        <Message msg={currentUserState.authSuccessUser} />
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </Row>

              </Form>

              <Row >
                  <FormGroup className="px-4 pb-4">
                    <Button
                      className="bg-yellow-400 hover:bg-yellow-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={logout}
                      color="danger"
                      type="submit"
                      block
                    >
                      Logout
                    </Button>
                  </FormGroup>
              </Row>

              <Row >
                  <FormGroup className="px-4 pb-4">
                    <Button
                      onClick={toggle}
                      className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                      block
                    >
                      Deactivate Account
                    </Button>
                  </FormGroup>
              </Row>
            </CardBody>

            {/* <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} className="text-center">
                Are you sure you want to delete your account?
              </ModalHeader>
              <ModalBody toggle={toggle} className="text-center">
                This will also delete your posts, likes and comments if you
                created any.
              </ModalBody>
              <ModalFooter>
                {currentUserState.isLoading ? (
                  <button className="btn btn-danger" disabled>
                    Deleting...
                  </button>
                ) : (
                  <button
                    className="btn btn-danger"
                    onClick={shutDown}
                    type="submit"
                  >
                    Delete
                  </button>
                )}
                <Button color="warning" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal> */}
          </div>
        </div>
    </div>
  );
};

export default Settings;
