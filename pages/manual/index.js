import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Alert,
  Button,
} from "react-bootstrap";
import Scrollspy from "react-scrollspy";
// import { Scrollspy } from "@makotot/ghostui";
import manualData from "./data.json";
import Main from "components/main";

const Manual = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <Main>
      <Container className="py-5">
        <Alert variant="primary">
          <Alert.Heading>Manual</Alert.Heading>
          <p>
            Este é um manual para a Feira de Inovação <strong>Inovatec</strong>.
            A Inovatec é um evento anual que reúne empreendedores, investidores,
            acadêmicos e entusiastas da tecnologia para promover a inovação e o
            desenvolvimento de novas ideias no Brasil. Neste manual, você
            encontrará informações detalhadas sobre como participar do evento,
            as atividades e palestras oferecidas, além de dicas para tirar o
            máximo proveito da experiência. Estamos ansiosos para vê-lo na
            próxima edição da Inovatec e juntos construirmos um futuro mais
            inovador e sustentável para todos nós!
          </p>
        </Alert>

        <Row className="pb-5">
          <Col md={8}>
            <Card className="p-5">
              {manualData.sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </Card>
          </Col>
          <Col md={4}>
            <Button
              className="d-md-none mb-3"
              variant="primary"
              onClick={toggleSidebar}
            >
              {showSidebar ? "Fechar sumário" : "Abrir sumário"}
            </Button>
            {showSidebar || (
              <div
                className="sticky-top d-none d-md-block"
                style={{ top: "1rem" }}
              >
                <Scrollspy
                  items={manualData.sections.map((section) => section.id)}
                  currentClassName="bg-primary text-white"
                  componentTag={ListGroup}
                >
                  {manualData.sections.map((section) => (
                    <ListGroup.Item
                      action
                      href={`#${section.id}`}
                      key={section.id}
                    >
                      {section.title}
                    </ListGroup.Item>
                  ))}
                </Scrollspy>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Manual;
