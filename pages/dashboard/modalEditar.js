import React, { useEffect, useState } from "react";
import {
  Row,
  Form,
  Col,
  Container,
  FloatingLabel,
  Card,
} from "react-bootstrap";
import { useInscreverState } from "context/InscreverProjetos/InscreverState";
import { useForm } from "react-hook-form";

export default function ModalEditar({ project, isEditing }) {
  const [hydration, setHydration] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

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

  //TRAZER OS DADOS

  useEffect(() => {
    if (project) {
      setValue("name", project.name);
      setValue("briefDescription", project.briefDescription);
      setValue("description", project.description);
      setValue("year", project.year);
      setValue("semester", project.semester);
      setValue("course", project.course);
      setValue("tech", project.tech);
      setValue("industry", project.industry);
      // ... preencha os outros campos do formulário ...
    }
  }, [project, setValue]);

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
    <Container>
      <div>
        <Row className="justify-content-md-center">
          {/* CARD 1 */}
          <Col>
            <Card className="p-4 mb-3">
              <Card.Title className="text-primary pb-2">
                Informaçōes Básicas
              </Card.Title>

              {/* Nome */}
              <Form.Group className="mb-3" controlId="">
                <FloatingLabel label="Nome do Projeto">
                  <Form.Control
                    type="text"
                    placeholder="Nome do projeto..."
                    name="name"
                    {...register("name")}
                    disabled={!isEditing}
                  />
                </FloatingLabel>
              </Form.Group>

              {/* Descrever */}
              <Form.Group className="mb-3" controlId="">
                <FloatingLabel label="Descrição">
                  <Form.Control
                    type="text"
                    placeholder="Descrição breve do projeto..."
                    name="briefDescription"
                    {...register("briefDescription")}
                    disabled={!isEditing}
                  />
                </FloatingLabel>
              </Form.Group>

              {/* Resumo */}
              <Form.Group className="mb-3">
                <FloatingLabel label="Resumo">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Resumo do projeto..."
                    name="description"
                    {...register("description")}
                    disabled={!isEditing}
                  />
                </FloatingLabel>
              </Form.Group>
            </Card>
          </Col>
          {/* END CARD 1 */}

          {/* CARD 2 */}
          <Col>
            <Card className="p-4 mb-3">
              <Card.Title className="text-primary pb-2">
                Informaçōes Específicas
              </Card.Title>

              <Row>
                <Col>
                  {/* Ano */}
                  <Form.Group className="mb-3" controlId="year">
                    <FloatingLabel label="Ano">
                      <Form.Select
                        name="year"
                        {...register("year")}
                        disabled={!isEditing}
                      >
                        <option value="">Seleccione um ano</option>
                        {yearData.map((year) => (
                          <option key={year.id} value={year.id}>
                            {year.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>

                <Col>
                  {/* Semester */}
                  <Form.Group className="mb-3" controlId="semester">
                    <FloatingLabel label="Periodo">
                      <Form.Select
                        name="semester"
                        {...register("semester")}
                        disabled={!isEditing}
                      >
                        <option value="">Seleccione um período</option>
                        {semesterData.map((semester) => (
                          <option key={semester.id} value={semester.id}>
                            {semester.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  {/*Curso*/}
                  <Form.Group className="mb-3" controlId="course">
                    <FloatingLabel label="Curso">
                      <Form.Select
                        name="course"
                        {...register("course")}
                        disabled={!isEditing}
                      >
                        <option value="">Seleccione um curso</option>
                        {courseData.map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>

                <Col>
                  {/* TECH */}
                  <Form.Group className="mb-3" controlId="tech">
                    <FloatingLabel label="Tecnologia">
                      <Form.Select
                        name="tech"
                        {...register("tech")}
                        disabled={!isEditing}
                      >
                        <option value="">Seleccione uma tecnologia</option>
                        {techData.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>

              {/* INDUSTRY */}
              <Form.Group className="mb-3" controlId="industry">
                <FloatingLabel label="Industria">
                  <Form.Select
                    name="industry"
                    {...register("industry")}
                    disabled={!isEditing}
                  >
                    <option value="">Seleccione uma industria</option>
                    {industryData.map((industry) => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
            </Card>
          </Col>

          {/* CARD 3 */}
          {/* <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Recursos Visuais
                  </Card.Title>

                  <Form>
                    <Form.Group className="mb-3" controlId="logoImg">
                      <FloatingLabel>Logo do Projeto</FloatingLabel>
                      <Form.Control
                        type="file"
                        {...register("logoImg")}
                      />
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="productImg">
                      <FloatingLabel>Imagens do Produto</FloatingLabel>
                      <Form.Control
                        type="file"
                        multiple
                        {...register("productImg")}
                      />
                      
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="teamImg">
                      <FloatingLabel>Fotos do Time</FloatingLabel>
                      <Form.Control
                        type="file"
                        multiple
                        {...register("teamImg")}
                      />
                      
                    </Form.Group>
                  </Form>
                </Card> */}
          {/* END CARD 3 */}
        </Row>
      </div>
    </Container>
  );
}
