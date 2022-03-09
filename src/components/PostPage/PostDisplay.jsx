import moment from "moment";
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
import { Flex, Heading, Text, Textarea, Button } from "@chakra-ui/react";

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
      comments: arrayUnion({
        user: primaryUser.username,
        comment: userComment,
      }),
    });
  };

  return (
    <Flex flex={{ base: 1, lg: 4 }} direction="column" gap="1em">
      <Heading fontSize="lg" textColor="brand.50">
        Post
      </Heading>

      <Flex p="1em" gap="0.5em" bgColor="brand.800" boxShadow="xl" rounded="md">
        <Flex width="100%" direction="column" gap="1em">
          <Text textColor="brand.200">
            Posted by {post.author} {moment.unix(post.createdAt).fromNow()}
          </Text>

          <Heading fontSize="2xl" textColor="brand.50">
            {post.title}
          </Heading>

          <Text fontSize="md" textColor="brand.50">
            {post.body}
          </Text>
        </Flex>

        <Button
          _hover={{ bgColor: "brand.700" }}
          _active={{ bgColor: "brand.700" }}
          size="sm"
          variant="outline"
          onClick={onLike}
        >
          {liked ? (
            <AiFillHeart fill="pink" size={18} />
          ) : (
            <AiOutlineHeart fill="pink" size={18} />
          )}
        </Button>
      </Flex>

      <Flex p="1em" direction="column" gap="1em">
        <Heading as="h3" size="md" textColor="brand.50">
          Comments
        </Heading>

        {primaryUser != null && primaryUser != "unknown" ? (
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
              colorScheme="brand"
              onClick={onComment}
            >
              Submit
            </Button>
          </Flex>
        ) : null}

        {newComments.length != 0
          ? newComments.map(({ comment, user }, index) => (
              <Flex
                key={index}
                p="0.5em"
                direction="column"
                bgColor="brand.800"
                rounded="md"
              >
                <Text fontWeight="semibold" color="brand.200">
                  {user}
                </Text>
                <Text textColor="brand.50">{comment}</Text>
              </Flex>
            ))
          : post.comments.map(({ comment, user }, index) => (
              <Flex
                key={index}
                p="0.5em"
                direction="column"
                bgColor="brand.800"
                rounded="md"
              >
                <Text fontWeight="semibold" color="brand.200">
                  {user}
                </Text>
                <Text textColor="brand.50">{comment}</Text>
              </Flex>
            ))}
      </Flex>
    </Flex>
  );
};

export default PostDisplay;
