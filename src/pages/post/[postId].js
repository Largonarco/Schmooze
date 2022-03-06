import PostNavbar from "../../components/PostPage/Navbar";
import PostPage from "../../components/PostPage/Page";
import moment from "moment";

import { db } from "../../../config";
import { doc, getDoc } from "firebase/firestore";

import { Flex } from "@chakra-ui/react";

const index = ({ primaryUser, post, postAuthor }) => {
  return (
    <Flex direction="column" bgColor="gray.900">
      <PostNavbar primaryUser={primaryUser} postAuthor={postAuthor} />
      <PostPage primaryUser={primaryUser} post={post} postAuthor={postAuthor} />
    </Flex>
  );
};

export default index;

export const getServerSideProps = async (context) => {
  const { postId } = context.params;

  let post = await getDoc(doc(db, "posts", postId));
  let postAuthor = await getDoc(doc(db, "users", post.data().author));
  post = {
    ...post.data(),
    createdAt: moment(post.data().createdAt.toDate()).fromNow(),
    id: post.id,
  };
  postAuthor = postAuthor.data();

  return {
    props: {
      post,
      postAuthor,
    },
  };
};
