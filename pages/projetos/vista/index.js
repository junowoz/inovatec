import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import FiltroMobile from "../filtros/filtroMobile";
import GetProjetos from "./getProjetos";
import { useEffect, useState } from "react";
import { useProjetoState } from "context/useProjetoState";

export default function Vista() {
  const { projects, fetchProjects } = useProjetoState();

  // Inicializando searchTerm antes de usá-lo na filtragem de projetos
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects
    .filter((project) => project.status)
    .filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // função para manipular a mudança na barra de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Card className="lg w-100" style={{ width: "auto" }}>
        <Card.Body>
          <Row className="align-items-center">
            {/* NavBar */}
            <div className="d-flex col align-items-baseline">
              {/* Search */}
              <Form.Control
                className="d-flex flex-grow-1"
                type="search"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ borderRadius: "0.375rem" }}
              />
            </div>
          </Row>
        </Card.Body>
      </Card>

      {/* FiltroMobile */}
      <FiltroMobile className="d-block d-xl-none justify-content-center mt-4 mt-md-4" />
      {/* End FiltroMobile */}

      <Row className="mt-4 mt-md-3 mb-3 align-items-center justify-content-between">
        {/* NUMERO DE RESULTADOS */}
        <Col sm="3">
          <span className="text-secondary">
            {filteredProjects.length} resultados
          </span>
        </Col>
      </Row>

      {/* PROJETOS */}
      <GetProjetos projects={filteredProjects} />
    </div>
  );
}
