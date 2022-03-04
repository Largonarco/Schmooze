import UserDropdown from "./UserActions/UserDropdown";
import Sidebar from "./Sidebar";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
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

const Navbar = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginToggle, setLoginToggle] = useState(false);
  const [signUpToggle, setSignUpToggle] = useState(false);

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
            <Sidebar user={user} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <HStack spacing="1em">
        {user && !loginToggle && !signUpToggle ? (
          <UserDropdown user={user} />
        ) : (
          <>
            <Login toggle={signUpToggle} setToggle={setSignUpToggle} />
            <SignUp toggle={loginToggle} setToggle={setLoginToggle} />
          </>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;
