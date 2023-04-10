import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { BsPatchCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";

function Martket() {
    const router = useRouter();

    const styleIcons = {
        color: "#3FB9AD",
    };
    return (
        <Container className="my-4 mb-5">
            <div className=" d-block d-lg-none  p-4" />

            <Row className="">
                <Col lg={4} className=" m-2 pb-4  d-block m-1">
                    <div md={100} className=" text-center bg-image">
                        <Card.Img
                            variant="top"
                            src="/vende2.svg"
                            className="mx-2 p"
                            style={{ borderRadius: " 30px" }}
                        />
                    </div>
                </Col>

                <Col className="mx-4 px-2 d-flex flex-column justify-content-center align-items-baseline">
                    <h3 className=" tittle-custom pb-4">
                        Nuestro proceso es 100% seguro y transparente{" "}
                    </h3>
                    <div
                        className="d-grid"
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(16rem, 1fr)",
                        }}
                    >
                        <Row sm="auto">
                            <Col className="align-items-top">
                                <BsPatchCheckFill
                                    width={40}
                                    style={styleIcons}
                                />
                            </Col>
                            <Col
                                className="d-flex flex-column text-secondary"
                                lg={5}
                            >
                                Revisamos y certificamos cada bicicleta y nos
                                aseguramos de que todo está en regla.
                            </Col>
                        </Row>

                        <Row sm="auto">
                            <Col className="d-flex col-auto py-3 align-items-top ">
                                <BsPatchCheckFill
                                    width={40}
                                    style={styleIcons}
                                />
                            </Col>
                            <Col
                                className="p-2 d-flex flex-column text-secondary"
                                lg={5}
                            >
                                Nos aseguramos de que la venta sea segura y que
                                recibas tu dinero.
                            </Col>
                        </Row>

                        <Row sm="auto">
                            <Col className="d-flex col-auto py-3 align-items-top ">
                                <BsPatchCheckFill
                                    width={40}
                                    style={styleIcons}
                                />
                            </Col>
                            <Col
                                className="p-2 d-flex flex-column text-secondary"
                                lg={5}
                            >
                                Realizamos el envío con un distribuidor de
                                confianza.
                            </Col>
                        </Row>

                        <Row sm="auto">
                            <Col className="d-flex col-auto py-3 align-items-top ">
                                <BsPatchCheckFill
                                    width={40}
                                    style={styleIcons}
                                />
                            </Col>
                            <Col
                                className="p-2 d-flex flex-column text-secondary"
                                lg={5}
                            >
                                Brindamos soporte, antes, durante y luego de que
                                recibas tu bici.
                            </Col>
                        </Row>
                    </div>
                    <Button
                        className="mt-2"
                        variant="primary"
                        onClick={() => {
                            localStorage.removeItem("items");
                            router.push("/publicar/uno");
                        }}
                    >
                        Vender bici ahora
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Martket;
