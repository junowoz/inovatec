import React, { useEffect, useState } from "react";
import Main from "components/main";
import {
  Row,
  Form,
  Col,
  Container,
  Button,
  Card,
  Tooltip,
  OverlayTrigger,
  Spinner,
} from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useInscreverState } from "context/useInscreverState";

import Head from "next/head";
import { useRouter } from "next/router";
import Progress3 from "components/inscrever/progress3";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

const schema = yup.object({
  logoImg: yup
    .mixed()
    .test("FILE_COUNT", "Selecione ao menos 1 imagem.", (value) => {
      return value && value.length === 1;
    })
    .test("FILE_SIZE", "O Arquivo deve ter menos de 10MB", (value) => {
      return value && value[0] && value[0].size <= FILE_SIZE;
    })
    .test(
      "FILE_FORMAT",
      "Formato não suportado. Apenas JPEG, JPG, PNG e SVG",
      (value) => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }
    )
    .required("Logo requerida"),

  teamImg: yup
    .mixed()
    .test("FILE_COUNT", "Selecione apenas 1 foto.", (value) => {
      return value && value.length === 1;
    })
    .test("FILE_SIZE", "O Arquivo deve ter menos de 10MB", (value) => {
      return value && value[0] && value[0].size <= FILE_SIZE;
    })
    .test(
      "FILE_FORMAT",
      "Formato não suportado. Apenas JPEG, JPG, PNG e SVG",
      (value) => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }
    )
    .required("Fotos requeridas"),

  productImg: yup
    .mixed()
    .test("FILE_COUNT", "Selecione entre 1 e 3 imagens.", (value) => {
      return value && value.length >= 1 && value.length <= 3;
    })
    .test("FILE_SIZE", "O Arquivo deve ter menos de 10MB", (value) => {
      const fileList = Array.from(value);
      return value && fileList.every((file) => file.size <= FILE_SIZE);
    })
    .test(
      "FILE_FORMAT",
      "Formato não suportado. Apenas JPEG, JPG, PNG e SVG",
      (value) => {
        const fileList = Array.from(value);
        return (
          value &&
          fileList.every((file) => SUPPORTED_FORMATS.includes(file.type))
        );
      }
    )
    .required("Imagens requeridas"),
});

export default function InscreverTres() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [hydration, setHydration] = useState(false);
  const { resetFormData, setFormData, formData } = useInscreverState();

  // OUTROS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //SUBMIT
  const handleOnSubmit = async (items) => {
    setIsLoading(true);
    setFormData({ ...formData, ...items });
    setIsLoading(false);
    router.push("/inscrever/finalizar");
  };

  //BACK
  const handleBack = () => {
    router.push("/inscrever/dois");
  };

  //HYDRATION
  useEffect(() => {
    setHydration(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== "/inscrever/dois" && url !== "/inscrever/finalizar") {
        resetFormData();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

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
              <Progress3 />

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

                {/* CARD 3 */}
                <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Recursos Visuais
                  </Card.Title>

                  <Form>
                    {/* LOGO DO PROJETO */}
                    <Form.Group className="mb-3" controlId="logoImg">
                      <Form.Label>Logo do Projeto</Form.Label>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Seu logo é crucial para a identidade da sua marca.
                            Recomendamos um fundo transparente e tamanho
                            180x180px. Formatos recomendados: png e svg.
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="file"
                          {...register("logoImg")}
                          isInvalid={!!errors.logoImg}
                        />
                      </OverlayTrigger>
                      <Form.Control.Feedback type="invalid">
                        {errors.logoImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* FOTO TIME */}
                    <Form.Group className="mb-3" controlId="teamImg">
                      <Form.Label>Foto do Time</Form.Label>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            O ideal é que a foto do time mostre a equipe no
                            processo de construção do projeto. Se não possuir
                            fotos do time, poste uma foto dos líderes
                            responsáveis pelo projeto.
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="file"
                          {...register("teamImg")}
                          isInvalid={!!errors.teamImg}
                        />
                      </OverlayTrigger>
                      <Form.Control.Feedback type="invalid">
                        {errors.teamImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* IMAGENS PRODUTO */}
                    <Form.Group className="mb-3" controlId="productImg">
                      <Form.Label>Imagens do Produto (Até 3)</Form.Label>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            A imagem do seu produto deve destacar suas
                            principais características e benefícios.
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="file"
                          multiple
                          {...register("productImg", { multiple: true })}
                          isInvalid={!!errors.productImg}
                        />
                      </OverlayTrigger>
                      <Form.Control.Feedback type="invalid">
                        {errors.productImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Card>
              </div>

              {/* Atras e Seguinte */}
              <div className="d-flex justify-content-between pt-3">
                <Button variant="outline-primary" onClick={handleBack}>
                  <BsChevronLeft
                    size={18}
                    className="me-1 align-items-center"
                  />
                  Voltar
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
