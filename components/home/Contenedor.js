import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import { Container } from "react-bootstrap";

const Contenedor = (props) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/mesa.png" />
        <title>Inovatec</title>
      </Head>

      <SSRProvider>
        <Header />

        {props.children}

        <Container fluid className="footer-customs border-top">
          <Footer />
        </Container>
      </SSRProvider>
    </>
  );
};

export default Contenedor;
