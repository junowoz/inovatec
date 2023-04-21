import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Singin from "./fom";
import Main from "components/main";
import Canva from "./canva";

export default function Index() {
  return (
    <Main fluid>
      <Container fluid>
        <Row>
          <Col lg="3" xl="3" xxl="3">
            <Canva></Canva>
          </Col>

          <Col>
            <Row style={{ backgroundColor: "rgba(218, 218, 218, 0.184)" }}>
              <div className="">
                <Container className="d-flex justify-content-center" fluid>
                  <Singin />
                </Container>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
