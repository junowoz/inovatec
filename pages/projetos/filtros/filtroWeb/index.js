import React, { useEffect, useState } from "react";
import { Accordion, Form, Row, Col, Card } from "react-bootstrap";

import tech from "components/projetos/filtros/tech";
import year from "components/projetos/filtros/year";
import industry from "components/projetos/filtros/industry";
import semester from "components/projetos/filtros/semester";
import course from "components/projetos/filtros/course";

import { filtersState } from "context/Filters/filtersState";

export default function FiltroWeb() {
  const [hydration, setHydration] = useState(false);

  useEffect(() => {
    setHydration(true);
  }, []);
  const setFilters = filtersState((state) => state.setFilters);
  const filters = filtersState((state) => state.filters);

  const Iters = (data, category) => {
    return (
      <>
        {data.map((option, index) => {
          // Verificar se a opcao pertence à categoria selecionada

          return (
            <Form.Check
              key={index}
              type={"checkbox"}
              id={option.id}
              name={option.id}
              label={option.label}
              value={option.id}
              defaultChecked={filters[category]?.includes(option.id)}
              onChange={(e) => {
                setFilters((prevFilters) => {
                  let filters = { ...prevFilters };
                  if (e.target.checked) {
                    filters[category] = [...filters[category], option.id];
                  } else {
                    filters[category] = filters[category].filter(
                      (filter) => filter !== option.id
                    );
                  }
                  return filters;
                });
              }}
            />
          );
        })}
      </>
    );
  };

  return hydration ? (
    <Card className="shadow-sm">
      <Card.Body>
        <Accordion
          defaultActiveKey={["0", "1", "2", "3", "4"]}
          flush
          alwaysOpen
        >
          {/* Start - Ano */}
          <Accordion.Item eventKey="0">
            <Accordion.Header className="py-0">
              <h5 className="fw-bolder fs-6">Ano</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(year, "year")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Ano */}

          {/* Start - Curso */}
          <Accordion.Item eventKey="1">
            <Accordion.Header className="py-0">
              <h5 className="fw-bolder fs-6">Curso</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(course, "course")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Curso */}

          {/* Start - Periodo */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Periodo</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(semester, "semester")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Periodo */}

          {/* Start - Indústria */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Indústria</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(industry, "industry")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Indústria */}

          {/* Start - Tecnologia */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Tecnologia</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(tech, "tech")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Tecnologia */}
        </Accordion>
      </Card.Body>
    </Card>
  ) : null;
}
