import React from "react";
import { Row, Container, Card, Button } from "react-bootstrap";
import { SlDiamond } from "react-icons/sl";
import {
    BsShieldCheck,
    BsCreditCard,
    BsFillPersonCheckFill,
} from "react-icons/bs";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Promesas() {
    return (
        <Container
            style={{ backgroundColor: "rgba(248, 249, 250, 1)" }}
            fluid
            className="mt-5 pb-5 px-auto d-flex flex-column 
      justify-content-center "
        >
            <Row
                className="pt-5 mx-5 d-flex justify-content-center"
                fluid="true"
            >
                <h1 className="d-flex justify-content-center tittle-custom">
                    ¿Por qué comprar con nosotros?
                </h1>

                <Row className="d-flex justify-content-center py-3">
                    <Card
                        style={{
                            width: "17rem",
                            height: "10rem",
                            color: "primary",
                            backgroundColor: "none",
                        }}
                        className="m-3 py-2 px-3"
                    >
                        <Card.Body>
                            <SlDiamond size={29} className="mb-3" />

                            <Card.Text>
                                Tienes múltiples opciones a la hora de elegir
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card
                        style={{ width: "17rem", height: "10rem" }}
                        className="m-3 py-2 px-3"
                    >
                        <Card.Body>
                            <BsShieldCheck size={29} className="mb-3" />

                            <Card.Text>Tu dinero está siempre seguro</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card
                        style={{ width: "17rem", height: "10rem" }}
                        className="m-3 py-2 px-3"
                    >
                        <Card.Body>
                            <BsCreditCard size={29} className="mb-3" />

                            <Card.Text>
                                Cuentas con facilidades de pago.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card
                        style={{ width: "17rem", height: "10rem" }}
                        className="m-3 py-2 px-3"
                    >
                        <Card.Body>
                            <BsFillPersonCheckFill size={29} className="mb-3" />

                            <Card.Text>
                                Puedes recibir atención personalizada.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Row>

            <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: "100%", flexDirection: "column" }}
            >
                <div>
                    <Button
                        variant="primary"
                        className="d-inline"
                        style={{ width: "auto" }}
                        onClick={() => {
                            localStorage.removeItem("items");
                            router.push("/publicar/uno");
                        }}
                    >
                        Encuentra una bici para ti
                    </Button>
                </div>
                <br />
                <div></div>
            </div>
        </Container>
    );
}
