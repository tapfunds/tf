import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import { useSelector } from "react-redux";
import "./Nav.css";
import { StyleSheet, css } from "aphrodite";

import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const styles = StyleSheet.create({
  subtext: {
    color: "#48A9FF",
    // padding: "10px",
    // width: "360px",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentState = useSelector((state) => state);

  const { isAuthenticated } = currentState.Auth;

  const SignedInLinks = (
    <React.Fragment>
      <NavItem style={{ marginRight: "20px", color: "#48A9FF" }}>
        <NavLink className={css(styles.subtext)} href={ROUTES.STATS}>
          Money
        </NavLink>
      </NavItem>

      <NavItem style={{ color: "#48A9FF" }}>
        <NavLink className={css(styles.subtext)} href={ROUTES.AUTH}>
          Connect Account
        </NavLink>
      </NavItem>

      <NavItem style={{ color: "#48A9FF" }}>
        <NavLink className={css(styles.subtext)} href={ROUTES.SETTING}>
          Settings
        </NavLink>
      </NavItem>
    </React.Fragment>
  );

  const SignedOutLinks = (
    <React.Fragment>
      <NavItem style={{ marginRight: "20px", color: "#48A9FF" }}>
        <NavLink className={css(styles.subtext)} href={ROUTES.SIGN_IN}>
          Login
        </NavLink>
      </NavItem>
      <NavItem style={{ color: "#48A9FF" }}>
        <NavLink className={css(styles.subtext)} href={ROUTES.SIGN_UP}>
          Signup
        </NavLink>
      </NavItem>
    </React.Fragment>
  );

  return (
    <div className="mb-3">
      <Navbar color="white" light expand="md">
        <NavbarBrand className="mx-auto" href="/">
          <img src="./logo2.svg" alt="tapfunds logo go boom" />
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? SignedInLinks : SignedOutLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
