import React from "react";
import Main from "components/main";
import Image from "react-bootstrap/Image";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Erro404() {
  const router = useRouter();

  return (
    <Main>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
          className="my-5 d-flex justify-content-center flex-column align-content-center align-items-center"
        >
          <div
            className="d-flex "
            style={{
              maxWidth: "567px",
            }}
          >
            <Image src="/Erro404.png" alt="Erro404" className="img-fluid" />
          </div>
          <h3 style={{ color: "#0D62AD" }} className="mb-4">
            Página não encontrada
          </h3>
          <div className="w-100 d-flex justify-content-center mb-5">
            <Button
              gap={2}
              color="primary"
              className="d-md-none w-100"
              onClick={() => router.push("/")}
            >
              Voltar ao Inicio
            </Button>
            <Button
              color="primary"
              className="d-none d-md-block"
              onClick={() => router.push("/")}
            >
              Voltar ao Inicio
            </Button>
          </div>
        </div>
      </Container>
    </Main>
  );
}
