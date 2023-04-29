import React from "react";
import { Row, Container, Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function Cards() {
  const cartas = [
    {
      title: "Projetos",
      message: "Explore os projetos apresentados ao longo dos anos.",
      link: "projetos",
    },
    {
      title: "Inscrição",
      message: "Inscreva seu projeto, aplique, e faça parte da Inovatec.",
      link: "inscrever",
    },
    {
      title: "Manual",
      message:
        "Um guia básico para dominar a arte de criar projetos inovadores.",
      link: "manual",
    },
  ];

  return (
    <div>
      <Container
        className="mt-5 pb-5 px-auto d-flex flex-column 
      justify-content-center "
      >
        <Row className="py-5 mx-1 d-flex justify-content-center">
          <Row
            className="px-4 d-grid gap-3 px-0 "
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(14.8rem, 1fr)",
            }}
          >
            {cartas.map((Carta, index) => {
              return (
                <Link href={`/${Carta.link.toLowerCase()}`} key={index}>
                  <Card
                    key={index}
                    style={{
                      width: "auto",
                      backgroundColor: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0px 4px 20px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.transition = "all 0.2s ease-in-out";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0px 2px 10px rgba(0, 0, 0, 0.1)";
                      e.currentTarget.style.transition = "all 0.2s ease-in-out";
                    }}
                    className="text-center p-4"
                  >
                    <Card.Body>
                      <Card.Title className="fw-bold">{Carta.title}</Card.Title>
                      <Card.Text>{Carta.message}</Card.Text>
                      <Button variant="danger">Acessar</Button>
                    </Card.Body>
                  </Card>
                </Link>
              );
            })}
          </Row>
        </Row>
      </Container>
    </div>
  );
}
