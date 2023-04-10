import React from "react";
import { Row, Container, Card, Button } from "react-bootstrap";
import { SlDiamond } from "react-icons/sl";
import { BsTag, BsBagCheck, BsCurrencyDollar } from "react-icons/bs";

export default function Promesas() {
    const styleIcons = {
        color: "#3FB9AD",
    };

    return (
        <Container
            fluid
            className="mt-5 pb-5 px-auto d-flex flex-column 
      justify-content-center "
        >
            <Row
                className="pt-5 mx-5 d-flex justify-content-center"
                fluid="true"
            >
                <h6
                    className="d-flex justify-content-center fw-semibold"
                    style={{ color: "#3FB9AD" }}
                >
                    MARKETPLACE
                </h6>
                <h2 className="d-flex justify-content-center tittle-custom">
                    Es rápido y sencillo vender tu bici con nosotros
                </h2>

                <Row className="d-flex justify-content-center py-3 gap-lg-5 gap-1"
                >
                    {/* Card 1 */}
                    <div
                        style={{
                            width: "17rem",
                            color: "primary",
                            backgroundColor: "transparent",
                        }}
                        className="m-3 py-2 px-3"
                    >
                        <center>
                            <Card.Body className="justify-content-center align-items-center">
                                <BsTag
                                    size={29}
                                    className="mb-3"
                                    style={styleIcons}
                                />
                                <h5 className="fw-semibold">1. Llena tus datos</h5>
                                <Card.Text className="text-secondary">
                                    Cuéntanos las características de tu bici y
                                    sube un par de fotos.
                                </Card.Text>
                            </Card.Body>
                        </center>
                    </div>

                    {/* Card 2 */}
                    <div
                        style={{
                            width: "17rem",
                            color: "primary",
                            backgroundColor: "transparent",
                        }}
                        className="m-3 py-2 px-3"
                    >
                        <center>
                            <Card.Body>
                                <BsBagCheck
                                    size={29}
                                    className="mb-3"
                                    style={styleIcons}
                                />
                                <h5 className="fw-semibold">2. Publica tu bici</h5>
                                <Card.Text className="text-secondary">
                                    Postea tu bicicleta para que nuestra
                                    comunidad de más de 3.000 ciclistas la
                                    puedan comprar.
                                </Card.Text>
                            </Card.Body>
                        </center>
                    </div>

                    {/* Card 3 */}
                    <div
                        style={{
                            width: "17rem",
                            color: "primary",
                            backgroundColor: "transparent",
                        }}
                        className="m-3 py-2 px-3"
                    >
                        <center>
                            <Card.Body>
                                <BsCurrencyDollar
                                    size={29}
                                    className="mb-3"
                                    style={styleIcons}
                                />
                                <h5 className="fw-semibold">3. Recibe el pago</h5>
                                <Card.Text className="text-secondary">
                                    Apenas compren tu bici recibirás un pago
                                    instantáneo a través de X.
                                </Card.Text>
                            </Card.Body>
                        </center>
                    </div>
                </Row>
            </Row>
        </Container>
    );
}
