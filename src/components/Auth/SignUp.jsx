import { useState, useRef } from "react";
import { auth, db } from "../../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

import {
  VStack,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const SignUp = ({ toggle, setToggle }) => {
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    username: null,
    email: null,
    password: null,
  });

  const focusRef = useRef();

  const signUp = async (e) => {
    e.preventDefault();

    const userRef = doc(db, "users", credentials.username);
    const user = await getDoc(userRef);

    if (!user.exists()) {
      createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      )
        .then(() =>
          setDoc(userRef, {
            email: credentials.email,
            username: credentials.username,
            following: [],
            followers: [],
          })
            .then(setToggle(!toggle))
            .catch((err) => setError(err.message))
        )
        .catch((err) => setError(err.message));
    } else {
      setError("Username taken");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button
        variant="solid"
        colorScheme="purple"
        onClick={() => setToggle(!toggle)}
      >
        Sign up
      </Button>

      <Modal
        initialFocusRef={focusRef}
        isOpen={toggle}
        onClose={() => setToggle(!toggle)}
        isCentered
        blockScrollOnMount
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="sm" />
        <ModalContent bgColor="gray.800">
          <ModalHeader textColor="white">Sign up</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing="1em">
              <Input
                ref={focusRef}
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => onChange(e)}
                textColor="white"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => onChange(e)}
                textColor="white"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => onChange(e)}
                textColor="white"
              />
              {error ? (
                <Alert status="error" variant="top-accent">
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              isDisabled={
                credentials.email &&
                credentials.password &&
                credentials.username
                  ? false
                  : true
              }
              variant="solid"
              colorScheme="purple"
              onClick={(e) => signUp(e)}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
