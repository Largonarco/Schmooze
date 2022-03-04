import { useState, useRef } from "react";
import { db, storage } from "../../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

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
  Textarea,
  Button,
  Alert,
  AlertIcon,
  MenuItem,
} from "@chakra-ui/react";

const CreatePost = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    title: null,
    body: null,
    tag: null,
  });

  const submitPost = async (e) => {
    e.preventDefault();

    setLoading(!loading);
    setError(null);

    addDoc(collection(db, "posts"), {
      ...post,
      likes: 0,
      createdAt: serverTimestamp(),
      comments: [],
      author: user.username,
    })
      .then((document) => {
        if (post.file.type == "image/jpeg" || "image/jpg" || "image/png") {
          const uploadTask = uploadBytesResumable(
            ref(storage, `images/${document.id}`),
            post.file
          );
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => setError(error.message),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updateDoc(doc(db, "posts", document.id), {
                  file: downloadURL,
                });
              });
              setLoading(!loading);
              setToggle(!toggle);
            }
          );
        }
      })
      .catch((err) => setError(err.message));
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const focusRef = useRef();

  return (
    <>
      <MenuItem
        bgColor="gray.700"
        textColor="white"
        _hover={{ bgColor: "gray.800" }}
        _focus={{ bgColor: "gray.700" }}
        onClick={() => setToggle(!toggle)}
      >
        Create post
      </MenuItem>

      <Modal
        initialFocusRef={focusRef}
        isOpen={toggle}
        onClose={() => setToggle(!toggle)}
        isCentered
        blockScrollOnMount
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.800">
          <ModalHeader textColor="white">Create a post</ModalHeader>
          <ModalCloseButton color="white" />
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
              isLoading={loading}
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
    </>
  );
};

export default CreatePost;
