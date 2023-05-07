import React, { useEffect, useState } from "react";
import { Card, Badge, Row, Col, Image, Pagination } from "react-bootstrap";
import Link from "next/link";
import Relleno from "utils/relleno";
import { useInscreverState } from "context/useInscreverState";
import { useProjetoState } from "context/useProjetoState";
import PropTypes from "prop-types";

export default function GetProjetos({ projects }) {
  const [hydration, setHydration] = useState(false);
  const { fetchProject } = useProjetoState();
  const { techData, industryData, yearData } = useInscreverState();
  const CDN =
    "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/midia/";

  //PAGINAS
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  //USEFFECT
  useEffect(() => {
    fetchProject();
    setHydration(true);
  }, []);

  // Obter projetos atuais
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Alterar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gerar número de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projects.length / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return !hydration ? (
    ""
  ) : (
    <div>
      {currentProjects
        .filter((project) => project.status)
        .map((project) => {
          //GERA URL PARA LOGO
          const logoImg =
            CDN + (JSON.parse(project.logoImg || "{}").path?.[0] || "");

          //TRAZ O NOME DA TECH, INDUSTRY E YEAR
          const techName =
            techData.find((tech) => tech.id === project.tech)?.name || "";
          const industryName =
            industryData.find((industry) => industry.id === project.industry)
              ?.name || "";
          const yearName =
            yearData.find((year) => year.id === project.year)?.name || "";

          return (
            <Link href={`/projetos/${project.name}`} key={project.id}>
              <Card
                className="mb-3 mt-4 mt-xl-0"
                style={{ transition: "0.1s" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.filter = "brightness(97%)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.filter = "")}
              >
                <Card.Body>
                  <Row className="align-items-center">
                    <Col
                      xs={5}
                      sm={4}
                      md={3}
                      lg={3}
                      xl={2}
                      xxl={2}
                      className="align-items-center justify-content-center"
                    >
                      {/* LOGO */}
                      <Image
                        src={logoImg}
                        className="d-block mx-auto m-2 w-100"
                        roundedCircle
                        fluid
                      />
                    </Col>
                    <Col>
                      {/* NOME */}
                      <Card.Title className="text-black">
                        {project.name}
                      </Card.Title>
                      {/* SLOGAN */}
                      <Card.Text className="text-secondary">
                        {project.slogan}
                      </Card.Text>
                      {/* TAGS */}
                      <Badge pill bg="secondary" className="me-1">
                        {yearName}
                      </Badge>{" "}
                      <Badge pill bg="primary" className="me-1">
                        {techName}
                      </Badge>
                      <Badge pill bg="info">
                        {industryName}
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Link>
          );
        })}
      <Relleno />

      {/* Paginação */}
      <Pagination>
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => paginate(number)}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

GetProjetos.propTypes = {
  projects: PropTypes.array.isRequired,
};

// // function filteredData(data, filters) {
// //   return data.filter((datum) => {
// //     let passesFilter = true;

// //     if (filters.country?.length > 0 && !filters.country.includes(datum.country)) {
// //       passesFilter = false;
// //     }

// //     if (filters.category?.length > 0 && !filters.category.includes(datum.propiedades.category)) {
// //       passesFilter = false;
// //     }

// //     if (filters.subcategory?.length > 0 && !filters.subcategory.includes(datum.propiedades.subcategory)) {
// //       passesFilter = false;
// //     }

// //     if (filters.size?.length > 0 && !filters.size.includes(datum.size)) {
// //       passesFilter = false;
// //     }

// //     if (filters.brands?.length > 0 && !filters.brands.includes(datum.propiedades.brand)) {
// //       passesFilter = false;
// //     }

// //     if (filters.materials?.length > 0 && !filters.materials.includes(datum.propiedades.material)) {
// //       passesFilter = false;
// //     }

// //     if (filters.suspension?.length > 0 && !filters.suspension.includes(datum.propiedades.suspension)) {
// //       passesFilter = false;
// //     }

// //     if (filters.frenos?.length > 0 && !filters.frenos.includes(datum.propiedades.freno)) {
// //       passesFilter = false;
// //     }

// //     if (filters?.rines?.length > 0 && !filters.rines.includes(datum.propiedades.rine)) {
// //       passesFilter = false;
// //     }

// //     if (filters?.years?.length > 0 && !filters.years.includes(datum.year)) {
// //       passesFilter = false;
// //     }

// //     if (filters?.minPrice !== null && datum.price < filters.minPrice) {
// //       passesFilter = false;
// //     }

// //     if (filters?.maxPrice !== null && datum.price > filters.maxPrice) {
// //       passesFilter = false;
// //     }

// //     return passesFilter;
// //   });
// // }
