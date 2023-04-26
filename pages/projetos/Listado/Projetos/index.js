import React from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import GetProjetos from "./projetos";
import FiltersMobile from "../FiltersMobile";
import { useEffect, useState } from "react";

export default function Projetos() {
  const [numResultados, setNumResultados] = useState(0);
  useEffect(() => {
    const numProjetos = GetProjetos().length;
    setNumResultados(numProjetos);
  }, []);

  return (
    <div>
      <Card className="lg w-100 p-2" style={{ width: "auto" }}>
        <Card.Body>
          <Row className=" align-items-center">
            {/* NavBar */}
            <div className="d-flex col align-items-baseline mx-2">
              {/* Search */}
              <Form.Control
                className="d-flex flex-grow-1"
                type="search"
                placeholder="Pesquisar..."
                style={{ borderRadius: "0.375rem" }}
              />
            </div>
          </Row>
        </Card.Body>
      </Card>

      {/* FiltersMobile */}
      <div className="justify-content-center mt-4">
        <FiltersMobile className="d-block d-xl-none" />
      </div>
      {/* End FiltersMobile */}

      <Row className="mt-3 d-none d-xl-flex align-items-center justify-content-between">
        <Col sm="3">
          <span className="text-secondary">{numResultados} Resultados</span>
        </Col>
      </Row>
      <GetProjetos />
    </div>
  );
}
