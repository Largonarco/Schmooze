import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

const Navbar = ({ onOpen }) => {
  return (
    <Flex
      px="1em"
      gap="1em"
      height="10vh"
      direction="row"
      alignItems="center"
      bgColor="gray.700"
      borderRadius="0.5em"
    >
      <IconButton
        display={{ lg: "none" }}
        icon={<FiMenu />}
        size="md"
        onClick={onOpen}
        aria-label="Menu"
      />

      <Text as="h1" fontSize="2em" fontWeight={800} textColor="white">
        Schmooze
      </Text>
    </Flex>
  );
};

export default Navbar;
