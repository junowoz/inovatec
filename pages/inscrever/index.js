import React, { useContext, useEffect, useState } from "react";
import Main from "components/main";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { InscreverState } from "context/InscreverProjetos/InscreverState";
import Head from "next/head";
import Progress from "./progress";

import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Nome requerido"),
  description: yup
    .string()
    .max(50, "A descrição deve ter menos de 50 caracteres.")
    .required("Descrição requerida"),
  resume: yup
    .string()
    .max(300, "O resumo deve ter menos de 1000 caracteres.")
    .required("Resumo requerido"),

  semester: yup.string().required("Periodo requerido"),
  course: yup.string().required("Curso requerido"),
  year: yup.string().required("Ano requerido"),
  tech: yup.string().required("Tecnologia requerida"),
  industry: yup.string().required("Industria requerida"),
});

export default function PartUno() {
  const [hydrated, setHydrated] = useState(true);
  const [errors, setErrors] = useState({});

  /**YUP VALIDATION */
  const validateFormData = async (formData) => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    validateFormData(Object.fromEntries(formData.entries()));
  };

  /*SUPABASE FETCH */
  const {
    semesterData,
    courseData,
    yearData,
    techData,
    industryData,
    fetchData,
  } = InscreverState();

  useEffect(() => {
    fetchData();
  }, []);

  /*OTHER */

  useEffect(() => {
    setHydrated(false);
  }, []);

  return hydrated ? (
    ""
  ) : (
    <Main>
      <Head>
        <title>Inovatec | Inscrever</title>
      </Head>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className="py-5" noValidate onSubmit={handleSubmit}>
              <Progress />
              <h5 className="">Todos os campos são obrigatórios *</h5>
              <div className="my-5">
                {/* Nome */}
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Nome do projeto</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Digite o nome do projeto..."
                      name="name"
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
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
                      name="description"
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
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
                      name="resume"
                      isInvalid={!!errors.resume}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.resume}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                {/* Semester */}
                <Form.Group className="mb-3" controlId="semester">
                  <Form.Label>
                    Em que periodo você está, ou estava quando criou o projeto?
                  </Form.Label>
                  <Form.Select name="semester" isInvalid={!!errors.semester}>
                    <option value="">Seleccione um período</option>
                    {semesterData.map((semester) => (
                      <option key={semester.id} value={semester.name}>
                        {semester.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.semester}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*Curso*/}
                <Form.Group className="mb-3" controlId="course">
                  <Form.Label>Curso de graduação</Form.Label>
                  <Form.Select name="course" isInvalid={!!errors.course}>
                    <option value="">Seleccione um curso</option>
                    {courseData.map((course) => (
                      <option key={course.id} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.course}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Ano */}
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>Ano de edição da Inovatec</Form.Label>
                  <Form.Select name="year" isInvalid={!!errors.year}>
                    <option value="">Seleccione um ano</option>
                    {yearData.map((year) => (
                      <option key={year.id} value={year.name}>
                        {year.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.year}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* TECH */}
                <Form.Group className="mb-3" controlId="tech">
                  <Form.Label>Que tipo de tecnologia o projeto usa?</Form.Label>
                  <Form.Select name="tech" isInvalid={!!errors.tech}>
                    <option value="">Seleccione uma tecnologia</option>
                    {techData.map((tech) => (
                      <option key={tech.id} value={tech.name}>
                        {tech.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.tech}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* INDUSTRY */}
                <Form.Group className="mb-3" controlId="industry">
                  <Form.Label>
                    Em que industria o projeto se encaixa?
                  </Form.Label>
                  <Form.Select name="industry" isInvalid={!!errors.industry}>
                    <option value="">Seleccione uma industria</option>
                    {industryData.map((industry) => (
                      <option key={industry.id} value={industry.name}>
                        {industry.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.industry}
                  </Form.Control.Feedback>
                </Form.Group>
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
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "5rem" }} />
    </Main>
  );
}
