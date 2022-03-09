import UserDropdown from "../UserActions/UserDropdown";
import GuestDropdown from "../GuestActions/GuestDropdown";
import HomeSidebar from "./Sidebar";

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

const HomeNavbar = ({ primaryUser, tags }) => {
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
      bgColor="brand.800"
      borderBottom="1px"
      borderColor="brand.400"
    >
      <Button display={{ lg: "none" }} onClick={onOpen}>
        <FiMenu />
      </Button>

      <Heading fontSize="3xl" textColor="whiteAlpha.800">
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

      {primaryUser ? (
        <UserDropdown primaryUser={primaryUser} />
      ) : (
        <GuestDropdown />
      )}
    </Flex>
  );
};

export default HomeNavbar;
