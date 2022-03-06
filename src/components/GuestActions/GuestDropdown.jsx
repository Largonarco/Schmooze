import SignUp from "./SignUp";
import Login from "./Login";

import { Menu, MenuList, MenuButton } from "@chakra-ui/react";

const GuestDropdown = () => {
  return (
    <Menu>
      <MenuButton>Become a user</MenuButton>
      <MenuList bgColor="gray.700">
        <Login />
        <SignUp />
      </MenuList>
    </Menu>
  );
};

export default GuestDropdown;
