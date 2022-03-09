import moment from "moment";
import HomeNavbar from "../components/HomePage/Navbar";
import HomePage from "../components/HomePage/Page";
import { splitArrayby10 } from "../../utils";
import { useEffect, useState } from "react";
import { db } from "../../config";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { Flex } from "@chakra-ui/react";

const index = ({ primaryUser }) => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const postsRef = collection(db, "posts");

    if (primaryUser != "unknown") {
      if (primaryUser && primaryUser.following.length != 0) {
        const usernameSet = splitArrayby10(primaryUser.following);

        usernameSet.forEach((set) => {
          const q = query(postsRef, where("author", "in", set));

          getDocs(q)
            .then((data) => {
              setPosts([]);
              setTags([]);

              data.docs.forEach((postDoc) => {
                setPosts((prevData) => [
                  ...prevData,
                  { ...postDoc.data(), id: postDoc.id },
                ]);
                !tags.includes(postDoc.data().tag)
                  ? setTags((prevData) => [...prevData, postDoc.data().tag])
                  : null;
              });
            })
            .catch((err) => setError(err.message));
        });
      } else {
        const q = query(postsRef, limit(500));

        getDocs(q)
          .then((data) => {
            setPosts([]);
            setTags([]);

            data.docs.forEach((postDoc) => {
              setPosts((prevData) => [
                ...prevData,
                { ...postDoc.data(), id: postDoc.id },
              ]);
              !tags.includes(postDoc.data().tag)
                ? setTags((prevData) => [...prevData, postDoc.data().tag])
                : null;
            });
          })
          .catch((err) => setError(err.message));
      }
    }
  }, [primaryUser]);

  return (
    <Flex direction="column" bgColor="brand.900">
      <HomeNavbar primaryUser={primaryUser} tags={tags} />
      <HomePage posts={posts} tags={tags} error={error} />
    </Flex>
  );
};

export default index;
