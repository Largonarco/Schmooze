import moment from "moment";
import UserPage from "../../components/UserPage/Page";
import UserNavbar from "../../components/UserPage/Navbar";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { db } from "../../../config";

import { Flex } from "@chakra-ui/react";

const index = ({ primaryUser, secondaryUser, secondaryUserPosts }) => {
  return (
    <Flex direction="column" bgColor="gray.900">
      <UserNavbar primaryUser={primaryUser} />
      <UserPage
        secondaryUser={secondaryUser}
        secondaryUserPosts={secondaryUserPosts}
      />
    </Flex>
  );
};

export default index;

export const getServerSideProps = async (context) => {
  const { username } = context.params;

  let user = await getDoc(doc(db, "users", username));
  const q = query(collection(db, "posts"), where("author", "==", username));
  let secondaryUserPosts = await getDocs(q);
  secondaryUserPosts = secondaryUserPosts.docs.map((rawPost) => ({
    ...rawPost.data(),
    createdAt: moment(rawPost.data().createdAt.toDate()).fromNow(),
    id: rawPost.id,
  }));

  return {
    props: {
      secondaryUser: user.data(),
      secondaryUserPosts,
    },
  };
};
