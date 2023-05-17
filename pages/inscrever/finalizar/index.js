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
  Spinner,
  OverlayTrigger,
  Tooltip,
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
import InscreverSucesso from "../../../components/inscrever/InscreverSucesso";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const linkedinRegex = /linkedin\./i;

const contactValidation = (value) => {
  if (emailRegex.test(value) || linkedinRegex.test(value)) {
    return true;
  }
  return false;
};

const schema = yup.object().shape({
  commonMember: yup
    .array()
    .min(1, "Pelo menos um membro é necessário")
    .required("Membros comuns são obrigatórios"),

  leaderMember: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        contact: yup
          .string()
          .required("Contato é obrigatório")
          .test(
            "contactValidation",
            "Contato inválido, insira um e-mail válido ou um link do LinkedIn",
            contactValidation
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
  const [isLoading, setIsLoading] = useState(false); // Crie um novo estado para controlar o carregamento
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const [commonMember, setCommonMember] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [leaderMember, setLeaderMember] = useState([
    { id: randomNumber, name: "", contact: "", isFounder: true },
  ]);

  //ALTERACOES DE TAGS
  const maxLength = 45; // Escolha o comprimento máximo desejado para um nome

  const isTagValid = (tag) => {
    return tag.length <= maxLength;
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const names = pastedText.split(/,|\r\n|\n/).map((name) => name.trim());
    const newNames = names.slice(0, 50 - commonMember.length);
    setCommonMember([...commonMember, ...newNames]);
  };

  //REMOVE LEADER CARD
  const handleRemoveClick = (index) => {
    if (index !== 0) {
      const list = [...leaderMember];
      list.splice(index, 1);
      setLeaderMember(list);
      // Unregister fields
      unregister(`leaderMember.${index}.name`);
      unregister(`leaderMember.${index}.contact`);
      unregister(`leaderMember.${index}.isFounder`);
    }
  };

  //ADD LEADER CARD
  const handleAddClick = () => {
    if (leaderMember.length < 10) {
      const newRandomNumber = Math.floor(Math.random() * 100) + 1;
      setLeaderMember([
        ...leaderMember,
        { id: newRandomNumber, name: "", contact: "", isFounder: false },
      ]);
    }
  };

  //Efeito colateral para verificar a validade do formulário sempre que formData ou leaderMember forem alterados.
  useEffect(() => {
    //VERIFICAR SE TUDO ESTÁ PREENCHIDO
    const checkFormValidity = () => {
      if (
        Object.keys(formData).length > 0 &&
        leaderMember.some(
          (item) => item.name.trim() !== "" && item.contact.trim() !== ""
        )
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [formData, leaderMember]);

  //REGISTRAR E ATUALIZAR COMMOM MEMBER
  useEffect(() => {
    register("commonMember");

    // Atualizar o campo commonMember no React Hook Form quando o estado local mudar
    setValue("commonMember", commonMember);
    trigger("commonMember");

    return () => {
      unregister("commonMember");
    };
  }, [commonMember, register, setValue, trigger, unregister]);

  //SUBMIT
  const onSubmit = async () => {
    setSubmitAttempted(true);
    if (!isFormValid) {
      return;
    }

    setIsLoading(true); // Defina o estado de carregamento como verdadeiro ao enviar
    await submitData(formData, leaderMember, commonMember);
    setIsLoading(false); // Defina o estado de carregamento como falso após a conclusão
    resetFormData();
    localStorage.removeItem("leaderMemberData");
    localStorage.removeItem("commonMemberData");

    setShowSuccess(true);
  };

  // IR PARA ATRAS
  const handleBack = () => {
    localStorage.setItem("leaderMemberData", JSON.stringify(leaderMember));
    localStorage.setItem("commonMemberData", JSON.stringify(commonMember));
    router.push("/inscrever/tres");
  };

  //HA DADOS NO ARMAZENAMENTO LOCAL?
  useEffect(() => {
    const storedLeaderMemberData = localStorage.getItem("leaderMemberData");
    const storedCommonMemberData = localStorage.getItem("commonMemberData");

    if (storedLeaderMemberData) {
      setLeaderMember(JSON.parse(storedLeaderMemberData));
    }
    if (storedCommonMemberData) {
      setCommonMember(JSON.parse(storedCommonMemberData));
    }
  }, []);

  //SE FOR PARA QUALQUER PAGINA, PERDE AS INFOS
  useEffect(() => {
    //RESET MEMBERS
    const resetMemberData = () => {
      setLeaderMember([
        { id: randomNumber, name: "", contact: "", isFounder: true },
      ]);
      setCommonMember([]);
    };
    const handleRouteChange = (url) => {
      if (url !== "/inscrever/tres" && url !== "/inscrever/sucesso") {
        resetFormData();
        resetMemberData();
        localStorage.removeItem("leaderMemberData");
        localStorage.removeItem("commonMemberData");
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, randomNumber, resetFormData]);

  //HIDRATAR O SITE PELO ZUSTAND

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
        {!showSuccess ? (
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
                        value={commonMember}
                        onChange={(tags) => {
                          if (tags.length <= 50) {
                            setCommonMember(tags);
                          }
                        }}
                        inputProps={{
                          placeholder: "Nomes dos membros",
                          style: { minWidth: "360px" },
                          onPaste: handlePaste, // Adicionado manipulador de eventos onPaste
                        }}
                        addKeys={[188, 13]} // Adicionado o código da tecla Enter (13)
                        validate={isTagValid} // Adicionado função de validação personalizada
                      />
                    </Col>
                    <Form.Text className="text-secondary">
                      {errors.commonMember && errors.commonMember.message}
                    </Form.Text>
                  </Row>
                </Card>
                {/* END MEMBROS */}

                {/* FUNDADORES */}
                <h5 className="text-secondary">Fundadores</h5>

                {leaderMember.map((item, index) => (
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
                                {...register(`leaderMember.${index}.name`)}
                                value={item.name}
                                onChange={(e) => {
                                  const updatedLeaderMember = [...leaderMember];
                                  updatedLeaderMember[index].name =
                                    e.target.value;
                                  setLeaderMember(updatedLeaderMember);
                                }}
                              />
                              <Form.Text className="text-danger">
                                {errors.leaderMember &&
                                  errors.leaderMember[index] &&
                                  errors.leaderMember[index].name?.message}
                              </Form.Text>
                            </Form.Group>
                          </Col>

                          <Col>
                            <ButtonGroup className="w-100">
                              <ToggleButton
                                id={`founder${index}`}
                                type="radio"
                                variant="outline-primary"
                                name={`leaderMember.${index}.isFounder`}
                                value={true}
                                checked={item.isFounder}
                                onChange={(e) => {
                                  const updatedLeaderMember = [...leaderMember];
                                  updatedLeaderMember[index].isFounder =
                                    e.currentTarget.value;
                                  setLeaderMember(updatedLeaderMember);
                                }}
                                {...register(
                                  `leaderMember.${index}.isFounder`,
                                  {
                                    value: item.isFounder,
                                  }
                                )}
                              >
                                Fundador
                              </ToggleButton>
                              <ToggleButton
                                id={`cofounder${index}`}
                                type="radio"
                                variant="outline-primary"
                                name={`leaderMember.${index}.isFounder`}
                                value={false}
                                checked={!item.isFounder}
                                onChange={(e) => {
                                  const updatedLeaderMember = [...leaderMember];
                                  updatedLeaderMember[index].isFounder =
                                    e.currentTarget.value;
                                  setLeaderMember(updatedLeaderMember);
                                }}
                                {...register(`leaderMember.${index}.isFounder`)}
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
                                {...register(`leaderMember.${index}.contact`)}
                                value={item.contact}
                                onChange={(e) => {
                                  const updatedLeaderMember = [...leaderMember];
                                  updatedLeaderMember[index].contact =
                                    e.target.value;
                                  setLeaderMember(updatedLeaderMember);
                                }}
                              />
                              <Form.Text className="text-danger">
                                {errors.leaderMember &&
                                  errors.leaderMember[index] &&
                                  errors.leaderMember[index].contact?.message}
                              </Form.Text>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Col>
                      {/* END COL 1 */}

                      {/* COL 2 - BOTÃO EXCLUIR MEMBRO */}
                      <Col className="d-none d-lg-flex align-items-center justify-content-center">
                        <Button
                          variant=""
                          className="border-0 w-100"
                          onClick={() => handleRemoveClick(index)}
                          disabled={index === 0 || leaderMember.length === 1}
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
                        disabled={index === 0 || leaderMember.length === 1}
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
                        disabled={leaderMember.length >= 10}
                      >
                        <FaUserPlus className="me-1" /> Adicionar
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
                      {isFormValid ? (
                        <Button
                          variant="primary"
                          type="submit"
                          className="py-2"
                          size="md"
                          disabled={!isFormValid}
                        >
                          {isLoading ? (
                            <Spinner
                              animation="border"
                              size="sm"
                              className="me-2"
                            />
                          ) : (
                            <FaCheck className="me-2" />
                          )}
                          Finalizar Inscrição
                        </Button>
                      ) : (
                        <OverlayTrigger
                          key="right"
                          placement="right"
                          overlay={
                            <Tooltip id={`tooltip-right`}>
                              Preencha todo o formulário para enviar a
                              inscrição.
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Button
                              variant="primary"
                              type="submit"
                              className="py-2"
                              size="md"
                              disabled
                            >
                              <FaCheck className="me-2" />
                              Finalizar Inscrição
                            </Button>
                          </span>
                        </OverlayTrigger>
                      )}
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        ) : (
          // Conteúdo da mensagem de sucesso
          <InscreverSucesso />
        )}
      </Container>
    </Main>
  );
}
