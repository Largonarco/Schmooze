import Logout from "./Logout";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../../config";

import {
  Flex,
  VStack,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  Textarea,
  Text,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const UserActions = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const [post, setPost] = useState({ title: null, body: null, tag: null });
  const [error, setError] = useState(null);

  const submitPost = async (e) => {
    e.preventDefault();

    addDoc(collection(db, "posts"), {
      ...post,
      likes: 0,
      createdAt: serverTimestamp(),
      comments: [],
      author: user.username,
    })
      .then(setToggle(!toggle))
      .catch((err) => setError(err.message));
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const focusRef = useRef();

  return (
    <Flex direction="column" gap="1em">
      <Text as="h2" fontSize="1.5em" fontWeight="semibold" textColor="white">
        {user.username}
      </Text>

      <Button
        variant="solid"
        colorScheme="purple"
        onClick={() => setToggle(!toggle)}
      >
        Create post
      </Button>

      <Modal
        initialFocusRef={focusRef}
        isOpen={toggle}
        onClose={() => setToggle(!toggle)}
        isCentered
        blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="1em">
              <Input
                ref={focusRef}
                type="text"
                name="title"
                placeholder="Post title"
                onChange={(e) => onChange(e)}
                textColor="white"
              />
              <Textarea
                resize="vertical"
                type="text"
                name="body"
                placeholder="Post body"
                onChange={(e) => onChange(e)}
                textColor="white"
                size="sm"
              />
              <Input
                type="text"
                name="tag"
                placeholder="Tag"
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
              isDisabled={post.title && post.body && post.tag ? false : true}
              variant="solid"
              colorScheme="brand"
              onClick={(e) => submitPost(e)}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Logout />
    </Flex>
  );
};

export default UserActions;
