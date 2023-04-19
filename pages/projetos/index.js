import Contenedor from "components/home/Contenedor";
import Projetos from "./Listado/Projetos";
import Filtro from "./Listado/Filtro";
import { Container, Row, Col } from "react-bootstrap";

export default function TodosProjetos() {
  return (
    <Contenedor>
      <Container className="my-5">
        <Row>
          <h2 className="px-4">Diretorio de Projetos</h2>
          <p className="px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod.
          </p>
          <p className="px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod.
          </p>
          <p className="px-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam, quod.
          </p>
        </Row>
        <Row>
          <div className="separador my-4"></div>
          <Col className="d-none d-xl-grid" xl="3">
            <Filtro />
          </Col>
          <Col>
            <Projetos />
          </Col>
        </Row>
      </Container>
    </Contenedor>
  );
}
