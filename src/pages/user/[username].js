import UserPage from "../../components/UserPage/Page";
import UserNavbar from "../../components/UserPage/Navbar";
import { db } from "../../../config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Flex } from "@chakra-ui/react";

const index = ({ primaryUser, secondaryUser, secondaryUserPosts }) => {
  return (
    <Flex direction="column" bgColor="brand.900">
      <UserNavbar primaryUser={primaryUser} />
      <UserPage
        primaryUser={primaryUser}
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
    id: rawPost.id,
  }));

  return {
    props: {
      secondaryUser: user.data(),
      secondaryUserPosts,
    },
  };
};
