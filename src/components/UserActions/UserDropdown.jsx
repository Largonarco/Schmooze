import Logout from "./Logout";
import CreatePost from "./CreatePost";

import { Menu, MenuList, MenuButton, Avatar } from "@chakra-ui/react";

const UserDropdown = ({ user }) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={user.username} />
      </MenuButton>
      <MenuList bgColor="gray.700">
        <CreatePost user={user} />
        <Logout />
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;
