import React from "react";
import Main from "components/main";
import FiltroWeb from "./filtros/filtroWeb";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import PresentationProjetos from "components/projetos/PresentationProjetos";
import Vista from "./vista";

export default function Projetos() {
  return (
    <Main>
      <Head>
        <title>Inovatec | Projetos</title>
      </Head>
      <Container className="my-5">
        {/* PRESENTATION */}
        <Row>
          <PresentationProjetos />
        </Row>
        {/* FILTROS */}
        <Row>
          <Container>
            <div className="separador my-4 px-5"></div>
          </Container>
          <Col className="d-none d-xl-grid" xl="4">
            <FiltroWeb />
          </Col>

          {/* PROJETOS */}
          <Col xl="8">
            <Vista />
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
