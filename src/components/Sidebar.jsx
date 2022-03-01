import UserActions from "./UserActions";
import Login from "./Login";
import SignUp from "./SignUp";
import { useState } from "react";

import { Flex } from "@chakra-ui/react";

const Sidebar = ({ user }) => {
  const [loginToggle, setLoginToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);

  return (
    <Flex direction="column" gap="1em">
      {user && !loginToggle && !signUpToggle ? (
        <UserActions user={user} />
      ) : (
        <>
          <SignUp toggle={loginToggle} setToggle={setLoginToggle} />
          <Login toggle={signUpToggle} setToggle={setSignUpToggle} />
        </>
      )}
    </Flex>
  );
};

export default Sidebar;
