import Link from "next/link";

import { Flex, HStack, VStack, Avatar, Heading, Text } from "@chakra-ui/react";
import { BsPeople, BsPencil } from "react-icons/bs";

const PostSidebar = ({ display, postAuthor }) => {
  return (
    <Flex display={display}  flex={1} direction="column" gap="1em">
      <Heading fontSize="lg" textColor="brand.50">
        Post author
      </Heading>

      <Flex
        width="100%"
        height="max-content"
        p="1em"
        direction="column"
        align="center"
        gap="1em"
        bgColor="brand.800"
        boxShadow="xl"
        rounded="md"
      >
        <Avatar size="lg" name={postAuthor.username} />

        <Link href={`/user/${postAuthor.username}`}>
          <Heading fontSize="xl" textColor="brand.50" cursor="pointer">
            {postAuthor.username}
          </Heading>
        </Link>

        <HStack>
          <BsPeople fill="white" size={18} />
          <Text textColor="brand.200">
            {postAuthor.followers.length} followers
          </Text>
        </HStack>

        <HStack>
          <BsPencil fill="white" size={18} />
          <Text textColor="brand.200">{postAuthor.posts.length} posts</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default PostSidebar;
