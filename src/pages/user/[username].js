import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../../config";

const UserPage = () => {
  return <div>[username]</div>;
};

export default UserPage;

export const getServerSideProps = (context) => {
  const { username } = context.params;

  let user = await getDoc(doc(db, "users", username));
  user = user.data();

  return {
    props: {
      user,
    },
  };
};
