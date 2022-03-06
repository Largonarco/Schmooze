import { Flex, HStack, Avatar, Heading, Text } from "@chakra-ui/react";

const PostSidebar = ({ display, postAuthor }) => {
  return (
    <Flex display={display} flex={1}>
      <Flex
        width="100%"
        height="max-content"
        p="1em"
        direction="column"
        align="center"
        gap="1em"
        bgColor="gray.800"
        boxShadow="xl"
        rounded="md"
      >
        <Avatar size="lg" name={postAuthor.username} />

        <Heading as="h3" fontSize="xl" textColor="white">
          {postAuthor.username}
        </Heading>

        <HStack>
          <Text> {postAuthor.followers.length} followers</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default PostSidebar;
