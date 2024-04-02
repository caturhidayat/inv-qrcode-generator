import Header from "./Header";
import { Container } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container maxW="container.md">{children}</Container>
    </>
  );
}
