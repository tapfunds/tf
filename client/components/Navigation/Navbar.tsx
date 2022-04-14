import { useState } from "react";
import { Dropdown } from "antd";

import SignedInNav from "./SignedInNav";
import SignedOutNav from "./SignedOutNav";

const Navbar = () => {
  const [authState, setAuthState] = useState(false);

  return <div>{authState ? <SignedInNav /> : <SignedOutNav />}</div>;
};

export default Navbar;
