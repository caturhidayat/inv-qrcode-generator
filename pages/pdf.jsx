import PdfModify from "@/components/pdfModify";
import { Container } from "@chakra-ui/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function pdf() {
    return (
        <div>
            <Header />
            <Container maxW='container.md' mt='50px'>
                <PdfModify />
            </Container>
            <Footer />
        </div>
    );
}
