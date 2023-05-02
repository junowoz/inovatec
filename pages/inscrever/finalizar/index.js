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
import Head from "next/head";

const schema = yup.object().shape({
  member: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        email: yup.string().when("isLeader", {
          is: true,
          then: yup
            .string()
            .required("Email é obrigatório para os líderes")
            .email("Email inválido"),
          otherwise: yup.string().email("Email inválido"),
        }),
        isLeader: yup.boolean(),
      })
    )
    .min(1, "Pelo menos um membro é necessário")
    .required("Membros são obrigatórios"),
});

export default function Finalizar() {
  const router = useRouter();
  const [hydration, setHydration] = useState(true);
  const { formData, submitData, submitMember } = useInscreverState();
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //ADD, DELETE CARDS, AND SET VALUES
  const [member, setMember] = useState([
    { id: randomNumber, name: "", email: "", isLeader: false },
  ]);

  const handleAddClick = () => {
    setMember([
      ...member,
      { id: randomNumber, name: "", email: "", isLeader: false },
    ]);
  };

  const handleRemoveClick = (index) => {
    const list = [...member];
    list.splice(index, 1);
    setMember(list);

    // Unregister fields
    unregister(`member.${index}.name`);
    unregister(`member.${index}.email`);
    unregister(`member.${index}.isLeader`);
  };

  // POSTAR TUDO
  const onSubmit = async (event) => {
    console.log(event);
    submitData(formData, member);
    router.push("/inscrever/sucesso");
  };

  //HYDRATION
  useEffect(() => {
    setHydration(false);
  }, []);

  return hydration ? (
    ""
  ) : (
    <Main>
      <Head>
        <title>Inovatec | Inscrever</title>
      </Head>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form onSubmit={handleSubmit(onSubmit)} className="py-5">
              <Progress2 />

              {/* MENSAGEM */}
              <Alert variant="primary">
                <Alert.Heading>
                  <FaUserPlus className="me-2" /> Adicione os membros do projeto
                </Alert.Heading>
                <p>
                  Insira os nomes dos membros do projeto abaixo. Se o membro for
                  um líder, marque a caixa de seleção "Líder", e insira o email
                  para contato.
                </p>
                <p>
                  Líderes são os responsáveis pelo projeto, membros são outros
                  integrantes do projeto.
                </p>
                <p>
                  Ao finalizar inscrição, simplesmente clique no botão
                  "Finalizar Inscrição".
                </p>
              </Alert>

              {/* MEMBROS */}
              {member.map((item, index) => (
                <Card className="p-3 mb-3" key={item.id}>
                  <Row className="align-items-center">
                    {/* MOBILE DELETE */}
                    <Col lg="1" className="d-block d-lg-none">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveClick(index)}
                        disabled={member.length === 1}
                        className="w-xs-0 w-100 mb-2 mb-lg-0"
                        size="md"
                      >
                        <FaTrash />
                      </Button>
                    </Col>

                    {/* NOME DO MEMBRO */}
                    <Col
                      lg={item.isLeader ? "5" : "10"}
                      className="mb-2 mb-lg-0"
                    >
                      <Form.Group controlId={`name${index}`}>
                        <Form.Control
                          type="text"
                          placeholder="Nome do membro"
                          {...register(`member.${index}.name`)}
                          value={item.name}
                          onChange={(e) => {
                            const updatedMember = [...member];
                            updatedMember[index].name = e.target.value;
                            setMember(updatedMember);
                          }}
                        />
                        <Form.Text className="text-danger">
                          {errors.member &&
                            errors.member[index] &&
                            errors.member[index].name?.message}
                        </Form.Text>
                      </Form.Group>
                    </Col>

                    {/* EMAIL PARA CONTATO */}
                    {item.isLeader && (
                      <Col lg="5" className="mb-2 mb-lg-0 mr-3">
                        <Form.Group
                          controlId={`email${index}`}
                          className="mt-2 m-sm-0"
                        >
                          <Form.Control
                            type="email"
                            placeholder="digite@email.com"
                            {...register(`member.${index}.email`)}
                            value={item.email}
                            onChange={(e) => {
                              const updatedMember = [...member];
                              updatedMember[index].email = e.target.value;
                              setMember(updatedMember);
                            }}
                          />
                          <Form.Text className="text-danger">
                            {errors.member &&
                              errors.member[index] &&
                              errors.member[index].email?.message}
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    )}

                    {/* BOTÃO EXCLUIR MEMBRO */}
                    <Col lg="1" className="d-none d-lg-block">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemoveClick(index)}
                        disabled={member.length === 1}
                        size="md"
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>

                  {/* CHECKBOX LÍDER */}
                  <Row lg="1">
                    <Form.Group controlId={`isLeader${index}`} className="mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Líder"
                        {...register(`member.${index}.isLeader`)}
                        checked={item.isLeader}
                        onChange={(e) => {
                          const updatedMember = [...member];
                          updatedMember[index].isLeader = e.target.checked;
                          // Unregister email field if not leader
                          if (!e.target.checked) {
                            updatedMember[index].email = "";
                            unregister(`member.${index}.email`);
                          }
                          setMember(updatedMember);
                        }}
                      />
                    </Form.Group>
                  </Row>
                </Card>
              ))}
              <Row className="align-items-center mt-2">
                <Col xl="8"></Col>
                <Col md="4">
                  <Button
                    variant="outline-primary"
                    style={{ minWidth: "150px" }}
                    onClick={handleAddClick}
                  >
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
