import React, { useState, useEffect } from "react";
import Main from "components/main";
import { FaUserPlus, FaTrash, FaCheck } from "react-icons/fa";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import Progress2 from "../progress/progress2";
import { Container } from "react-bootstrap";
import { useInscreverState } from "context/InscreverProjetos/InscreverState";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  members: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Nome é obrigatório"),
        role: yup.string().required("Função é obrigatória"),
        showContact: yup.boolean(),
        contact: yup
          .string()
          .email("Email inválido")
          .when("showContact", {
            is: true,
            then: yup.string().required("Contato é obrigatório"),
            otherwise: yup.string(),
          }),
      })
    )
    .min(1, "Pelo menos um membro com função e contato é necessário")
    .required("Membros são obrigatórios"),
});


export default function Finalizar() {
  const [hydration, setHydration] = useState(true);
  const router = useRouter();

  const {
    formData,
    members: membersData,
    submitData,
    roleData,
    fetchData,
  } = useInscreverState();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      members: [{ name: "", role: "", contact: "", showContact: false }],
    },
  });

  const [members, setMembers] = useState([
    { name: "", role: "", contact: "", showContact: false },
  ]);

  //OTHER FUNCTIONS
  const handleInputChange = (memberIndex, event) => {
    const newMembers = [...members];
    newMembers[memberIndex][event.target.name] = event.target.value;
    setMembers(newMembers);
    setValue(
      `members[${memberIndex}].${event.target.name}`,
      event.target.value
    );
    console.log(newMembers);
  };

  const handleAddClick = () => {
    const newMember = { name: "", role: "", contact: "", showContact: false };
    setMembers([...members, newMember]);
    const newMembers = [
      ...getValues("members"),
      newMember,
    ];
    setValue("members", newMembers);
  };
  
  const handleRemoveClick = (index) => {
    const newMembersLocal = members.filter((_, i) => i !== index);
    setMembers(newMembersLocal);
    const newMembersForm = getValues("members").filter((_, i) => i !== index);
    setValue("members", newMembersForm);
  };
  

  //POSTAR TUDO
  const handleOnSubmit = async (event) => {
    console.log(event);
    submitData(formData, members);
    router.push("/inscrever/sucesso");
    console.log(formData);
    console.log(members);
  };

  //HYDRATION
  useEffect(() => {
    fetchData();
    setHydration(false);
  }, []);

  return hydration ? (
    ""
  ) : (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit(handleOnSubmit)} className="py-5">
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

              {/* MEMBROS */}
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

                    {/* NOME DO MEMBRO */}
                    <Col lg="6">
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name={`members[${index}].name`}
                          placeholder="Nome do membro"
                          {...register(`members[${index}].name`)}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {errors.members &&
                          errors.members[index] &&
                          errors.members[index].name && (
                            <Form.Control.Feedback type="invalid">
                              {errors.members[index].name.message}
                            </Form.Control.Feedback>
                          )}
                      </Form.Group>
                    </Col>

                    {/* FUNÇÃO DO MEMBRO */}
                    <Col lg="5">
                      <Form.Group className="mt-2 mt-lg-0">
                        <Form.Select
                          name={`members[${index}].role`}
                          {...register(`members[${index}].role`)}
                          onChange={(event) => handleInputChange(index, event)}
                        >
                          <option value="">Escolher função</option>
                          {roleData.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Form.Select>
                        {errors.members &&
                          errors.members[index] &&
                          errors.members[index].role && (
                            <Form.Control.Feedback type="invalid">
                              {errors.members[index].role.message}
                            </Form.Control.Feedback>
                          )}
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

                  {/* ADICIONAR EMAIL PARA CONTATO */}
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

                  {/* EMAIL PARA CONTATO */}

                  {member.showContact && (
                    <Row className="mt-2">
                      <Col lg="11">
                        <Form.Group>
                          <Form.Control
                            type="email"
                            name={`members[${index}].contact`}
                            placeholder="Digite seu email"
                            {...register(`members[${index}].contact`)}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                          {errors.members &&
                            errors.members[index] &&
                            errors.members[index].contact && (
                              <Form.Control.Feedback type="invalid">
                                {errors.members[index].contact.message}
                              </Form.Control.Feedback>
                            )}
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
