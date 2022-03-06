import { Flex, HStack, VStack, Avatar, Heading, Text } from "@chakra-ui/react";
import { BsPeople, BsPencil } from "react-icons/bs";

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
          <BsPeople fill="white" size={18} />
          <Text textColor="gray.600">
            {postAuthor.followers.length} followers
          </Text>
        </HStack>

        <HStack>
          <BsPencil fill="white" size={18} />
          <Text textColor="gray.600">{postAuthor.posts.length} posts</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default PostSidebar;
