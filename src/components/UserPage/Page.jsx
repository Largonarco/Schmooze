import moment from "moment";
import Link from "next/link";
import { db } from "../../../config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

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
  Button,
} from "@chakra-ui/react";

const UserPage = ({ primaryUser, secondaryUser, secondaryUserPosts }) => {
  const onFollow = async () => {
    await updateDoc(doc(db, "users", secondaryUser.username), {
      followers: arrayUnion(primaryUser.username),
    });
    await updateDoc(doc(db, "users", primaryUser.username), {
      following: arrayUnion(secondaryUser.username),
    });
  };

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
        bgColor="brand.800"
        borderWidth={1}
        borderColor="brand.400"
        borderRadius="0.5em"
      >
        <Avatar size="lg" name={secondaryUser.username} />
        <Heading fontSize="2xl" textColor="brand.50">
          {secondaryUser.username}
        </Heading>

        <HStack spacing="3em">
          <Text color="brand.200">{secondaryUser.posts.length} posts</Text>
          <Text color="brand.200">
            {secondaryUser.followers.length} followers
          </Text>
          <Text color="brand.200">
            {secondaryUser.following.length} following
          </Text>
        </HStack>

        <Button variant="solid" colorScheme="brand" onClick={onFollow}>
          Follow
        </Button>
      </Flex>

      <Flex direction="column" gap="1em">
        {secondaryUserPosts.map((post, index) => (
          <Link key={index} href={`/post/${post.id}`}>
            <Flex
              p="1em"
              gap="0.5em"
              bgColor="brand.800"
              borderWidth={1}
              borderColor="brand.400"
              borderRadius="0.5em"
            >
              <Avatar size="sm" name={post.author} alt={post.author} />

              <Flex width="100%" direction="column" gap="0.5em">
                <HStack justify="space-between" align="center">
                  <HStack spacing="0.5em">
                    <VStack align="start" spacing={0} fontSize="sm">
                      <Text fontWeight="semibold" textColor="brand.200">
                        {post.author}
                      </Text>
                      <Text textColor="brand.200">{moment.unix(post.createdAt).fromNow()}</Text>
                    </VStack>
                  </HStack>
                </HStack>

                <Heading textColor="brand.50" fontSize="xl">
                  {post.title}
                </Heading>

                <HStack spacing="1em">
                  <Tag
                    size="md"
                    gap="0.5em"
                    bgColor="brand.400"
                    variant="subtle"
                  >
                    <AiOutlineHeart fill="pink" size={18} />
                    <Text textColor="brand.200">{post.likes} </Text>
                  </Tag>
                  <Tag
                    size="md"
                    gap="0.5em"
                    bgColor="brand.400"
                    variant="subtle"
                  >
                    <AiOutlineComment fill="green" size={18} />
                    <Text textColor="brand.200">{post.comments.length} </Text>
                  </Tag>
                </HStack>
              </Flex>

              <Badge height="max-content" variant="outline" colorScheme="brand">
                #{post.tag}
              </Badge>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default UserPage;
