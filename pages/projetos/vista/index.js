import { Card, Row, Col, Form } from "react-bootstrap";
import FiltroMobile from "../filtros/filtroMobile";
import GetProjetos from "./getProjetos";
import React, { useEffect, useState } from "react";
import { useProjetoState } from "context/useProjetoState";
import { useFiltroState } from "context/useFiltroState";

export default function Vista() {
  const [hydration, setHydration] = useState(false);
  const { projects, fetchProject } = useProjetoState();
  const { filters } = useFiltroState();

  // Inicializando searchTerm antes de usá-lo na filtragem de projetos
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProject();
    setHydration(true);
  }, [fetchProject]);

  // //Checkea si el proyecto esta activo
  // const activeProject = projects
  //   .filter((project) => project.status)
  //   .filter((project) =>
  //     project.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  // função para manipular a mudança na barra de pesquisa
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  //FILTERS
  const filterProjects = (project) => {
    const filterByCategory = (category) => {
      if (
        filters[category] &&
        Array.isArray(filters[category]) &&
        filters[category].length > 0
      ) {
        return filters[category].includes(project[category]);
      }
      return true;
    };

    return (
      project.status &&
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      filterByCategory("year") &&
      filterByCategory("course") &&
      filterByCategory("semester") &&
      filterByCategory("industry") &&
      filterByCategory("tech")
    );
  };

  // const activeProject = projects.filter(filterProjects);
  const activeProject =(projects || []).filter(filterProjects);

  return !hydration ? (
    ""
  ) : (
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
            {activeProject.length} resultados
          </span>
        </Col>
      </Row>

      {/* PROJETOS */}
      <GetProjetos projects={activeProject} />
    </div>
  );
}
