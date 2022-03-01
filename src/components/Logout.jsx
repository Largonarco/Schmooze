import { signOut } from "firebase/auth";
import { auth } from "../../config";

import { Button } from "@chakra-ui/react";

const Logout = () => {
  const logout = (e) => {
    e.preventDefault();

    signOut(auth);
  };

  return (
    <Button variant="outline" colorScheme="purple" onClick={(e) => logout(e)}>
      Log out
    </Button>
  );
};

export default Logout;
