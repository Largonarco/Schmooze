import { Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { BiLike, BiCommentDetail, BiPencil } from "react-icons/bi";

const Posts = ({ posts }) => {
  return (
    <Flex flex={{ base: 1, lg: 4 }} direction="column" overflowY="auto">
      {posts.map((post, index) => (
        <Flex p="0.5em" direction="column" key={index} gap="0.5em" bgColor="gray.600" borderRadius="0.5em">
          <Text as="h3" fontSize="2em" fontWeight={800} textColor="white">
            {post.title}
          </Text>
          <Text as="p" fontSize="1.2em" textColor="white">
            {post.body}
          </Text>
          <HStack justify="space-between">
            <HStack>
              <BiLike fill="white" size={22} />
              <Text fontSize="1em" textColor="white">
                {post.likes}
              </Text>
            </HStack>
            <HStack>
              <BiCommentDetail fill="white" size={22} />
              <Text fontSize="1em" textColor="white">
                {post.comments.length}
              </Text>
            </HStack>
            <HStack>
              <BiPencil fill="white" size={22} />
              <Text fontSize="1em" textColor="white">
                {post.author}
              </Text>
            </HStack>
          </HStack>
        </Flex>
      ))}
    </Flex>
  );
};

export default Posts;
