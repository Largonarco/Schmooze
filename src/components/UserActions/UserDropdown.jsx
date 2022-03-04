import React from "react";
import Logout from "../Auth/Logout";
import CreatePost from "./CreatePost";

import { Menu, MenuList, MenuButton, MenuItem, Avatar } from "@chakra-ui/react";

const UserDropdown = ({ user }) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={user.username} />
      </MenuButton>
      <MenuList bgColor="gray.700">
        <CreatePost user={user} />
        <Logout user={user} />
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;
