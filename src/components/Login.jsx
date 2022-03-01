import { useRef, useState } from "react";
import { auth } from "../../config";
import { signInWithEmailAndPassword } from "firebase/auth";

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

const Login = ({ toggle, setToggle }) => {
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });

  const focusRef = useRef();

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(setToggle(!toggle))
      .catch((err) => setError(err.message));
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
        Log in
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
          <ModalHeader textColor="white">Log in</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing="1em">
              <Input
                ref={focusRef}
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
                credentials.email && credentials.password ? false : true
              }
              variant="solid"
              colorScheme="purple"
              onClick={(e) => login(e)}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
