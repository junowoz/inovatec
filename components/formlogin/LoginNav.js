import React from "react";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import { BsArrowBarLeft } from "react-icons/bs";

export default function LoginNav() {
  return (
    <Container
      fluid
      className="d-flex flex-row-reverse my-3 align-items-start "
    >
      <Link href="/">
        <Button
          style={{
            position: "absolute",
            left: "2.72vw",
            top: "2.12vw",
            height: "5vh",
          }}
        >
          <BsArrowBarLeft className="me-2" />
          Voltar à página Inicial{" "}
        </Button>
      </Link>
    </Container>
  );
}
