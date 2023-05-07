import { useProjetoState } from "context/useProjetoState";
import Link from "next/link";
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

  return !hydration ? (
    ""
  ) : (
    <Container>
      {/* CARD DOS LIDERES */}
      <Card.Title className="text-muted mb-2">Líderes</Card.Title>
      <Card className="mb-4">
        <Card.Body>
          {projectMembers &&
            projectMembers
              .filter((member) => member.isLeader)
              .map((member, index) => (
                <Row key={index}>
                  <Col xs="1">
                    <Card.Text>
                      <strong>
                        {member.contact.includes("linkedin") ? (
                          <Link href={member.contact} target="blank">
                            <FaLinkedin />
                          </Link>
                        ) : (
                          <Link
                            href={`mailto:${member.contact}`}
                            target="blank"
                          >
                            <MdMail />
                          </Link>
                        )}
                      </strong>
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>{member.name}</strong>
                    </Card.Text>
                  </Col>
                </Row>
              ))}
        </Card.Body>
      </Card>

      {/* CARD DOS MEMBROS */}
      {projectMembers && projectMembers.some((member) => !member.isLeader) && (
        <div>
          <Card.Title className="text-muted mb-2">Membros</Card.Title>
          <Card>
            <Card.Body>
              {projectMembers &&
                projectMembers
                  .filter((member) => !member.isLeader)
                  .map((member, index) => (
                    <Row key={index}>
                      <Col xs="8">
                        <Card.Text>
                          <strong>{member.name}</strong>
                        </Card.Text>
                      </Col>
                    </Row>
                  ))}
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};
