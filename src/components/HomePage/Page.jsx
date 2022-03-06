import HomeSidebar from "./Sidebar";
import PostFeed from "./PostFeed/Feed";

import { Flex, Text } from "@chakra-ui/react";

const HomePage = ({ tags, posts, error }) => {
  return (
    <Flex
      minH="100vh"
      mt="10vh"
      px={{ base: "1em", lg: "15vw" }}
      py="2em"
      gap="2em"
    >
      <HomeSidebar display={{ base: "none", lg: "flex" }} tags={tags} />

      {!error ? (
        <PostFeed posts={posts} />
      ) : (
        <Text fontSize="md" fontWeight="semibold">
          Couldn't fetch posts
        </Text>
      )}
    </Flex>
  );
};

export default HomePage;
