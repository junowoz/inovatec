import Main from "components/main";
// import Projetos from "/Projetos";
import FiltroWeb from "./filtros/filtroWeb";
import { Container, Row, Col, Card } from "react-bootstrap";
import Head from "next/head";

export default function TodosProjetos() {
  return (
    <Main>
      <Head>
        <title>Inovatec | Projetos</title>
      </Head>
      <Container className="my-5">
        <Row>
          <Card variant="primary" className="">
            <Card.Body>
              <Card.Title className="fw-bold">Diretorio de Projetos</Card.Title>

              <Card.Text className="">
                Bem-vindo ao diretório de projetos Inovatec, uma iniciativa do
                Centro Universitário Fametro para divulgar os projetos
                desenvolvidos pelos alunos dos cursos de computação ao longo dos
                anos.
              </Card.Text>
              <Card.Text className="">
                Aqui você pode filtrar os projetos por ano, semestre, tipo de
                tecnologia utilizada, indústria de atuação e muito mais. Não
                deixe de conferir a criatividade e inovação dos nossos alunos!
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <div className="separador my-4 px-4"></div>
          <Col className="d-none d-xl-grid" xl="3">
            <FiltroWeb />
          </Col>
          <Col>
            {/* <Projetos /> */}
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
