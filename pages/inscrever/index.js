import React, { useContext, useEffect, useState } from "react";
import Main from "components/main";
import { Row, Form, Col, Container, Button, Card } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { useInscreverState } from "context/InscreverProjetos/InscreverState";

import Head from "next/head";
import { useRouter } from "next/router";
import Progress from "./progress/progress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "O nome deve ter mais de 2 caracteres.")
    .required("Nome requerido"),
  briefDescription: yup
    .string()
    .min(10, "A descrição deve ter mais de 10 caracteres.")
    .max(50, "A descrição deve ter menos de 50 caracteres.")
    .required("Descrição requerida"),
  description: yup
    .string()
    .min(10, "O resumo deve ter mais de 10 caracteres.")
    .max(300, "O resumo deve ter menos de 1000 caracteres.")
    .required("Resumo requerido"),

  year: yup.string().required("Ano requerido"),
  semester: yup.string().required("Periodo requerido"),
  course: yup.string().required("Curso requerido"),
  tech: yup.string().required("Tecnologia requerida"),
  industry: yup.string().required("Industria requerida"),

  // logoImg: yup.string(1, "d").required("Foto requerida"),
  // productImg: yup.array(1, "d").required("Foto requerida"),
  // teamImg: yup.array(1, "d").required("Foto requerida"),
});

export default function Inscrever() {
  const router = useRouter();
  const [hydration, setHydration] = useState(false);
  const { setFormData } = useInscreverState();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    /* defaultValues: "", */
  });

  const handleOnSubmit = (items) => {
    console.log(items);
    setFormData(items);
    router.push('/inscrever/finalizar');
  };

  /*SUPABASE FETCH */
  const {
    semesterData,
    courseData,
    yearData,
    techData,
    industryData,
    fetchData,
  } = useInscreverState();

  useEffect(() => {
    fetchData();
  }, []);

  /*FOTOS */
  // const [file, setFile] = useState(null);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  // const handlePicsSubmit = (event) => {
  //   event.preventDefault();
  //   // Do something with the file, such as upload it to a server
  // };

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
            <form
              className="py-5"
              noValidate
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <Progress />
              <div className="my-4">
                <h5 className="py-2">
                  Todos os campos são obrigatórios{" "}
                  <span className="text-danger">*</span>
                </h5>

                {/* CARD 1 */}
                <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Informaçōes Básicas
                  </Card.Title>
                  {/* Nome */}
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Nome do projeto</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Digite o nome do projeto..."
                        name="name"
                        isInvalid={!!errors.name}
                        {...register("name")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  {/* Descrever */}
                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Descreva o projeto em uma frase</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type="text"
                        placeholder="Descreva o projeto em menos de 50 caracteres...."
                        name="briefDescription"
                        isInvalid={!!errors.briefDescription}
                        {...register("briefDescription")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.briefDescription?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  {/* Resumo */}
                  <Form.Group className="mb-3">
                    <Form.Label>Resumo do Projeto</Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Forneça uma visão geral do objetivo e propósito do projeto em menos de 300 palavras..."
                        name="description"
                        isInvalid={!!errors.description}
                        {...register("description")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description?.message}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>
                </Card>

                {/* CARD 2 */}
                <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Informaçōes Específicas
                  </Card.Title>

                  <Row>
                    <Col>
                      {/* Ano */}
                      <Form.Group className="mb-3" controlId="year">
                        <Form.Label>Ano de edição da Inovatec</Form.Label>
                        <Form.Select
                          name="year"
                          {...register("year")}
                          isInvalid={!!errors.year}
                        >
                          <option value="">Seleccione um ano</option>
                          {yearData.map((year) => (
                            <option key={year.id} value={year.id}>
                              {year.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.year?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      {/* Semester */}
                      <Form.Group className="mb-3" controlId="semester">
                        <Form.Label>Periodo quando criou o projeto</Form.Label>
                        <Form.Select
                          name="semester"
                          {...register("semester")}
                          isInvalid={!!errors.semester}
                        >
                          <option value="">Seleccione um período</option>
                          {semesterData.map((semester) => (
                            <option key={semester.id} value={semester.id}>
                              {semester.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.semester?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {/*Curso*/}
                      <Form.Group className="mb-3" controlId="course">
                        <Form.Label>Curso de graduação</Form.Label>
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
                        <Form.Control.Feedback type="invalid">
                          {errors.course?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col>
                      {/* TECH */}
                      <Form.Group className="mb-3" controlId="tech">
                        <Form.Label>
                          Que tipo de tecnologia o projeto usa?
                        </Form.Label>
                        <Form.Select
                          name="tech"
                          {...register("tech")}
                          isInvalid={!!errors.tech}
                        >
                          <option value="">Seleccione uma tecnologia</option>
                          {techData.map((tech) => (
                            <option key={tech.id} value={tech.id}>
                              {tech.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.tech?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* INDUSTRY */}
                  <Form.Group className="mb-3" controlId="industry">
                    <Form.Label>
                      Em que industria o projeto se encaixa?
                    </Form.Label>
                    <Form.Select
                      name="industry"
                      {...register("industry")}
                      isInvalid={!!errors.industry}
                    >
                      <option value="">Seleccione uma industria</option>
                      {industryData.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.industry?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card>

                {/* CARD 3 */}
                {/* <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Recursos Visuais
                  </Card.Title>

                  <Form>
                    <Form.Group className="mb-3" controlId="logoImg">
                      <Form.Label>Logo do Projeto</Form.Label>
                      <Form.Control
                        type="file"
                        {...register("logoImg")}
                        isInvalid={!!errors.logoImg}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.logoImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productImg">
                      <Form.Label>Imagens do Produto</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        {...register("productImg")}
                        isInvalid={!!errors.productImg}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.productImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="teamImg">
                      <Form.Label>Fotos do Time</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        {...register("teamImg")}
                        isInvalid={!!errors.teamImg}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.teamImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Card> */}
              </div>

              {/* Seguinte */}
              <div className="d-flex justify-content-between pt-3">
                <div></div>
                <Button variant="primary" type="submit">
                  Seguinte
                  <BsChevronRight
                    size={18}
                    className="ms-2 align-items-center"
                  />
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "5rem" }} />
    </Main>
  );
}
