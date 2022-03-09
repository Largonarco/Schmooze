import moment from "moment";
import Link from "next/link";

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

const PostCard = ({ post }) => {
  return (
    <Link href={`/post/${post.id}`}>
      <Flex
        p="1em"
        gap="0.5em"
        bgColor="brand.800"
        border="1px"
        borderRadius="0.5em"
        borderColor="brand.400"
        boxShadow="xl"
        cursor="pointer"
      >
        <Avatar size="sm" name={post.author} alt={post.author} />

        <Flex width="100%" direction="column" gap="0.5em">
          <HStack justify="space-between" align="center">
            <HStack spacing="0.5em">
              <VStack align="start" spacing={0} fontSize="sm">
                <Link href={`user/${post.author}`}>
                  <Text
                    textColor="brand.200"
                    _hover={{ textDecoration: "underline" }}
                  >
                    {post.author}
                  </Text>
                </Link>
                <Text textColor="brand.200">
                  {moment.unix(post.createdAt).fromNow()}
                </Text>
              </VStack>
            </HStack>
          </HStack>

          <Heading textColor="brand.50" fontSize="xl">
            {post.title}
          </Heading>

          <HStack spacing="1em">
            <Tag size="md" gap="0.5em" bgColor="brand.400" variant="subtle">
              <AiOutlineHeart fill="pink" size={18} />
              <Text textColor="brand.200">{post.likes} </Text>
            </Tag>
            <Tag size="md" gap="0.5em" bgColor="brand.400" variant="subtle">
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
  );
};

export default PostCard;
