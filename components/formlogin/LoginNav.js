import React from "react";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import { BsHouse } from "react-icons/bs";

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
          <BsHouse className="me-2" />
          Inicio
        </Button>
      </Link>
    </Container>
  );
}
