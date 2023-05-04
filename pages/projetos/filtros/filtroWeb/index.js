import React, { useEffect, useState } from "react";
import { Accordion, Form, Card } from "react-bootstrap";
import { useInscreverState } from "context/useInscreverState";
import { useFiltroState } from "context/useFiltroState";

export default function FiltroWeb() {
  const [hydration, setHydration] = useState(false);
  const {
    semesterData,
    courseData,
    yearData,
    techData,
    industryData,
    fetchData,
  } = useInscreverState();

  const setFilter = useFiltroState((state) => state.setFilter);
  const filters = useFiltroState((state) => state.filters);
  const [setAllSelected] = useState(true);

  useEffect(() => {
    setFilter("year", true);
    setFilter("course", true);
    setFilter("semester", true);
    setFilter("industry", true);
    setFilter("tech", true);

    fetchData();
    setHydration(true);
  }, []);

  const Iters = (data, setFilter, filters) => {
    const handleChange = (event) => {
      const { name, checked } = event.target;
      if (name === "all") {
        setFilter("year", checked);
        setFilter("course", checked);
        setFilter("semester", checked);
        setFilter("industry", checked);
        setFilter("tech", checked);
        setAllSelected(checked);
      } else {
        setFilter(name, checked);

        // Se qualquer filtro é desmarcado, desmarcamos o "all" também.
        if (!checked) {
          setAllSelected(false);
        }
      }
    };

    return (
      <>
        <Form.Check
          type="checkbox"
          id="all"
          name="all"
          label="Todos"
          value="all"
          onChange={handleChange}
          checked={filters.all || false}
        />
        {data.map((index) => {
          return (
            <Form.Check
              key={index}
              type={"checkbox"}
              id={index.id}
              name={index.name}
              label={index.name}
              value={index.id}
              onChange={handleChange}
              checked={filters[index.name] || false}
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
            <Accordion.Body>
              {Iters(yearData, setFilter, filters)}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Ano */}

          {/* Start - Curso */}
          <Accordion.Item eventKey="1">
            <Accordion.Header className="py-0">
              <h5 className="fw-bolder fs-6">Curso</h5>
            </Accordion.Header>
            <Accordion.Body>
              {Iters(courseData, setFilter, filters)}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Curso */}

          {/* Start - Periodo */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Periodo</h5>
            </Accordion.Header>
            <Accordion.Body>
              {Iters(semesterData, setFilter, filters)}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Periodo */}

          {/* Start - Indústria */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Indústria</h5>
            </Accordion.Header>
            <Accordion.Body>
              {Iters(industryData, setFilter, filters)}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Indústria */}

          {/* Start - Tecnologia */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Tecnologia</h5>
            </Accordion.Header>
            <Accordion.Body>
              {Iters(techData, setFilter, filters)}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Tecnologia */}
        </Accordion>
      </Card.Body>
    </Card>
  );
}
