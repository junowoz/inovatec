import React, { useEffect, useState } from "react";
import { Accordion, Form, Card } from "react-bootstrap";
import { useInscreverState } from "context/useInscreverState";
import { useFiltroState } from "context/useFiltroState";

export default function FiltroWeb() {
  const [hydration, setHydration] = useState(false);
  const { setFilter } = useFiltroState();
  const {
    semesterData,
    courseData,
    yearData,
    techData,
    industryData,
    fetchData,
  } = useInscreverState();

  useEffect(() => {
    fetchData();
    setHydration(true);
  }, [fetchData]);

  const handleCheckboxChange = (filterType, value) => {
    setFilter(filterType, value);
  };

  const Iters = (filterType, value) => {
    return (
      <>
        <Form.Check
          type="checkbox"
          id="all"
          name="all"
          label="Todos"
          value="all"
          onChange={(e) => handleCheckboxChange(value, e.target.value)}
        />
        {filterType.map((index) => {
          return (
            <Form.Check
              key={index}
              type={"checkbox"}
              id={index.id}
              name={index.name}
              label={index.name}
              value={index.id}
              onChange={(e) => handleCheckboxChange(value, e.target.value)}
            />
          );
        })}
      </>
    );
  };
  


  return !hydration ? (
    ""
  ) : (
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
            <Accordion.Body>{Iters(yearData, "year")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Ano */}

          {/* Start - Curso */}
          <Accordion.Item eventKey="1">
            <Accordion.Header className="py-0">
              <h5 className="fw-bolder fs-6">Curso</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(courseData, "course")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Curso */}

          {/* Start - Periodo */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Periodo</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(semesterData, "semester")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Periodo */}

          {/* Start - Indústria */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Indústria</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(industryData, "industry")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Indústria */}

          {/* Start - Tecnologia */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Tecnologia</h5>
            </Accordion.Header>
            <Accordion.Body>{Iters(techData, "tech")}</Accordion.Body>
          </Accordion.Item>
          {/* End - Tecnologia */}
        </Accordion>
      </Card.Body>
    </Card>
  );
}
