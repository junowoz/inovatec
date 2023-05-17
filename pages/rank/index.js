import React from "react";
import Main from "components/main";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Head from "next/head";
import { BsTrophyFill } from "react-icons/bs";

function RankingCard({ title, positions }) {
    const innerCard = {
      borderRadius: 0,
      fontSize: "1.1rem",
    };
  
    return (
      <Card className="mb-4">
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          {positions.map((position) => (
            <Card key={position.place} style={innerCard} className="">
              <div className="d-flex align-items-center p-3">
                <BsTrophyFill className="me-2" />
                <strong className="me-1">{position.place} |</strong>
                <span>{position.name}</span>
              </div>
            </Card>
          ))}
        </Card.Body>
      </Card>
    );
  }
  


export default function Ranking() {
  const rankingData = [
    {
      title: "Engenharia da Computação",
      positions: [
        { place: 1, name: "Projeto A" },
        { place: 2, name: "Projeto B" },
        { place: 3, name: "Projeto C" },
      ],
    },
    {
      title: "Engenharia de Software",
      positions: [
        { place: 1, name: "Projeto D" },
        { place: 2, name: "Projeto E" },
        { place: 3, name: "Projeto F" },
      ],
    },
    {
      title: "Sistemas de Informação",
      positions: [
        { place: 1, name: "Projeto G" },
        { place: 2, name: "Projeto H" },
        { place: 3, name: "Projeto I" },
      ],
    },
    {
      title: "Análise e Desenvolvimento de Sistemas",
      positions: [
        { place: 1, name: "Projeto J" },
        { place: 2, name: "Projeto K" },
        { place: 3, name: "Projeto L" },
      ],
    },
  ];

  return (
    <Main>
      <Head>
        <title>Inovatec | Rank</title>
      </Head>

      <Container>
        <Alert variant="primary" className="mt-5 p-4">
          Inovatec 2023: É com grande satisfação que anunciamos os vencedores da
          Inovatec 2023. Parabéns a todos os participantes!
        </Alert>
        <Row className="justify-content-center my-4">
          {rankingData.map((course, index) => (
            <Col key={index} xs="12" sm="12" md="12" lg="6" xl="6" xxl="6">
              <RankingCard title={course.title} positions={course.positions} />
            </Col>
          ))}
        </Row>
      </Container>

      <div className="d-none d-lg-block" style={{ height: "2rem" }} />
    </Main>
  );
}
