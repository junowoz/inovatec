import Main from "components/main";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ImageAvaluadorMin from "./imgMin";
import ImageAvaluador from "./img";

export default function IndexAvaluador(props) {
  return (
    <Main>
      <Container>
        <Row>
          <Row className="d-sm-none p-0">
            <ImageAvaluadorMin />
          </Row>

          <Col className="d-flex justify-content-center flex-column mt-lg-0 mt-5">
            {props.children}
          </Col>

          <Col className="d-none d-lg-block ">
            <ImageAvaluador />
          </Col>
        </Row>

        <Row className="d-none d-sm-block d-lg-none mt-5 p-0">
          <ImageAvaluadorMin />
        </Row>
      </Container>
      <div className="mb-5 mb-sm-0 " />
    </Main>
  );
}
