import React, { useState, useEffect } from "react";
import Main from "components/main";
import { FaUserPlus, FaTrash, FaCheck } from "react-icons/fa";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { useRouter } from "next/router";
import ProgressFinalizar from "components/inscrever/progressFinalizar";
import { Container } from "react-bootstrap";
import { useInscreverState } from "context/useInscreverState";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Head from "next/head";
import { BsChevronLeft } from "react-icons/bs";
import { MembrosMensagem } from "components/inscrever/membrosMensagem";

import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const linkedinRegex =
  /^https?:\/\/(www\.)?linkedin\.com\/(in\/[^/]+|pub\/[^/]+(\/[A-Za-z]+[0-9]+)?\/[0-9]+)$/i;

const schema = yup.object().shape({
  commonMembers: yup
    .array()
    .of(yup.string().required("Nome obrigatório"))
    .min(1, "Pelo menos um membro é necessário")
    .required("Membros são obrigatórios"),
  member: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        contact: yup
          .string()
          .required("Contato é obrigatório")
          .matches(
            emailRegex || linkedinRegex,
            "Contato inválido, insira um e-mail válido ou um link do LinkedIn"
          ),
        isFounder: yup.boolean(),
      })
    )
    .min(1, "Pelo menos um membro é necessário")
    .required("Membros são obrigatórios"),
});

export default function InscreverFinalizar() {
  const router = useRouter();
  const [hydration, setHydration] = useState(false);
  const { formData, submitData, resetFormData } = useInscreverState();
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const [commonMembers, setCommonMembers] = useState([]);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [member, setMember] = useState([
    { id: randomNumber, name: "", contact: "", isFounder: true },
  ]);

  const handleAddClick = () => {
    if (member.length < 6) {
      setMember([
        ...member,
        { id: randomNumber, name: "", contact: "", isFounder: false },
      ]);
    }
  };

  const handleRemoveClick = (index) => {
    if (index !== 0) {
      const list = [...member];
      list.splice(index, 1);
      setMember(list);
      // Unregister fields
      unregister(`member.${index}.name`);
      unregister(`member.${index}.contact`);
    }
  };

  const onSubmit = async (event) => {
    console.log(event);
    submitData(formData, member);
    router.push("/inscrever/sucesso");
    resetFormData();
  };

  const handleBack = () => {
    router.push("/inscrever/tres");
  };

  useEffect(() => {
    setHydration(true);
  }, []);

  return !hydration ? (
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
              <ProgressFinalizar />
              <MembrosMensagem />

              {/* MEMBROS - isLeader = FALSE*/}
              <h5 className="text-secondary">Membros</h5>
              <Card className="p-3 mb-3">
                <Row>
                  <Col>
                    <TagsInput
                      value={commonMembers}
                      onChange={(tags) => setCommonMembers(tags)}
                      inputProps={{
                        placeholder: "Nomes",
                        ...register("???? o que coloco aqui?"),
                      }}
                    />
                  </Col>
                </Row>
              </Card>
              {/* END MEMBROS */}

              {/* FUNDADORES */}
              <h5 className="text-secondary">Fundadores</h5>

              {member.map((item, index) => (
                <Card className="p-3 mb-3" key={item.id}>
                  {/* ROW MASTER */}
                  <Row className="align-items-center">
                    {/* COL 1 ( NAME, CONTACT, ISFOUNDER?)*/}
                    <Col lg={10}>
                      {/* ROW 1 INSIDE COL 1 (NAME, ISFOUNDER?) */}
                      <Row>
                        <Col lg={5} className="mb-2 mb-lg-0">
                          <Form.Group controlId={`name${index}`}>
                            <Form.Control
                              type="text"
                              placeholder="Nome"
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

                        <Col>
                          <ButtonGroup className="w-100">
                            <ToggleButton
                              id={`radio-founder-${index}`}
                              type="radio"
                              variant="outline-primary"
                              name={`member.${index}.isFounder`}
                              value={true}
                              checked={item.isFounder}
                              onChange={(e) => {
                                const updatedMember = [...member];
                                updatedMember[index].isFounder =
                                  e.currentTarget.value === "true";
                                setMember(updatedMember);
                              }}
                            >
                              Fundador
                            </ToggleButton>
                            <ToggleButton
                              id={`radio-cofounder-${index}`}
                              type="radio"
                              variant="outline-primary"
                              name={`member.${index}.isFounder`}
                              value={false}
                              checked={!item.isFounder}
                              onChange={(e) => {
                                const updatedMember = [...member];
                                updatedMember[index].isFounder =
                                  e.currentTarget.value === "true";
                                setMember(updatedMember);
                              }}
                            >
                              Cofundador
                            </ToggleButton>
                          </ButtonGroup>
                        </Col>
                      </Row>

                      {/* ROW 2 INSIDE COL 1 (CONTACT) */}
                      <Row>
                        <Col className="my-2 mr-3">
                          <Form.Group controlId={`contact${index}`}>
                            <Form.Control
                              type="text"
                              placeholder="LinkedIn ou Email"
                              {...register(`member.${index}.contact`)}
                              value={item.contact}
                              onChange={(e) => {
                                const updatedMember = [...member];
                                updatedMember[index].contact = e.target.value;
                                setMember(updatedMember);
                              }}
                            />
                            <Form.Text className="text-danger">
                              {errors.member &&
                                errors.member[index] &&
                                errors.member[index].contact?.message}
                            </Form.Text>
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    {/* END COL 1 */}

                    {/* COL 2 - BOTÃO EXCLUIR MEMBRO */}
                    {/* COL 2 - BOTÃO EXCLUIR MEMBRO */}
                    <Col className="d-none d-lg-flex align-items-center justify-content-center">
                      <Button
                        variant=""
                        className="border-0 w-100"
                        onClick={() => handleRemoveClick(index)}
                        disabled={index === 0 || member.length === 1}
                        size="md"
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                  {/* END ROW MASTER */}

                  {/* MOBILE DELETE */}
                  <Col className="d-block d-lg-none">
                    <Button
                      variant=""
                      onClick={() => handleRemoveClick(index)}
                      disabled={index === 0 || member.length === 1}
                      className="w-xs-0 w-100 mb-2 mb-lg-0 border-0"
                      size="md"
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Card>
              ))}

              <Row className="align-items-center mt-2">
                <Col>
                  <div className="d-flex justify-content-between">
                    <div></div>

                    <Button
                      variant="outline-primary"
                      style={{ minWidth: "150px" }}
                      onClick={handleAddClick}
                      disabled={member.length >= 6}
                    >
                      <FaUserPlus className="me-1" /> Adicionar Fundador
                    </Button>
                  </div>
                </Col>
              </Row>

              <Row className="align-items-center mt-4">
                <Col>
                  {/* Atras e Finalizar */}
                  <div className="d-flex justify-content-between pt-3">
                    <Button variant="outline-primary" onClick={handleBack}>
                      <BsChevronLeft
                        size={18}
                        className="me-1 align-items-center"
                      />
                      Voltar
                    </Button>
                    <div></div>
                    <Button
                      variant="primary"
                      type="submit"
                      className="py-2"
                      size="md"
                    >
                      <FaCheck /> Finalizar Inscrição
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Main>
  );
}
