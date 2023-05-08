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
import Progress2 from "components/inscrever/progress2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup.object({
  year: yup.string().required("Ano requerido"),
  semester: yup.string().required("Periodo requerido"),
  course: yup.string().required("Curso requerido"),
  tech: yup.string().required("Tecnologia requerida"),
  industry: yup.string().required("Industria requerida"),
});

export default function InscreverDois() {
  const router = useRouter();
  const [hydration, setHydration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { resetFormData, setFormData, formData } = useInscreverState();

  // OUTROS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      year: formData.year || "",
      semester: formData.semester || "",
      course: formData.course || "",
      tech: formData.tech || "",
      industry: formData.industry || "",
    },
  });

  /*SUPABASE FETCH */
  const {
    semesterData,
    courseData,
    yearData,
    techData,
    industryData,
    fetchData,
  } = useInscreverState();

  //SUBMIT
  const handleOnSubmit = async (items) => {
    setIsLoading(true);
    setFormData({ ...formData, ...items });
    setIsLoading(false);
    router.push("/inscrever/tres");
  };

  //BACK
  const handleBack = () => {
    router.push("/inscrever/um");
  };

  //HYDRATION
  useEffect(() => {
    fetchData();
    setHydration(true);
  }, [fetchData, setHydration]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== "/inscrever/um" && url !== "/inscrever/tres") {
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
              <Progress2 />

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

                {/* CARD 2 */}
                <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Informaçōes Específicas
                  </Card.Title>

                  {/* Ano */}
                  <Form.Group className="mb-3" controlId="year">
                    <FloatingLabel label="Ano">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Selecione o ano em que a edição da Inovatec, na qual
                            o seu projeto foi apresentado, ocorreu.
                          </Tooltip>
                        }
                      >
                        <Form.Select
                          name="year"
                          {...register("year")}
                          isInvalid={!!errors.year}
                        >
                          <option value="">Selecionar ano</option>
                          {yearData.map((year) => (
                            <option key={year.id} value={year.id}>
                              {year.name}
                            </option>
                          ))}
                        </Form.Select>
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.year?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Semester */}
                  <Form.Group className="mb-3" controlId="semester">
                    <FloatingLabel label="Periodo">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Selecione o período no qual você estava/está na hora
                            de apresentar o projeto.
                          </Tooltip>
                        }
                      >
                        <Form.Select
                          name="semester"
                          {...register("semester")}
                          isInvalid={!!errors.semester}
                        >
                          <option value="">Selecionar período</option>
                          {semesterData.map((semester) => (
                            <option key={semester.id} value={semester.id}>
                              {semester.name}
                            </option>
                          ))}
                        </Form.Select>
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.semester?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/*Curso*/}
                  <Form.Group className="mb-3" controlId="course">
                    <FloatingLabel label="Curso de graduação">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Selecione o curso de graduação dos alunos que
                            desenvolveram o projeto.
                          </Tooltip>
                        }
                      >
                        <Form.Select
                          name="course"
                          {...register("course")}
                          isInvalid={!!errors.course}
                        >
                          <option value="">Seleccione um curso</option>
                          {courseData.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))}
                        </Form.Select>
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.course?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* TECH */}
                  <Form.Group className="mb-3" controlId="tech">
                    <FloatingLabel label="Tecnologia">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Selecione a tecnologia principal que o seu projeto
                            utiliza. Por exemplo, se o seu projeto usa IA, você
                            pode escolher &quot;Inteligência Artificial
                            (IA)&quot;.
                          </Tooltip>
                        }
                      >
                        <Form.Select
                          name="tech"
                          {...register("tech")}
                          isInvalid={!!errors.tech}
                        >
                          <option value="">Selecionar tecnologia</option>
                          {techData.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                              {tech.name}
                            </option>
                          ))}
                        </Form.Select>
                      </OverlayTrigger>
                    </FloatingLabel>

                    <Form.Control.Feedback type="invalid">
                      {errors.tech?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* INDUSTRY */}
                  <Form.Group className="mb-3" controlId="industry">
                    <FloatingLabel label="Industria">
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            Selecione a indústria que mais se aproxima do setor
                            no qual o seu projeto opera. Isso ajudará a
                            categorizar e entender melhor o seu campo de
                            atuação.
                          </Tooltip>
                        }
                      >
                        <Form.Select
                          name="industry"
                          {...register("industry")}
                          isInvalid={!!errors.industry}
                        >
                          <option value="">Selecionar industria</option>
                          {industryData.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                              {industry.name}
                            </option>
                          ))}
                        </Form.Select>
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.industry?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
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
