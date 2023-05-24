import React from "react";
import Main from "components/main";
import { Container } from "react-bootstrap";
import Cards from "../components/home/cards.js";
import Presentation from "../components/home/presentation.js";

export default function Home() {
  return (
    <Main>
      <Container fluid 
        style={{ 
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url('People.JPG')", 
          backgroundSize: 'cover',
          backgroundPosition: 'left',
          backgroundRepeat: 'no-repeat'
        }}
        className="presentation">
        <Presentation />
      </Container>
      <Cards />
    </Main>
  );
}
