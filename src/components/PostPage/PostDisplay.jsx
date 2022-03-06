import { useState, useEffect } from "react";
import { db } from "../../../config";
import {
  arrayUnion,
  doc,
  increment,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  Flex,
  VStack,
  Avatar,
  Heading,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";

const PostDisplay = ({ primaryUser, post }) => {
  const [liked, setLiked] = useState(false);
  const [userComment, setUserComment] = useState(null);
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    const unsubDoc = onSnapshot(doc(db, "posts", post.id), (snapshot) => {
      if (snapshot.data().comments != newComments) {
        setNewComments(snapshot.data().comments);
      }
    });

    return () => {
      unsubDoc();
    };
  }, []);

  const onLike = async () => {
    if (!liked) {
      await updateDoc(doc(db, "posts", post.id), {
        likes: increment(1),
      });
      setLiked(!liked);
    } else {
      await updateDoc(doc(db, "posts", post.id), {
        likes: increment(-1),
      });
      setLiked(!liked);
    }
  };

  const onComment = async () => {
    await updateDoc(doc(db, "posts", post.id), {
      comments: arrayUnion({ user: primaryUser.username, comment: userComment }),
    });
  };

  return (
    <Flex flex={{ base: 1, lg: 4 }} direction="column" gap="2em">
      <Flex p="1em" gap="0.5em" bgColor="gray.800" boxShadow="xl" rounded="md">
        <Avatar size="sm" name={post.author} alt={post.author} />

        <Flex width="100%" direction="column" gap="1em">
          <VStack align="start" spacing={0} fontSize="sm">
            <Text fontWeight="semibold" color="gray.500">
              {post.author}
            </Text>
            <Text color="gray.500">{post.createdAt}</Text>
          </VStack>

          <Heading fontSize="2xl" textColor="white">
            {post.title}
          </Heading>

          <Text fontSize="md" textColor="whiteAlpha.800">
            {post.body}
          </Text>
        </Flex>

        <Button
          _hover={{ bgColor: "gray.700" }}
          _active={{ bgColor: "gray.700" }}
          size="sm"
          variant="outline"
          alignContent="center"
          gap="1em"
          onClick={onLike}
        >
          {liked ? (
            <AiFillHeart fill="pink" size={18} />
          ) : (
            <AiOutlineHeart fill="pink" size={18} />
          )}
        </Button>
      </Flex>

      <Flex direction="column" gap="1em">
        <Heading as="h3" size="md" textColor="white">
          Comments
        </Heading>

        <Flex gap="1em">
          <Textarea
            size="sm"
            textColor="white"
            onChange={(e) => setUserComment(e.target.value)}
          />
          <Button
            mt="auto"
            width="max-content"
            variant="solid"
            colorScheme="purple"
            onClick={onComment}
          >
            Submit
          </Button>
        </Flex>

        {newComments.length != 0
          ? newComments.map(({ comment, user }) => (
              <Flex
                p="0.5em"
                direction="column"
                bgColor="gray.800"
                rounded="md"
              >
                <Text fontWeight="semibold" color="gray.500">
                  {user}
                </Text>
                <Text>{comment}</Text>
              </Flex>
            ))
          : post.comments.map(({ comment, user }) => (
              <Flex
                p="0.5em"
                direction="column"
                bgColor="gray.800"
                rounded="md"
              >
                <Text fontWeight="semibold" color="gray.500">
                  {user}
                </Text>
                <Text>{comment}</Text>
              </Flex>
            ))}
      </Flex>
    </Flex>
  );
};

export default PostDisplay;
