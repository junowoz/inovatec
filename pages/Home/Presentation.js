import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/router";

function Presentation() {
    const router = useRouter();
    return (
        <Container className="">
            <Row className="py-5">
                <Col className="mx-2 d-flex flex-column justify-content-center align-items-baseline">
                    <Image
                        src="/Mountain.png"
                        alt=""
                        className="img-fluid d-lg-none mb-3"
                    />

                    <h1 className="fs-1 tittle-custom">
                        Compra o vende tu bici de manera fácil y segura con
                        nosotros
                    </h1>
                    <p className="fw-semibold">
                        Explora +12.000 bicicletas en nuestra plataforma
                    </p>
                    <div className="d-flex flex-column justify-content-center align-items-baseline w-100">
                        <Button
                            variant="primary"
                            onClick={() => router.push("/compra")}
                            className="mx-auto mx-lg-0 d-lg-none justify-content-center w-100 d-flex"
                        >
                            Comprar bicis
                        </Button>

                        <Button
                            variant="primary"
                            onClick={() => router.push("/compra")}
                            className="mx-auto mx-lg-0 d-none d-lg-flex "
                        >
                            Comprar bicis
                        </Button>

                        <Link
                            href="/vender"
                            className=" text-decoration-none link-custom-text pt-2 mx-auto mx-lg-0 d-lg-none justify-content-center w-100 d-flex align-items-center "
                            passHref
                        >
                            Vender mi bici <MdKeyboardArrowRight />
                        </Link>

                        <Link
                            href="/vender"
                            className="text-decoration-none link-custom-text pt-2 d-none d-lg-flex align-items-center "
                            passHref
                        >
                            Vender mi bici <MdKeyboardArrowRight />
                        </Link>
                    </div>
                </Col>

                <Col className=" d-none d-lg-block m-4">
                    <div className=" text-center bg-image">
                        <Card.Img
                            variant="top"
                            src="/Mountain.png"
                            className=""
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Presentation;
