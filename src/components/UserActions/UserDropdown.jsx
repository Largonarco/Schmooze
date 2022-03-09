import Link from "next/link";
import Logout from "./Logout";
import CreatePost from "./CreatePost";

import { Menu, MenuList, MenuButton, MenuItem, Avatar } from "@chakra-ui/react";

const UserDropdown = ({ primaryUser }) => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="md" name={primaryUser.username} />
      </MenuButton>
      <MenuList bgColor="gray.700">
        <MenuItem
          bgColor="gray.700"
          textColor="white"
          _hover={{ bgColor: "gray.800" }}
          _focus={{ bgColor: "gray.700" }}
        >
          <Link href={`/user/${primaryUser.username}`}> User details</Link>
        </MenuItem>
        <CreatePost primaryUser={primaryUser} />
        <Logout />
      </MenuList>
    </Menu>
  );
};

export default UserDropdown;
