import Sidebar from "../components/Sidebar";
import Posts from "../components/Posts";
import { splitArrayby10 } from "../../utils";
import { useEffect, useRef, useState } from "react";
import { db } from "../../config";
import {
  collection,
  getDocs,
  limit,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

import {
  Box,
  Flex,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";

const index = ({ user, isOpen, onClose }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postsRef = collection(db, "posts");

    if (user && user.following != []) {
      const usernames = splitArrayby10(user.following);
      usernames.forEach((set) => {
        const q = query(
          postsRef,
          where("author", "in", set),
          where("createdAt", ">", {
            seconds: Timestamp.now().seconds - 172800,
            nanoseconds: Timestamp.now().nanoseconds,
          })
        );
        getDocs(q)
          .then((data) => {
            data.docs.forEach((post) => {
              setPosts([...posts, { ...post.data(), id: post.id }]);
            });
          })
          .catch((err) => setError(err.message));
      });
    } else {
      const q = query(postsRef, limit(500));
      getDocs(q)
        .then((data) => {
          data.docs.forEach((post) => {
            setPosts([...posts, { ...post.data(), id: post.id }]);
          });
        })
        .catch((err) => setError(err.message));
    }
  }, []);

  return (
    <Flex minH="85vh" direction="row" gap="1em">
      <Flex
        px="1em"
        flex={1}
        direction="column"
        display={{ base: "none", lg: "flex" }}
      >
        <Sidebar user={user} />
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent bgColor="gray.700">
          <DrawerCloseButton color="white" />
          <DrawerHeader textColor="white">User controls</DrawerHeader>
          <DrawerBody>
            <Sidebar user={user} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Posts posts={posts} />
    </Flex>
  );
};

export default index;
