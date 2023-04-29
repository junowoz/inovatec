import React, { useState, useEffect } from "react";
import Main from "components/main";
import Head from "next/head";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

const Sucesso = () => {
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      // redirecionar para tela inicial após 10 segundos
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <Main>
      <Head>
        <title>Inovatec | Sucesso</title>
      </Head>
      <Container className="p-5 px-md-5">
        <Row className="justify-content-center my-5">
          <Col xs="16" sm="14" md="10" lg="8" xl="6" xxl="6">
            <Card className="p-4 ">
              <Card.Body>
                <FaCheckCircle className="text-success fs-1 mb-4" />
                <h2 className="mb-4">
                  Parabéns! Seu projeto foi registrado com sucesso.
                </h2>
                <p className="mb-4">
                  Aguarde até 24 horas para que um administrador aprove sua
                  inscrição. Após a aprovação, seu projeto estará disponível
                  para referência na aba <Link href="/projetos">projetos</Link>.
                </p>
                <hr />

                <p className="mb-4">
                  Caso haja algum erro ou se você precisar comunicar algo, envie
                  um e-mail para{" "}
                  <a href="mailto:inovatecfametro@gmail.com">
                    inovatecfametro@gmail.com
                  </a>
                  .
                </p>
                <Alert variant="success">
                    Você será redirecionado à tela inicial em {countdown}{" "}
                    segundos.
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Sucesso;
