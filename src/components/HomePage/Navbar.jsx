import UserDropdown from "../UserActions/UserDropdown";
import GuestDropdown from "../GuestActions/GuestDropdown";
import HomeSidebar from "./Sidebar";
import { useState } from "react";

import { FiMenu } from "react-icons/fi";
import {
  useDisclosure,
  HStack,
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

const HomeNavbar = ({ user, tags }) => {
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
            <HomeSidebar display={{ base: "flex", lg: "none" }} tags={tags} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {user ? <UserDropdown user={user} /> : <GuestDropdown />}
    </Flex>
  );
};

export default HomeNavbar;
