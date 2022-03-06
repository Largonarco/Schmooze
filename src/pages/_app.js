import "@fontsource/montserrat/200.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/800.css"
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { query, getDocs, collection, where, limit } from "firebase/firestore";
import { auth, db } from "../../config";
import theme from "../../styles/theme";

import { ChakraProvider } from "@chakra-ui/react";

const MyApp = ({ Component, pageProps }) => {
  const [primaryUser, setPrimaryUser] = useState("unknown");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "users"),
          where("email", "==", user.email),
          limit(1)
        );
        getDocs(q).then((data) => {
          setPrimaryUser(data.docs[0].data());
        });
      } else {
        setPrimaryUser(user);
      }
    });

    return () => {
      unsubAuth();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} primaryUser={primaryUser} />
    </ChakraProvider>
  );
};

export default MyApp;
