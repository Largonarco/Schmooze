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
      <Heading fontSize="lg" textColor="brand.50">
        Posts
      </Heading>

      {posts.length != 0 ? (
        posts.map((post, index) => <PostCard post={post} key={index} />)
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
