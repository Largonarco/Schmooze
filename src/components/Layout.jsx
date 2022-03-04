import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../../config";

import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const [userData, setUserData] = useState("unknown");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email),
          limit(1)
        );
        getDocs(q).then((data) => {
          setUserData(data.docs[0].data());
        });
      } else {
        setUserData(user);
      }
    });

    return () => {
      unsubAuth();
    };
  }, []);

  return (
    <Flex direction="column" bgColor="gray.900">
      <Navbar user={userData} />
      {React.cloneElement(children, { user: userData })}
    </Flex>
  );
};

export default Layout;
