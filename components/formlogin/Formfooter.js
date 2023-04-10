import { Container } from "react-bootstrap";

export default function Formfooter() {
  return (
      <Container
          fluid
          className="d-flex"
          style={{ justifyContent: "space-between" }}
      >
          <p className="text-secondary ms-4 mb-4 d-none d-sm-block">2022 © Recycling</p>

          <p className="text-secondary me-4 mb-4 d-none d-sm-block">
              Todos los derechos reservados
          </p>
      </Container>
  );
}
