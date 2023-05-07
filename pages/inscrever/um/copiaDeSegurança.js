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
} from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { useInscreverState } from "context/useInscreverState";

import Head from "next/head";
import { useRouter } from "next/router";
import Progress from "./progress/progress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

const FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg", "image/svg"];

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
    .max(1500, "A descrição deve ter menos de 1500 caracteres.")
    .required("Descrição requerida"),
  targetAudience: yup
    .string()
    .min(10, "A descrição do público-alvo deve ter mais de 10 caracteres.")
    .max(500, "A descrição do público-alvo deve ter menos de 500 caracteres.")
    .required("Descrição do público-alvo requerida"),

  productDescription: yup
    .string()
    .min(10, "A descrição do produto deve ter mais de 10 caracteres.")
    .max(1500, "A descrição do produto deve ter menos de 1500 caracteres.")
    .required("Descrição do produto requerida"),
  projectViability: yup
    .string()
    .min(
      10,
      "A descrição da viabilidade do projeto deve ter mais de 10 caracteres."
    )
    .max(
      1500,
      "A descrição da viabilidade do projeto deve ter menos de 1500 caracteres."
    )
    .required("Descrição da viabilidade do projeto requerida"),

  year: yup.string().required("Ano requerido"),
  semester: yup.string().required("Periodo requerido"),
  course: yup.string().required("Curso requerido"),
  tech: yup.string().required("Tecnologia requerida"),
  industry: yup.string().required("Industria requerida"),

  logoImg: yup
    .mixed()
    .test("FILE_COUNT", "Selecione ao menos 1 imagem.", (value) => {
      return value && value.length >= 1;
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

  teamImg: yup
    .mixed()
    .test("FILE_COUNT", "Selecione entre 1 e 3 fotos.", (value) => {
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
    .required("Fotos requeridas"),
});

export default function Inscrever() {
  const router = useRouter();
  const [hydration, setHydration] = useState(false);
  const { setFormData } = useInscreverState();

  // OUTROS
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    /* defaultValues: "", */
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

  useEffect(() => {
    fetchData();
  }, []);

  //SUBMIT
  const handleOnSubmit = async (items) => {
    console.log(items);
    setFormData(items);
    router.push("/inscrever/finalizar");
  };

  //HYDRATION
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
                            iFood seria: &quot;Marketplace de delivery de comida e
                            compras.&quot;
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
                            Máx: 1500 caracteres
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Descreva seu projeto em detalhes aqui..."
                          name="projectDescription"
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
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Descreva o público-alvo do seu projeto..."
                          name="targetAudience"
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
                            Máx: 1500 caracteres
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Descreva seu produto em detalhes..."
                          name="productDescription"
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
                            Máx: 1500 caracteres
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Descreva a viabilidade do seu projeto..."
                          name="projectViability"
                          isInvalid={!!errors.projectViability}
                          {...register("projectViability")}
                        />
                      </OverlayTrigger>
                    </FloatingLabel>
                    <Form.Control.Feedback type="invalid">
                      {errors.projectViability?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Card>
                {/* FINAL CARD 1 */}

                {/* CARD 2 */}
                <Card className="p-4 mb-3">
                  <Card.Title className="text-primary pb-2">
                    Informaçōes Específicas
                  </Card.Title>

                  <Row>
                    <Col>
                      {/* Ano */}
                      <Form.Group className="mb-3" controlId="year">
                        <FloatingLabel label="Ano de edição da Inovatec">
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id={`tooltip-right`}>
                                Selecione o ano em que a edição da Inovatec, na
                                qual o seu projeto foi apresentado, ocorreu.
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
                    </Col>

                    <Col>
                      {/* Semester */}
                      <Form.Group className="mb-3" controlId="semester">
                        <FloatingLabel label="Periodo">
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id={`tooltip-right`}>
                                Selecione o período no qual você estava/está na
                                hora de apresentar o projeto.
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
                    </Col>
                  </Row>

                  <Row>
                    <Col>
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
                    </Col>

                    <Col>
                      {/* TECH */}
                      <Form.Group className="mb-3" controlId="tech">
                        <FloatingLabel label="Tecnologia">
                          <OverlayTrigger
                            key="right"
                            placement="right"
                            overlay={
                              <Tooltip id={`tooltip-right`}>
                                Selecione a tecnologia principal que o seu
                                projeto utiliza. Por exemplo, se o seu projeto
                                usa IA, você pode escolher &quot;Inteligência
                                Artificial (IA)&quot;.
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
                    </Col>
                  </Row>

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

                    {/* IMAGENS PRODUTO */}
                    <Form.Group className="mb-3" controlId="productImg">
                      <Form.Label>Imagens do Produto (Até 5)</Form.Label>
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

                    {/* FOTOS TIME */}
                    <Form.Group className="mb-3" controlId="teamImg">
                      <Form.Label>Fotos do Time (Até 5)</Form.Label>
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        overlay={
                          <Tooltip id={`tooltip-right`}>
                            As fotos do seu time devem mostrar a equipe no
                            processo de construção do projeto. Se não possuir
                            fotos do time, poste fotos dos líderes responsáveis
                            pelo projeto.
                          </Tooltip>
                        }
                      >
                        <Form.Control
                          type="file"
                          multiple
                          {...register("teamImg", { multiple: true })}
                          isInvalid={!!errors.teamImg}
                        />
                      </OverlayTrigger>
                      <Form.Control.Feedback type="invalid">
                        {errors.teamImg?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </Card>
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
            </Col>
          </Row>
        </Form>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "5rem" }} />
    </Main>
  );
}
