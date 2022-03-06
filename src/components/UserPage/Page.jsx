import Link from "next/link"
import moment from "moment";

import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import {
  Flex,
  HStack,
  VStack,
  Avatar,
  Heading,
  Text,
  Tag,
  Badge,
} from "@chakra-ui/react";

const UserPage = ({ secondaryUser, secondaryUserPosts }) => {
  return (
    <Flex
      minH="100vh"
      mt="10vh"
      py="2em"
      px={{ base: "1em", lg: "15vw" }}
      direction="column"
      gap="2em"
    >
      <Flex
        p="1em"
        direction="column"
        gap="1em"
        align="center"
        bgColor="gray.800"
      >
        <Avatar name={secondaryUser.username} />
        <Heading fontSize="2xl" textColor="white">
          {secondaryUser.username}
        </Heading>

        <HStack spacing="3em">
          <Text color="gray.500">{secondaryUser.posts.length} posts</Text>
          <Text color="gray.500">
            {secondaryUser.followers.length} followers
          </Text>
          <Text color="gray.500">
            {secondaryUser.following.length} following
          </Text>
        </HStack>
      </Flex>

      {secondaryUserPosts.map((post, index) => (
        <Link key={index} href={`/post/${post.id}`}>
          <Flex
            p="1em"
            gap="0.5em"
            bgColor="gray.800"
            boxShadow="xl"
            rounded="md"
          >
            <Avatar size="sm" name={post.author} alt={post.author} />

            <Flex width="100%" direction="column" gap="1em">
              <HStack justify="space-between" align="center">
                <HStack spacing="0.5em">
                  <VStack align="start" spacing={0} fontSize="sm">
                    <Text fontWeight="semibold" textColor="gray.500">
                      {post.author}
                    </Text>
                    <Text textColor="gray.500">
                      {post.createdAt}
                    </Text>
                  </VStack>
                </HStack>
              </HStack>

              <Heading textColor="white" fontSize="xl">
                {post.title}
              </Heading>

              <HStack spacing="1em">
                <Tag
                  size="md"
                  gap="0.5em"
                  bgColor="purple.900"
                  variant="subtle"
                >
                  <AiOutlineHeart fill="pink" size={18} />
                  <Text textColor="gray.500">{post.likes} </Text>
                </Tag>
                <Tag
                  size="md"
                  gap="0.5em"
                  bgColor="purple.900"
                  variant="subtle"
                >
                  <AiOutlineComment fill="green" size={18} />
                  <Text textColor="gray.500">{post.comments.length} </Text>
                </Tag>
              </HStack>
            </Flex>

            <Badge height="max-content" variant="outline" colorScheme="purple">
              #{post.tag}
            </Badge>
          </Flex>
        </Link>
      ))}
    </Flex>
  );
};

export default UserPage;
