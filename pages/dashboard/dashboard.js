import React from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";


const Dashboard = () => {
  return (
    <Container className="d-flex flex-column p-5">
      <Row>
        <Col>
          <h3>Projetos</h3>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Form.Control type="text" placeholder="Pesquisar..." />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Status</th>
            <th>Administrar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Projeto 1</td>
            <td>01/01/2021</td>
            <td>Ativo</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
