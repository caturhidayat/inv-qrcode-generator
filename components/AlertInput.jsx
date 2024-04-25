import { Tag, Text } from "@chakra-ui/react";

export default function AlertInput(props) {
  return (
    // <Tag mt="1" size="sm" colorScheme="orange">
    //   {props.message}
    // </Tag>
    <Text mt="1" fontSize="xs" color="red.500">
      {props.message}
    </Text>
  );
}
