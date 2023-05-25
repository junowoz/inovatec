import { useInscreverState } from "context/useInscreverState";
import { useProjetoState } from "context/useProjetoState";
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";

export const CardSecundario = () => {
  const [hydration, setHydration] = useState(false);
  const { yearData, courseData, semesterData } = useInscreverState();
  const { selectedProject } = useProjetoState();

  //MAPEANDO  YEAR, COURSE E SEMESTER

  const yearMap = yearData.reduce(
    (map, item) => ({ ...map, [item.id]: item.name }),
    {}
  );
  const courseMap = courseData.reduce(
    (map, item) => ({ ...map, [item.id]: item.name }),
    {}
  );
  const semesterMap = semesterData.reduce(
    (map, item) => ({ ...map, [item.id]: item.name }),
    {}
  );

  //ATRIBUINDO VALORES PARA CHAMAR O NAME
  const yearName =
    selectedProject && selectedProject.year
      ? yearMap[selectedProject.year]
      : null;
  const courseName =
    selectedProject && selectedProject.course
      ? courseMap[selectedProject.course]
      : null;
  const semesterName =
    selectedProject && selectedProject.semester
      ? semesterMap[selectedProject.semester]
      : null;

  useEffect(() => {
    setHydration(true);
  }, []);

  return !hydration ? (
    ""
  ) : (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{selectedProject.name}</Card.Title>
          <Card.Text>
            <span>Ano: </span> {yearName}
            <br />
            <span>Curso: </span> {courseName}
            <br />
            <span>Período: </span> {semesterName}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
