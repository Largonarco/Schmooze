import { Flex, Heading, Text, Button } from "@chakra-ui/react";

const Sidebar = ({ tags }) => {
  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      flex={1}
      direction="column"
      gap="1em"
    >
      <Heading size="md" textColor="white">
        Tags
      </Heading>

      {tags.map((tag) => (
        <Button
          _hover={{ bgColor: "gray.700" }}
          _active={{ bgColor: "gray.700" }}
          variant="outline"
          colorScheme="purple"
        >
          <Text fontSize="md">#{tag}</Text>
        </Button>
      ))}
    </Flex>
  );
};

export default Sidebar;
