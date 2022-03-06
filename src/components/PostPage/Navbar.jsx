import UserDropdown from "../UserActions/UserDropdown";
import GuestDropdown from "../GuestActions/GuestDropdown";
import PostSidebar from "./Sidebar";

import { FiMenu } from "react-icons/fi";
import {
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";

const PostNavbar = ({ primaryUser, postAuthor }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      height="10vh"
      width="100%"
      px={{ base: "1em", lg: "15vw" }}
      position="fixed"
      zIndex={50}
      justify="space-between"
      align="center"
      bgColor="gray.800"
      borderBottom="1px"
      borderColor="purple.900"
    >
      <Button display={{ lg: "none" }} onClick={onOpen}>
        <FiMenu />
      </Button>

      <Heading as="h1" size="lg" fontWeight="bold" textColor="white">
        Schmooze
      </Heading>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bgColor="gray.700">
          <DrawerCloseButton color="white" />
          <DrawerHeader textColor="white">Schmooze</DrawerHeader>
          <DrawerBody>
            <PostSidebar
              display={{ base: "flex", lg: "none" }}
              postAuthor={postAuthor}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {primaryUser ? <UserDropdown primaryUser={primaryUser} /> : <GuestDropdown />}
    </Flex>
  );
};

export default PostNavbar;
