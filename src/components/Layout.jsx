import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, db } from "../../config";

import { useDisclosure, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
  }, []);

  return (
    <Flex p="1em" gap="2em" direction="column" bgColor="gray.900">
      <Navbar onOpen={onOpen} />
      {React.cloneElement(children, {
        user: userData,
        isOpen,
        onClose,
      })}
    </Flex>
  );
};

export default Layout;
