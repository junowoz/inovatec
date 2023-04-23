import { React, useEffect, useState } from "react";
import Main from "components/main";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import Progress from "./progress";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IPState } from "context/InscreverProjetos/IPState";
import { supabase } from "supabase/client";

const schema = yup.object().shape({
  year: yup.string().required("O ano é requerido"),
  name: yup.string().required("O nome é requerido"),
  semester: yup.string().required("O periodo é requerido"),
  course: yup.string().required("El modelo es requerido"),
  tech: yup.string().required("La marca es requerida"),
});

export default function PartUno() {
  /**Local State */
  const [formData, setFormData] = useState({
    professor: "",
    resumo: "",
    semester: "",
    briefDescription: "",
  });

  /**YUP */
  const {
    handleSubmit,
    register,
    setError,
    control,
    watch,
    getValues,

    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...formData },
  });

  /**-50 CHARS**/
  const [description, setDescription] = useState("");
  const [charsLeft, setCharsLeft] = useState(50);

  useEffect(() => {
    setCharsLeft(50 - description.length);
  }, [description]);

  const handleChange = (event) => {
    const inputDescription = event.target.value;
    if (inputDescription.length <= 50) {
      setDescription(inputDescription);
    }
  };

  /**Fetch**/
  // const { semester, setSemester } = useState([]);
  // const { course, setCourse } = IPState();
  // const { tech, setTech } = IPState();
  // const { insdustry, setIndustry } = IPState();
  // const { year, setYear } = IPState();

  // useEffect(() => {
  //   setSemester();
  // }, []);

  // useEffect(() => {
  //   getCourse();
  // }, []);

  // useEffect(() => {
  //   getTech();
  // }, []);

  // useEffect(() => {
  //   getIndustry();
  // }, []);

  // useEffect(() => {
  //   getYear();
  // }, []);
  /////////////////////////
  const [course, setCourse] = useState([])

  useEffect(() => {
    fetchCourse()
  }, [])
  
  async function fetchCourse() {
    let { data: course, error } = await supabase
      .from("course")
      .select("name");
    if (error) console.log(error);
    return course;
  }

  //ROUTER
  // const onSubmit = (items) => {
  //   setPublication(items);
  //   router.push("./dois");
  // };
  //ROUTER END

  // const selectList = (list) => {
  //   if (!Array.isArray(list)) {
  //     return null; // or handle the error in some other way
  //   }

  //   return list?.map((item) => {
  //     return (
  //       <option key={item.id} value={item.id}>
  //         {item.name}
  //       </option>
  //     );
  //   });
  // };

  return (
    <Main>
      {/* <DevTool control={control} /> */}
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className="py-5">
              <Progress />

              <div className="my-5">
                {/* Nome do projeto */}
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>Nome do projeto</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Digite o nome do projeto..."
                  />
                </Form.Group>
                {/* Descrever */}
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>Descreva o projeto em uma frase:</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Descreva o projeto em menos de 50 caracteres...."
                      value={formData.briefDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          briefDescription: e.target.value,
                        })
                      }
                      maxLength={50}
                    />
                    <Form.Text
                      className={
                        charsLeft <= 10
                          ? "text-danger position-absolute end-0 bottom-0"
                          : "position-absolute end-0 bottom-0"
                      }
                    >
                      {charsLeft}
                    </Form.Text>
                  </div>
                </Form.Group>
                {/* Nome do/s professor/res responsável/eis */}
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>Nome do/a Professor/a Responsável:</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.professor}
                    onChange={(e) =>
                      setFormData({ ...formData, professor: e.target.value })
                    }
                    placeholder="Digite o nome do/a professor/a responsável..."
                  />
                </Form.Group>
                {/* Resumo do projeto */}
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>Resumo do Projeto:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.resumo}
                    onChange={(e) =>
                      setFormData({ ...formData, resumo: e.target.value })
                    }
                    placeholder="Forneça uma visão geral do objetivo e propósito do projeto em menos de 300 palavras...."
                  />
                </Form.Group>
                {/* Semester */}
                <Form.Group className="mb-3" controlId="course">
                  <Form.Label>
                    Em que periodo você está, ou estava quando criou o projeto?{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select>
                    {course.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.id}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="course">
                  <Form.Label>
                    Em que periodo você está, ou estava quando criou o projeto?{" "}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select>
                    <option value="">Selecione um semestre</option>
                    {course.map((course) => (
                      <option key={course.name} value={course.name}>
                        {course.id}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* Selecione seu curso: */}
                {/* <Form.Group className="mb-3" controlId="course">
                  <Form.Label>
                    Curso de graduação: <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select>
                    <option value="">Selecione um curso</option>
                    {course.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group> */}
                {/* Ano de edição da Inovatec */}
                {/* <Form.Group className="mb-3" controlId="year">
                  <Form.Label>
                    Ano de edição da Inovatec:
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Select {...register("year")} isInvalid={errors?.year}>
                    <option value="">Selecione um ano</option>
                    {year.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.year?.message}
                  </Form.Control.Feedback>
                </Form.Group> */}
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
