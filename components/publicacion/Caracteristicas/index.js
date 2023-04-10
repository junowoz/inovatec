import React from "react";
import { Container, Accordion } from "react-bootstrap";
import Tabla from "./Tabla";

export default function Carractristicas(props) {
    return (
        <Container className=" my-5">
            <Accordion defaultActiveKey="0" flush className="separador">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h4>Características del producto</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container>
                            <Tabla />
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <h4>Otra categoría</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
}
