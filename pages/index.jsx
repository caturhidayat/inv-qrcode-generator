import Form from "@/components/Form";
import { Heading } from "@chakra-ui/react";
import { Box, Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <main>
                <Header />
                <Container maxW='container.md' mt='50px'>
                    <Form />
                </Container>
                <Footer />
            </main>
        </>
    );
}
