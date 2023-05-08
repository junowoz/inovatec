import React from "react";
import Main from "components/main";
import { Container, InputGroup, Form } from "react-bootstrap";
import withAuth from "utils/withAuth";
import Head from "next/head";

const Votar = () => {
  return (
    <Main>
      <Head>
        <title>Inovatec | Votar</title>
      </Head>
      <Container className="p-5" fluid>
        <div className="px-5 py-2">
          <h2 className="mb-3">Votar</h2>
          <div className="d-flex align-items-center mb-4">
            <InputGroup className="me-2">
              <Form.Control
                type="text"
                placeholder="Buscar projetos..."
                aria-label="Buscar projetos..."
              />
            </InputGroup>
          </div>
        </div>
      </Container>
    </Main>
  );
};

export default withAuth(Votar);
