import React from "react";
import { Row, Container, Card, Button } from "react-bootstrap";
import { SlDiamond } from "react-icons/sl";

import {
    BsShieldCheck,
    BsCreditCard,
    BsFillPersonCheckFill,
} from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Promesas() {
    const router = useRouter();

    const cartas = [
        {
            title: "Projetos",
            message: "Tienes múltiples opciones a la hora de elegir",
            Icon: SlDiamond,
        },
        { message: "Tu dinero está siempre seguro", Icon: BsShieldCheck },
        { message: "Cuentas con facilidades de pago", Icon: BsCreditCard },
        {
            message: "Puedes recibir atención personalizada",
            Icon: BsFillPersonCheckFill,
        },
    ];

    return (
        <div style={{ backgroundColor: "rgba(207, 238, 235, 0.4)" }}>
            <Container
                className="mt-5 pb-5 px-auto d-flex flex-column 
      justify-content-center "
            >




    <Card className="text-center">
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>


                <Row className="pt-5 mx-1 d-flex justify-content-center">
                    {/* <h1 className="d-flex justify-content-center tittle-custom">
                        ¿Por qué comprar con nosotros?
                    </h1> */}

                    <Row
                        className="py-5 d-grid gap-3 px-0 "
                        style={{
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(14.8rem, 1fr)",
                        }}
                    >
                        {cartas.map((Carta, index) => {
                            return (
                                <Card
                                    // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                    key={index}
                                    style={{
                                        width: "auto",
                                        height: "10rem",
                                        color: "primary",
                                        backgroundColor: "none",
                                    }}
                                    className=" py-2 px-3"
                                >
                                    <Card.Header>{Carta.title}</Card.Header>

                                    <Card.Body>
                                        <Carta.Icon
                                            size={29}
                                            className="mb-3"
                                            style={{ color: "#0FA899" }}
                                        />

                                        <Card.Text>{Carta.message}</Card.Text>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Row>
                </Row>

                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ width: "100%", flexDirection: "column" }}
                >
                    <Link href="/parking" className="d-none d-lg-block">
                        <Button
                            variant="primary"
                            className="d-inline"
                            style={{ width: "auto" }}
                        >
                            Comprar bicis
                        </Button>
                    </Link>

                    <Link href="/parking" className="d-lg-none">
                        <Button
                            variant="primary"
                            className="d-inline "
                            style={{ width: "17rem" }}
                        >
                            Comprar bicis
                        </Button>
                    </Link>

                    <br />
                    <div>
                        <Link href="/vender">
                            Vender mi bici <MdKeyboardArrowRight />
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}
