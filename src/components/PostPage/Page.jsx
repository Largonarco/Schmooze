import PostSidebar from "./Sidebar";
import PostDisplay from "./PostDisplay";

import { Flex } from "@chakra-ui/react";

const PostPage = ({ primaryUser, post, postAuthor }) => {
  return (
    <Flex
      minH="100vh"
      mt="10vh"
      px={{ base: "1em", lg: "15vw" }}
      py="2em"
      gap="1em"
    >
      <PostSidebar
        display={{ base: "none", lg: "flex" }}
        postAuthor={postAuthor}
      />
      <PostDisplay primaryUser={primaryUser} post={post} />
    </Flex>
  );
};

export default PostPage;
