import moment from "moment";
import React, { useEffect, useState } from "react";
import { db } from "../../../config";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import {
  Flex,
  HStack,
  VStack,
  Avatar,
  Heading,
  Text,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const PostPage = ({ user, post }) => {
  const [userComment, setUserComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const unsubDoc = onSnapshot(doc(db, "posts", post.id), (snapshot) => {
      if (snapshot.data().comments != comments) {
        console.log(snapshot.data().comments)
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
      comments: arrayUnion({ user: user.username, comment: userComment }),
    });
  };

  return (
    <Flex
      minH="90vh"
      mt="10vh"
      px={{ base: "1em", lg: "15vw" }}
      py="2em"
      direction="column"
      gap="2em"
    >
      <Flex p="1em" gap="0.5em" bgColor="gray.800" boxShadow="xl" rounded="md">
        <Avatar size="sm" name={post.author} alt={post.author} />

        <Flex width="100%" direction="column" gap="1em">
          <VStack align="start" spacing={0} fontSize="sm">
            <Text fontWeight="semibold" color="gray.500">
              {post.author}
            </Text>
            <Text color="gray.500">{post.createdAt}</Text>
          </VStack>

          <Heading as="h2" fontSize="2xl" textColor="white">
            {post.title}
          </Heading>

          <Text fontSize="lg" textColor="whiteAlpha.800">
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

        <Flex direction="column" gap="0.5em">
          <Textarea
            textColor="white"
            onChange={(e) => setUserComment(e.target.value)}
          />
          <Button
            ml="auto"
            width="max-content"
            variant="solid"
            colorScheme="purple"
            onClick={onComment}
          >
            Submit
          </Button>
        </Flex>

        {comments.length != 0
          ? comments.map(({ comment, user}) => <Text>{comment}</Text>)
          : post.comments.map(({ comment, user}) => <Text>{comment}</Text>)}
      </Flex>
    </Flex>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const { postId } = context.params;

  let post = await getDoc(doc(db, "posts", postId));
  post = {
    ...post.data(),
    createdAt: moment(post.data().createdAt.toDate()).fromNow(),
    id: post.id,
  };

  return {
    props: {
      post,
    },
  };
};
