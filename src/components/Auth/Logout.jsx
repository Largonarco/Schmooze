import { signOut } from "firebase/auth";
import { auth } from "../../../config";

import { MenuItem } from "@chakra-ui/react";

const Logout = () => {
  const logout = (e) => {
    e.preventDefault();

    signOut(auth);
  };

  return (
    <MenuItem
      bgColor="gray.700"
      textColor="white"
      _hover={{ bgColor: "gray.800" }}
      _focus={{ bgColor: "gray.700" }}
      onClick={(e) => logout(e)}
    >
      Log out
    </MenuItem>
  );
};

export default Logout;
