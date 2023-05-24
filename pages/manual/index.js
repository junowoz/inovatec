import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Alert,
  Button,
  Offcanvas,
} from "react-bootstrap";
import Scrollspy from "react-scrollspy";
import manualData from "./data.json";
import Main from "components/main";
import { BsCloudDownloadFill } from "react-icons/bs";
import { saveAs } from "file-saver";
import ReactMarkdown from "react-markdown";

const Manual = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (selectedKey) => {
    setSelectedItem(selectedKey);
  };

  const pacote_inovatec_url =
    "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/files/pacote-inovatec.zip?t=2023-05-23T14%3A29%3A04.375Z";

  const handleDownload = async () => {
    try {
      const response = await fetch(pacote_inovatec_url);
      const blob = await response.blob();
      saveAs(blob, "pacote-inovatec.zip");
    } catch (error) {
      console.error("Download failed: ", error);
    }
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
          <p>
            Para começar, recomendamos que você baixe alguns documentos
            importantes. Este pacote inclui um Documento de Resumo Expandido, um
            Modelo de Visão Geral do Projeto, outro Modelo de Banner e um Modelo
            de Camisas (tudo referente a 2023). Clique no link para realizar o download.
          </p>
          <div>
          <Button
          className="d-block w-49"
          variant="primary"
          onClick={handleDownload}
          style={{ cursor: "pointer" }}
        >
              <BsCloudDownloadFill className="me-2" />
              Download do Pacote Inovatec 2023
            </Button>
          </div>
        </Alert>

        <Button
          className="d-md-none mb-4 mt-2 w-100"
          variant="primary"
          onClick={handleShow}
        >
          {showSidebar ? "Fechar sumário" : "Abrir sumário"}
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Sumário</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
                  onClick={() => handleSelect(section.id)}
                  active={selectedItem === section.id}
                >
                  {section.title}
                </ListGroup.Item>
              ))}
            </Scrollspy>
          </Offcanvas.Body>
        </Offcanvas>

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
                    onClick={() => handleSelect(section.id)}
                    active={selectedItem === section.id}
                  >
                    {section.title}
                  </ListGroup.Item>
                ))}
              </Scrollspy>
            </div>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Manual;
