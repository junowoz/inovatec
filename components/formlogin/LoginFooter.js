import React from "react";
import { Container } from "react-bootstrap";

export default function LoginFooter() {
  return (
    <Container
      fluid
      className="d-flex"
      style={{ justifyContent: "space-between" }}
    >
      <p className="text-secondary ms-4 mb-4 d-none d-sm-block">
        2023 © Inovatec
      </p>

      <p className="text-secondary me-4 mb-4 d-none d-sm-block">
        Todos os direitos reservados
      </p>
    </Container>
  );
}
