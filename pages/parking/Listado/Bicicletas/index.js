import React from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { BsBell } from "react-icons/bs";
import GetBicis from "./bicis";
import FiltersMobile from "../FiltersMobile";

export default function Bicicletas() {
    return (
        <div>
            <Card className="my-3 lg w-100" style={{ width: "auto" }}>
                <Card.Body>
                    <Row className=" align-items-center">
                        {" "}
                        <Col>
                            <Card.Title>Guarda tu búsqueda</Card.Title>
                            <Card.Text>
                                Filtra tus resultados, y recibe una notificación
                                cuando lleguen nuevos productos coincidentes.
                            </Card.Text>
                        </Col>
                        <Col lg="auto" className="d-grid gap-2 py-3">
                            <Button
                                style={{ width: "auto" }}
                                variant="outline-primary"
                            >
                                {/* //Add bell */}
                                <BsBell className="me-2" />
                                Notificarme
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* FiltersMobile */}
            <div className="justify-content-center">
                <FiltersMobile
                    className="d-block d-xl-none"
                />
            </div>
        {/* End FiltersMobile */}
        
            <Row className="d-none d-xl-flex align-items-center justify-content-between">
                <Col sm="3">1,940 Resultados</Col>

                <Col sm="6">
                    <Form.Group
                        as={Row}
                        controlId="formGridState"
                        className=" d-flex justify-content-end"
                    >
                        <Form.Label column xl="auto">
                            Ordenar por
                        </Form.Label>
                        <Col xl="8" xxl="9" className="">
                            <Form.Select defaultValue="Choose...">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <GetBicis />
        </div>
    );
}
