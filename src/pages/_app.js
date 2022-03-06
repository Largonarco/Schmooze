import "@fontsource/montserrat"
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { query, getDocs, collection, where, limit } from "firebase/firestore";
import { auth, db } from "../../config";
import theme from "../../styles/theme";

import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState("unknown");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email),
          limit(1)
        );
        getDocs(q).then((data) => {
          setUser(data.docs[0].data());
        });
      } else {
        setUser(user);
      }
    });

    return () => {
      unsubAuth();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} user={user} />
    </ChakraProvider>
  );
};

export default MyApp;
