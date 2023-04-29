import React, { useState, useEffect } from "react";
import Main from "components/main";
import { FaUserPlus, FaTrash, FaEnvelope, FaCheck } from "react-icons/fa";
import { Row, Col, Form, Button, Card, Alert, Modal } from "react-bootstrap";
import { useRouter } from "next/router";
import Progress2 from "../progress/progress2";
import { Container } from "react-bootstrap";
import { InscreverState } from "context/InscreverProjetos/InscreverState";
import { supabase } from "supabase/client";

export default function Submit() {
  //AQUI TRAGO A INFORMAÇAO ARMAZENADA DO FORMULARIO ANTERIOR.
  const { formData, members: membersData, submitData } = InscreverState();

  //ROUTER
  const router = useRouter();

  const [members, setMembers] = useState([
    { name: "", role: "", contact: "", showContact: false },
  ]);

  //FETCH ROLES
  const { roleData, fetchData } = InscreverState();

  useEffect(() => {
    fetchData();
  }, []);

  //OTHER FUNCTIONS
  const handleInputChange = (index, event) => {
    const values = [...members];
    values[index][event.target.name] = event.target.value;
    setMembers(values);
  };

  const handleAddClick = () => {
    setMembers([
      ...members,
      { name: "", role: "", contact: "", showContact: false },
    ]);
  };

  const handleRemoveClick = (index) => {
    const values = [...members];
    values.splice(index, 1);
    setMembers(values);
  };

  //SUBMISSAO
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Submeter dados
    submitData(formData, members);
    router.push("/inscrever/sucesso");
  };

  console.log(formData);

  return (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit} className="py-5">
              <Progress2 />
              <Alert variant="primary">
                <Alert.Heading>
                  <FaUserPlus className="me-2" /> Adicione os membros do projeto
                </Alert.Heading>
                <p>
                  Insira os nomes e funções dos membros do projeto abaixo. Você
                  também pode adicionar um contato para cada membro.
                </p>
                <p>
                  Ao finalizar inscrição, simplesmente clique no botão
                  "Finalizar Inscrição".
                </p>
              </Alert>
              {members.map((member, index) => (
                <Card className="p-3 mb-3" key={index}>
                  <Row className="align-items-center">
                    {/* Aparece o botão de excluir membro apenas em telas pequenas */}
                    <Col lg="1" className="d-block d-lg-none">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveClick(index)}
                        className="w-xs-0 w-100 mb-2 mb-lg-0"
                        size="sm"
                      >
                        <FaTrash />
                      </Button>
                    </Col>

                    <Col lg="6">
                      <Form.Group>
                        {/* <Form.Label>
                          <FaUserPlus /> Nome
                        </Form.Label> */}
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Nome do membro"
                          value={member.name}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg="5">
                      <Form.Group className="mt-2 mt-lg-0">
                        {/* <Form.Label>Função</Form.Label> */}
                        <Form.Select
                          name="role"
                          value={member.role}
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          <option value="">Escolher função</option>
                          {roleData.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Aparece o botão de excluir membro apenas em telas grandes */}
                    <Col lg="1" className="d-none d-lg-block">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveClick(index)}
                        className="mb-2 mb-lg-0 mx-auto"
                        size="sm"
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col lg="8">
                      <Form.Check
                        type="checkbox"
                        label="Adicionar email para contato"
                        onChange={() => {
                          const values = [...members];
                          values[index].showContact =
                            !values[index].showContact;
                          setMembers(values);
                        }}
                      />
                    </Col>
                  </Row>

                  {member.showContact && (
                    <Row className="mt-2">
                      <Col lg="11">
                        <Form.Group>
                          <Form.Control
                            type="email"
                            name="contact"
                            placeholder="Digite seu email"
                            value={member.contact}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                </Card>
              ))}
              <Row className="align-items-center mt-2">
                <Col md="8"></Col>
                <Col md="4">
                  <Button variant="outline-primary" onClick={handleAddClick}>
                    <FaUserPlus className="me-1" /> Adicionar membro
                  </Button>
                </Col>
              </Row>
              <Row className="align-items-center mt-4">
                <Col>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2"
                    size="md"
                  >
                    <FaCheck /> Finalizar Inscrição
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
