import React, { useEffect, useState } from "react";
import Main from "components/main";
import {
  Row,
  Form,
  Col,
  Container,
  Button,
  Card,
  FloatingLabel,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useInscreverState } from "context/useInscreverState";

import Head from "next/head";
import { useRouter } from "next/router";
import Progress from "components/inscrever/progress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextareaAutosize from "react-textarea-autosize";

import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "O nome deve ter mais de 2 caracteres.")
    .max(50, "O nome deve ter menos de 50 caracteres.")
    .required("Nome requerido"),
  slogan: yup
    .string()
    .min(10, "O slogan deve ter mais de 10 caracteres.")
    .max(100, "O slogan deve ter menos de 100 caracteres.")
    .required("Descrição requerida"),
  projectDescription: yup
    .string()
    .min(10, "A descrição deve ter mais de 10 caracteres.")
    .max(1000, "A descrição deve ter menos de 1000 caracteres.")
    .required("Descrição requerida"),
  targetAudience: yup
    .string()
    .min(10, "A descrição do público-alvo deve ter mais de 10 caracteres.")
    .max(500, "A descrição do público-alvo deve ter menos de 500 caracteres.")
    .required("Descrição do público-alvo requerida"),

  productDescription: yup
    .string()
    .min(10, "A descrição do produto deve ter mais de 10 caracteres.")
    .max(1000, "A descrição do produto deve ter menos de 1000 caracteres.")
    .required("Descrição do produto requerida"),
  projectViability: yup
    .string()
    .min(
      10,
      "A descrição da viabilidade do projeto deve ter mais de 10 caracteres."
    )
    .max(
      1000,
      "A descrição da viabilidade do projeto deve ter menos de 1000 caracteres."
    )
    .required("Descrição da viabilidade do projeto requerida"),
  link: yup.string().max(1000, "O link deve ter menos de 1000 caracteres."),
});

export default function InscreverUm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hydration, setHydration] = useState(false);
  const { setFormData, resetFormData, formData } = useInscreverState();

  // OUTROS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: formData.name || "",
      slogan: formData.slogan || "",
      projectDescription: formData.projectDescription || "",
      targetAudience: formData.targetAudience || "",
      productDescription: formData.productDescription || "",
      projectViability: formData.projectViability || "",
      link: formData.link || "",
    },
  });

  //SUBMIT
  const handleOnSubmit = async (items) => {
    setIsLoading(true);
    setFormData(items);
    setIsLoading(false);
    router.push("/inscrever/dois");
  };

  //CLEARINFO
  const handleExit = () => {
    resetFormData();
    router.push("/inscrever");
  };

  //HYDRATION
  useEffect(() => {
    setHydration(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== "/inscrever/dois") {
        resetFormData();
      }
    };
  
    router.events.on("routeChangeStart", handleRouteChange);
  
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, resetFormData]);
  

  return !hydration ? (
    ""
  ) : (
    <Main>
      <Head>
        <title>Inovatec | Inscrever</title>
      </Head>

      <Container>
        <Form
          className="py-5"
          noValidate
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Row className="justify-content-md-center">
            <Col md="8" xl="6">
              <Progress />

              <div className="my-4">
                <div>
                  <h5 className="mt-2">
                    Todos os campos são obrigatórios{" "}
                    <span className="text-danger">*</span>
                  </h5>
                  <h6 className="text-muted mb-4">
                    Se tiver dúvidas sobre o que escrever, passe o mouse sobre o
                    campo selecionado para obter dicas.
                  </h6>
                </div>

                {/* CARD 1 */}
                <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Informaçōes Básicas
                  </Card.Title>

                  {/* Nome */}
                  <Form.Group className="mb-3" controlId="nome">
                    <FloatingLabel label="Nome do Projeto">
                      <Form.Control
                        type="text"
                        placeholder="Digite o nome do projeto..."
                        name="name"
                        isInvalid={!!errors.name}
                        {...register("name")}
                      />
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Slogan */}
                  <Form.Group className="mb-3" controlId="">
                    <FloatingLabel label="Slogan">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Breve introdução ao propósito da empresa. Para o
                            iFood seria: &quot;Marketplace de delivery de comida
                            e compras.&quot;
                            <hr />
                            Min: 10 caracteres
                            <br />
                            Máx: 100 caracteres
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="Descreva o projeto em menos de 50 caracteres...."
                          name="slogan"
                          isInvalid={!!errors.slogan}
                          {...register("slogan")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.slogan?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Description - Project */}
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Descrição do Projeto">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Forneça um resumo conciso de seu projeto, incluindo
                            o que ele faz, que problema está resolvendo, e o que
                            o diferencia de outros projetos. Pense nisso como
                            uma visão geral abrangente e concisa de seu projeto.
                            <hr />
                            Min: 10 caracteres
                            <br />
                            Máx: 1000 caracteres
                          </Tooltip>
                        }
                      >
                        <TextareaAutosize
                          as="textarea"
                          minRows={2}
                          maxRows={14}
                          placeholder="Descreva seu projeto em detalhes aqui..."
                          name="projectDescription"
                          className={`form-control${
                            errors.projectDescription ? " is-invalid" : ""
                          }`}
                          isInvalid={!!errors.projectDescription}
                          {...register("projectDescription")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.projectDescription?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Publico Alvo - Target Audience */}
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Público Alvo">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Descreva quem são os principais usuários ou clientes
                            do seu projeto. Isso pode incluir informações
                            demográficas, comportamentais e/ou geográficas.
                            <hr />
                            Min: 10 caracteres
                            <br />
                            Máx: 500 caracteres
                          </Tooltip>
                        }
                      >
                        <TextareaAutosize
                          as="textarea"
                          minRows={2}
                          maxRows={8}
                          placeholder="Descreva o público-alvo do seu projeto..."
                          name="targetAudience"
                          className={`form-control${
                            errors.targetAudience ? " is-invalid" : ""
                          }`}
                          isInvalid={!!errors.targetAudience}
                          {...register("targetAudience")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.targetAudience?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Description - Product  */}
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Descrição do Produto">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Descreva as principais características e
                            funcionalidades do seu produto. Inclua informações
                            sobre o stack de tecnologia usada, como foi
                            desenvolvido, e qual é o fluxo do usuário.
                            <hr />
                            Min: 10 caracteres
                            <br />
                            Máx: 1000 caracteres
                          </Tooltip>
                        }
                      >
                        <TextareaAutosize
                          as="textarea"
                          minRows={2}
                          maxRows={14}
                          placeholder="Descreva seu produto em detalhes..."
                          name="productDescription"
                          className={`form-control${
                            errors.productDescription ? " is-invalid" : ""
                          }`}
                          isInvalid={!!errors.productDescription}
                          {...register("productDescription")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.productDescription?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Viabilidade - Projeto Viability */}
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Viabilidade do Projeto">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Explique como o seu projeto pode se manter e crescer
                            ao longo do tempo. Isso pode incluir informações
                            sobre as principais fontes de receita, estratégias
                            de monetização e retenção de usuários, entre outros.
                            <hr />
                            Min: 10 caracteres
                            <br />
                            Máx: 1000 caracteres
                          </Tooltip>
                        }
                      >
                        <TextareaAutosize
                          as="textarea"
                          minRows={2}
                          maxRows={14}
                          placeholder="Descreva a viabilidade do seu projeto..."
                          name="projectViability"
                          className={`form-control${
                            errors.projectViability ? " is-invalid" : ""
                          }`}
                          isInvalid={!!errors.projectViability}
                          {...register("projectViability")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.projectViability?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Link */}
                  <Form.Group className="mb-3" controlId="link">
                    <FloatingLabel label="Link do Produto (opcional)">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Se você tiver um link para testar ou usar seu
                            produto, insira-o.
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="text"
                          placeholder="Digite o link para usar seu produto..."
                          name="link"
                          isInvalid={!!errors.link}
                          {...register("link")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.link?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card>
                {/* FINAL CARD 1 */}
              </div>

              {/* Atras e Seguinte */}
              <div className="d-flex justify-content-between pt-3">
                <Button variant="outline-primary" onClick={handleExit}>
                  <BsChevronLeft
                    size={18}
                    className="me-1 align-items-center"
                  />
                  Sair da Inscrição
                </Button>
                <div></div>
                <Button variant="primary" type="submit">
                  Seguinte
                  {isLoading ? (
                    <Spinner animation="border" size="sm" className="me-2" />
                  ) : (
                    <BsChevronRight
                      size={18}
                      className="ms-2 align-items-center"
                    />
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "5rem" }} />
    </Main>
  );
}
