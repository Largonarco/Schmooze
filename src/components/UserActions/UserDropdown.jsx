import Logout from "./Logout";
import CreatePost from "./CreatePost";

import { Menu, MenuList, MenuButton, Avatar } from "@chakra-ui/react";

const UserDropdown = ({ primaryUser }) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={primaryUser.username} />
      </MenuButton>
      <MenuList bgColor="gray.700">
        <CreatePost primaryUser={primaryUser} />
        <Logout />
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;
