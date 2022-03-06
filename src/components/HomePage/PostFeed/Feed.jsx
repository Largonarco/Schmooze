import PostCard from "./Post/PostCard";
import PostSkeletonCard from "./Post/PostSkeletonCard";

import { Flex, Heading } from "@chakra-ui/react";

const PostFeed = ({ posts }) => {
  return (
    <Flex
      direction="column"
      flex={{ base: 1, lg: 4 }}
      gap="1em"
      overflowY="auto"
    >
      <Heading as="h2" fontSize="lg" textColor="white">
        Posts
      </Heading>

      {posts.length != 0 ? (
        posts.map((post, index) => <PostCard post={post} index={index} />)
      ) : (
        <>
          <PostSkeletonCard />
          <PostSkeletonCard />
          <PostSkeletonCard />
          <PostSkeletonCard />
        </>
      )}
    </Flex>
  );
};

export default PostFeed;
