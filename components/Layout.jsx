import Header from "./Header";
import Footer from "./Footer";
import { Box, Container } from "@chakra-ui/react";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Container maxW='container.md'>{children}</Container>
            <Footer />
        </>
    );
}
