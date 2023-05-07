import React from "react";
import Main from "components/main";
import {
  Container,
  Button,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { BsWhatsapp } from "react-icons/bs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useInscreverState } from "context/useInscreverState";
import Link from "next/link";

export default function Inscrever() {
  const router = useRouter();
  const { resetFormData } = useInscreverState();

  //SUBMIT
  const handleOnSubmit = () => {
    resetFormData();
    router.push("/inscrever/um");
  };

  return (
    <Main>
      <Head>
        <title>Inovatec | Inscrever</title>
      </Head>

      <Container>
        <Row className="justify-content-center my-5">
          <Col xs="12" sm="10" md="8" lg="6">
            <Card className="p-5">
              <Card.Body>
                <h2 className="mb-4">Inscreva seu projeto</h2>
                <p>
                  Para inscrever seu projeto, siga o processo de inscrição passo a
                  passo. Após a inscrição, nosso time de administradores irá revisar
                  e aprovar seu projeto. O processo pode levar até 24 horas.
                </p>
                <p>
                  Se você tiver alguma dúvida durante o processo de inscrição,
                  sinta-se à vontade para entrar em contato conosco através do
                  e-mail{" "}
                  <a href="mailto:inovatecfametro@gmail.com">
                    inovatecfametro@gmail.com
                  </a>{" "}
                  ou pelo{" "}
                  <a
                    href="https://wa.link/7shszi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp <BsWhatsapp />
                  </a>
                  .
                </p>
                <Alert variant="warning" className="my-4">
                  <strong>Atenção:</strong> Antes de inscrever seu projeto, por
                  favor, verifique a lista de{" "}
                  <Link href="/projetos">projetos existentes</Link> para garantir
                  que não haja projetos similares já inscritos.
                </Alert>
                {/* Seguinte */}
                <Button variant="primary" type="submit"  className="w-100" onClick={handleOnSubmit}>
                  Inscrever Projeto
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "5rem" }} />
    </Main>
  );
}
