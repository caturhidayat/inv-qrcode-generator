import { Tag } from "@chakra-ui/react";

export default function AlertInput(props) {
  return (
    <Tag mt="1" size="sm" colorScheme="red">
      {props.message}
    </Tag>
  );
}
