import { Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const PostSkeletonCard = () => {
  return (
    <Flex
      height={130}
      p="0.5em"
      direction="column"
      gap="1em"
      bgColor="brand.800"
      borderWidth={1}
      borderColor="brand.400"
      borderRadius="0.5em"
    >
      <SkeletonCircle size="10" />
      <SkeletonText noOfLines={3} spacing="1em" />
    </Flex>
  );
};

export default PostSkeletonCard;
