import { useState, useRef } from "react";
import { db, storage } from "../../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";

import {
  VStack,
  MenuItem,
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
} from "@chakra-ui/react";

const CreatePost = ({ primaryUser }) => {
  const focusRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    title: null,
    body: null,
    tag: null,
    file: "",
  });

  const submitPost = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(!loading);

    addDoc(collection(db, "posts"), {
      title: post.title,
      body: post.body,
      tag: post.tag,
      likes: 0,
      createdAt: serverTimestamp(),
      comments: [],
      author: primaryUser.username,
    })
      .then((uploadedPost) => {
        if (post.file.type == "image/jpeg" || "image/jpg" || "image/png") {
          const uploadTask = uploadBytesResumable(
            ref(storage, `images/${uploadedPost.id}`),
            post.file
          );
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => setError(error.message),
            async () => {
              getDownloadURL(ref(storage, `images/${uploadedPost.id}`)).then(
                (url) => {
                  updateDoc(uploadedPost, {
                    file: url,
                  });
                }
              );
              await updateDoc(doc(db, "users", primaryUser.username), {
                posts: arrayUnion(uploadedPost.id),
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
    e.target.files
      ? setPost({ ...post, [e.target.name]: e.target.files[0] })
      : setPost({ ...post, [e.target.name]: e.target.value });
  };

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
                type="file"
                name="file"
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
