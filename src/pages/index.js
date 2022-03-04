import Sidebar from "../components/Sidebar";
import PostFeed from "../components/PostFeed";
import { splitArrayby10 } from "../../utils";
import { useEffect, useState } from "react";
import { db } from "../../config";
import {
  collection,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

import { Flex } from "@chakra-ui/react";

const index = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postsRef = collection(db, "posts");

    if (user != "unknown") {
      if (user && user.following.length != 0) {
        const usernameSet = splitArrayby10(user.following);

        usernameSet.forEach((username) => {
          const q = query(
            postsRef,
            where("author", "in", username),
            where("createdAt", ">", {
              seconds: Timestamp.now().seconds - 172800,
              nanoseconds: Timestamp.now().nanoseconds,
            })
          );

          getDocs(q)
            .then((data) => {
              data.docs.forEach((postDoc) => {
                const post = postDoc.data();
                setPosts((prevData) => [
                  ...prevData,
                  { ...post, id: postDoc.id },
                ]);
                !tags.includes(post.tag)
                  ? setTags((prevData) => [...prevData, post.tag])
                  : null;
              });
            })
            .catch((err) => setError(err.message));
        });
      } else {
        const q = query(postsRef, limit(500));

        getDocs(q)
          .then((data) => {
            data.docs.forEach((postDoc) => {
              const post = postDoc.data();
              setPosts((prevData) => [
                ...prevData,
                { ...post, id: postDoc.id },
              ]);
              !tags.includes(post.tag)
                ? setTags((prevData) => [...prevData, post.tag])
                : null;
            });
          })
          .catch((err) => setError(err.message));
      }
    }
  }, [user]);

  return (
    <Flex
      minH="100vh"
      mt="10vh"
      px={{ base: "1em", lg: "15vw" }}
      py="2em"
      gap="1em"
    >
      <Sidebar tags={tags} />

      {!error ? (
        <PostFeed posts={posts} />
      ) : (
        <Text fontSize="md" fontWeight="semibold">
          Couldn't fetch posts
        </Text>
      )}
    </Flex>
  );
};

export default index;
