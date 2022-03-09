import { Flex, Heading, Text, Button } from "@chakra-ui/react";

const HomeSidebar = ({ tags, display }) => {
  return (
    <Flex display={display} flex={1} direction="column" gap="1em">
      <Heading fontSize="lg" textColor="brand.50">
        Tags
      </Heading>

      {tags.map((tag, index) => (
        <Button
          key={index}
          _hover={{ bgColor: "brand.700" }}
          _active={{ bgColor: "brand.700" }}
          variant="outline"
          colorScheme="brand"
        >
          <Text fontSize="md">#{tag}</Text>
        </Button>
      ))}
    </Flex>
  );
};

export default HomeSidebar;
