import Main from "components/main";
import Projetos from "./Listado/Projetos";
import Filtro from "./Listado/Filtro";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function TodosProjetos() {
  return (
    <Main>
      <Container className="my-5">
        <Row>
        <Card
          variant="primary"
          className=""
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title>Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
          <h2 className="px-4">Diretorio de Projetos</h2>
          <p className="px-4">
            Bem-vindo ao diretório de projetos Inovatec, uma iniciativa do
            Centro Universitário Fametro para divulgar os projetos desenvolvidos
            pelos alunos dos cursos de computação ao longo dos anos.
          </p>
          <p className="px-4">
            Aqui você pode filtrar os projetos por ano, semestre, tipo de
            tecnologia utilizada, indústria de atuação e muito mais. Não deixe
            de conferir a criatividade e inovação dos nossos alunos!
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
    </Main>
  );
}
