import { Col, Container, Row, Button } from "react-bootstrap";
import Canva from "./canva";
import Dashboard from "./dashboard";
import React from 'react';
import withAuth from "utils/withAuth";

const Index = () => {

  return (
    <Container fluid>
      <Row>
        <Col lg="3" xl="3" xxl="3">
          <Canva></Canva>
        </Col>

        <Col>
          <Row style={{ backgroundColor: "rgba(218, 218, 218, 0.184)" }}>
            <div className="">
              <Container className="d-flex justify-content-center" fluid>
                <Dashboard />
              </Container>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuth(Index);
