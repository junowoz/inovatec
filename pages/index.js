import React from "react";
import Main from "components/main";
import { Container } from "react-bootstrap";
import Cards from "../components/home/cards.js";
import Presentation from "../components/home/presentation.js";
import Head from "next/head";

export default function Home() {
  return (
    <Main>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inovatec | Página Inicial</title>
        <meta
          property="og:description"
          content="A Inovatec é uma iniciativa de empreendedorismo tecnológico formada por alunos e professores dos cursos de Computação da Fametro."
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/MTw129cG/Inovatec.png"
        />

        <meta property="og:url" content="https://www.inovatec.junowoz.com" />
        <meta property="og:type" content="Feira de Inovação" />
      </Head>
      <Container
        fluid
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)), url('People.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
        className="presentation"
      >
        <Presentation />
      </Container>
      <Cards />
    </Main>
  );
}
