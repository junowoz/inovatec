import React, { useEffect, useState } from "react";
import { Accordion, Form, Card } from "react-bootstrap";
import { useInscreverState } from "context/useInscreverState";
import { useFiltroState } from "context/useFiltroState";

export default function FiltroWeb() {
  const [hydration, setHydration] = useState(false);
  const { setFilter, filters } = useFiltroState();
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
  }, [fetchData, filters]);

  //VER MAIS
  const [isOpenYear, setIsOpenYear] = useState(true);
  const [isOpenCourse, setIsOpenCourse] = useState(true);
  const [isOpenSemester, setIsOpenSemester] = useState(true);
  const [isOpenIndustry, setIsOpenIndustry] = useState(true);
  const [isOpenTech, setIsOpenTech] = useState(true);

  const handleCheckboxChange = (category, id) => {
    setFilter(category, id);
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
              {(isOpenYear ? yearData : yearData.slice(0, 5)).map(
                (item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    label={item.name}
                    value={item.id}
                    onChange={(e) =>
                      handleCheckboxChange("year", e.target.value)
                    }
                  />
                )
              )}
              {yearData.length > 5 && (
                <span
                  className="text-primary clickable"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setIsOpenYear(!isOpenYear)}
                >
                  {isOpenYear ? "Ver menos" : "Ver mais"}
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Ano */}

          {/* Start - Curso */}
          <Accordion.Item eventKey="1">
            <Accordion.Header className="py-0">
              <h5 className="fw-bolder fs-6">Curso</h5>
            </Accordion.Header>
            <Accordion.Body>
              {(isOpenCourse ? courseData : courseData.slice(0, 5)).map(
                (item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    label={item.name}
                    value={item.id}
                    onChange={(e) =>
                      handleCheckboxChange("course", e.target.value)
                    }
                  />
                )
              )}
              {courseData.length > 5 && (
                <span
                  className="text-primary clickable"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setIsOpenCourse(!isOpenCourse)}
                >
                  {isOpenCourse ? "Ver menos" : "Ver mais"}
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Curso */}

          {/* Start - Período */}
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Período</h5>
            </Accordion.Header>
            <Accordion.Body>
              {(isOpenSemester ? semesterData : semesterData.slice(0, 5)).map(
                (item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    label={item.name}
                    value={item.id}
                    onChange={(e) =>
                      handleCheckboxChange("semester", e.target.value)
                    }
                  />
                )
              )}
              {semesterData.length > 5 && (
                <span
                  className="text-primary clickable"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setIsOpenSemester(!isOpenSemester)}
                >
                  {isOpenSemester ? "Ver menos" : "Ver mais"}
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Período */}

          {/* Start - Indústria */}
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Indústria</h5>
            </Accordion.Header>
            <Accordion.Body>
              {(isOpenIndustry ? industryData : industryData.slice(0, 5)).map(
                (item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    label={item.name}
                    value={item.id}
                    onChange={(e) =>
                      handleCheckboxChange("industry", e.target.value)
                    }
                  />
                )
              )}
              {industryData.length > 5 && (
                <span
                  className="text-primary clickable"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setIsOpenIndustry(!isOpenIndustry)}
                >
                  {isOpenIndustry ? "Ver menos" : "Ver mais"}
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Indústria */}

          {/* Start - Tecnologia */}
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h5 className="fw-bolder fs-6">Tecnologia</h5>
            </Accordion.Header>
            <Accordion.Body>
              {(isOpenTech ? techData : techData.slice(0, 5)).map(
                (item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={item.id}
                    name={item.name}
                    label={item.name}
                    value={item.id}
                    onChange={(e) =>
                      handleCheckboxChange("tech", e.target.value)
                    }
                  />
                )
              )}{" "}
              {techData.length > 5 && (
                <span
                  className="text-primary clickable"
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                  onClick={() => setIsOpenTech(!isOpenTech)}
                >
                  {isOpenTech ? "Ver menos" : "Ver mais"}
                </span>
              )}
            </Accordion.Body>
          </Accordion.Item>
          {/* End - Tecnologia */}
        </Accordion>
      </Card.Body>
    </Card>
  );
}
