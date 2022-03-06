import UserDropdown from "../UserActions/UserDropdown";
import GuestDropdown from "../GuestActions/GuestDropdown";

import { Heading, Flex } from "@chakra-ui/react";

const UserNavbar = ({ primaryUser }) => {
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
      <Heading as="h1" size="lg" fontWeight="bold" textColor="white">
        Schmooze
      </Heading>

      {primaryUser ? <UserDropdown primaryUser={primaryUser} /> : <GuestDropdown />}
    </Flex>
  );
};

export default UserNavbar;
