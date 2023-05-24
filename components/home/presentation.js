import { Container, Row, Col, Form, Image, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useProjetoState } from "context/useProjetoState";
import { useRouter } from "next/router";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Presentation() {
  const { projects, fetchProject } = useProjetoState();
  const [selectedProject, setSelectedProject] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleSearchChange = (selected) => {
    if (selected.length > 0) {
      setSelectedProject(selected[0]);
      router.push(`/projetos/${selected[0].name}`);
    } else {
      setSelectedProject(null);
    }
  };

  return (
    <Container className="text-center py-5 px-md-5">
      <div className="py-lg-4 px-lg-2">
        {/* Presentation */}
        <Row className="pb-lg-5 py-lg-4">
          <Col className="text-center d-flex flex-column justify-content-center align-items-baseline">
            <div className="text-center bg-image blur-bg align-items-center justify-content-center">
              <Image
                src="/Inovatec.png"
                alt="Inovatec"
                style={{ maxWidth: "75%" }}
                className="d-lg-none align-self-center"
              />
            </div>
            <h5 className="fw-bold fs-4 tittle-custom py-3 py-sm-3 d-lg-none blur-bg">
              A Inovatec é uma iniciativa de empreendedorismo tecnológico
              formada por alunos e professores do setor de Computação da
              Fametro.
            </h5>
            <h5 className="fw-bold fs-3 tittle-custom py-3 py-sm-3 d-none d-lg-block blur-bg">
              A Inovatec é uma iniciativa de empreendedorismo tecnológico
              formada por alunos e professores do setor de Computação da
              Fametro.
            </h5>
          </Col>
          <Col className="d-none d-lg-block d-flex flex-column">
            <div className="text-center bg-image blur-bg align-items-center justify-content-center">
              <Card.Img
                variant="top"
                src="/Inovatec.png"
                className="align-self-center img-fluid"
                style={{ maxWidth: "85%" }}
              />
            </div>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row>
          <Form className="pb-3 pt-3 justify-content-center align-items-center">
            <Row className="align-items-center justify-content-center">
              <Col lg={12} md={12} sm={12} xs={12} className="text-center">
                <Typeahead
                  className="w-100"
                  style={{ height: "42px" }}
                  minLength={1}
                  id="basic-typeahead-single"
                  labelKey="name"
                  onChange={handleSearchChange}
                  options={projects.filter((project) => project.status)}
                  placeholder="Pesquisar projetos..."
                  selected={selectedProject ? [selectedProject] : []}
                />
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </Container>
  );
}
