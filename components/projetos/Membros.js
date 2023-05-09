import { useProjetoState } from "context/useProjetoState";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaLinkedin } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const Membros = () => {
  const [hydration, setHydration] = useState(false);
  const { projectMembers } = useProjetoState();

  useEffect(() => {
    setHydration(true);
  }, []);

  // Contar fundadores
  const leaderCount = projectMembers.filter((member) => member.isLeader).length;

  // const parseMemberNames = (nameStr) => {
  //   return nameStr.replace(/{|}|"/g, "").split(",");
  // };

  const parseMemberNames = (nameStr) => {
  return nameStr
    .substring(1, nameStr.length - 1) // Remove os colchetes
    .split(',') // Separa os nomes por vírgula
    .map((name) => name.trim().replace(/"/g, '')); // Remove as aspas duplas e espaços em branco
};

  return !hydration ? (
    ""
  ) : (
    <Container>
      {/* CARD DOS FUNDADORES */}
      <Card.Title className="text-muted mb-2">
        {leaderCount > 1 ? "Fundadores" : "Fundador"}
      </Card.Title>

      <div className="mb-4">
        {projectMembers &&
          projectMembers
            .filter((member) => member.isLeader)
            .map((member, index) => (
              <Card className="mb-2" key={index}>
                <Card.Body>
                  <Row>
                    <Col xs="1">
                      <Card.Text>
                        <strong>
                          {member.contact.includes("linkedin") ? (
                            <a href={member.contact} target="blank">
                              <FaLinkedin />
                            </a>
                          ) : (
                            <a href={`mailto:${member.contact}`} target="blank">
                              <MdMail />
                            </a>
                          )}
                        </strong>
                      </Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>
                        <span>{parseMemberNames(member.name)}</span>
                        <br />
                        <span className="text-secondary">
                          {member.isFounder ? "Fundador" : "Cofundador"}
                          <br />
                        </span>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
      </div>
      {/* CARD DOS MEMBROS */}
      {projectMembers && projectMembers.some((member) => !member.isLeader) && (
        <div>
          <Card.Title className="text-muted mb-2">Membros</Card.Title>
          <Card>
            <Card.Body>
              {projectMembers
                .filter((member) => !member.isLeader)
                .flatMap((member, index) =>
                  parseMemberNames(member.name).map((name, i) => (
                    <span key={`${index}-${i}`}>
                      {name.trim()}
                      <br />
                    </span>
                  ))
                )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};
