import { useInscreverState } from "context/useInscreverState";
import { useProjetoState } from "context/useProjetoState";
import React, { useEffect, useState } from "react";
import { Badge, Card, Col, Image, Row } from "react-bootstrap";

export const CardIndex = () => {
  const [hydration, setHydration] = useState(false);
  const { techData, industryData, yearData } = useInscreverState();
  const { selectedProject } = useProjetoState();

  //MIDIA
  const CDN =
    "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/midia/";

  //GERA LOGO
  const logoImg =
    CDN + (JSON.parse(selectedProject.logoImg || "{}").path?.[0] || "");

  //MAPEANDO TECHS, INDUSTRY, YEAR
  const techMap = techData.reduce(
    (map, item) => ({ ...map, [item.id]: item.name }),
    {}
  );
  const industryMap = industryData.reduce(
    (map, item) => ({ ...map, [item.id]: item.name }),
    {}
  );
  const yearMap = yearData.reduce(
    (map, item) => ({ ...map, [item.id]: item.name }),
    {}
  );

  //ATRIBUINDO VALORES PARA CHAMAR O NAME
  const techName =
    selectedProject && selectedProject.tech
      ? techMap[selectedProject.tech]
      : null;
  const industryName =
    selectedProject && selectedProject.industry
      ? industryMap[selectedProject.industry]
      : null;
  const yearName =
    selectedProject && selectedProject.year
      ? yearMap[selectedProject.year]
      : null;

  useEffect(() => {
    setHydration(true);
  }, []);

  return !hydration ? (
    ""
  ) : (
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
        <Image
          src={logoImg}
          alt="logo"
          className="d-block mx-auto m-2 w-100"
          roundedCircle
          fluid
          style={{ border: "1px solid rgba(241, 241, 241, 0.07)" }}
        />
      </Col>
      <Col>
        <Card.Body>
          <h2>{selectedProject.name}</h2>
          <h5 className="mb-2 text-muted d-none d-sm-block">
            {selectedProject.slogan}
          </h5>
          <Badge pill bg="primary" className="me-1">
            {yearName}
          </Badge>
          <Badge pill bg="primary" className="me-1">
            {techName}
          </Badge>
          <Badge pill bg="primary" className="me-1">
            {industryName}
          </Badge>{" "}
        </Card.Body>
      </Col>
    </Row>
  );
};
