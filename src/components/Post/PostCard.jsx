import Link from "next/link";
import Image from "next/image";

import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import {
  Flex,
  HStack,
  VStack,
  Heading,
  Text,
  Avatar,
  Tag,
  Badge,
} from "@chakra-ui/react";
import moment from "moment";

const PostCard = ({ index, post }) => {
  return (
    <Link key={index} href={`/post/${post.id}`}>
      <Flex p="1em" gap="0.5em" bgColor="gray.800" boxShadow="xl" rounded="md">
        <Avatar size="sm" name={post.author} alt={post.author} />

        <Flex width="100%" direction="column" gap="1em">
          <HStack justify="space-between" align="center">
            <HStack spacing="0.5em">
              <VStack align="start" spacing={0} fontSize="sm">
                <Text fontWeight="semibold" color="gray.500">
                  {post.author}
                </Text>
                <Text color="gray.500">
                  {moment(post.createdAt.toDate()).fromNow()}
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <Heading textColor="white" fontSize="2xl">
            {post.title}
          </Heading>

          <HStack spacing="1em">
            <Tag size="md" gap="0.5em" bgColor="purple.900" variant="subtle">
              <AiOutlineHeart fill="pink" size={18} />
              <Text textColor="gray.400">{post.likes} likes</Text>
            </Tag>
            <Tag size="md" gap="0.5em" bgColor="purple.900" variant="subtle">
              <AiOutlineComment fill="green" size={18} />
              <Text textColor="gray.400">{post.comments.length} comments</Text>
            </Tag>
          </HStack>
        </Flex>

        <Badge height="max-content" variant="outline" colorScheme="purple">
          #{post.tag}
        </Badge>
      </Flex>
    </Link>
  );
};

export default PostCard;
