import React, { useContext, useEffect, useState } from "react";
import Main from "components/main";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/router";

import Progress from "./progress";

import * as yup from "yup";
import { shallow } from "zustand/shallow";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { IPState } from "context/InscreverProjetos/IPState";

const schema = yup.object().shape({
  name: yup.string().required("O nome é requerido"),
  description: yup.string().required("A descrição é requerida"),


  year: yup.string().required("O ano é requerido"),
  semester: yup.string().required("O periodo é requerido"),
  course: yup.string().required("El modelo es requerido"),
  tech: yup.string().required("La marca es requerida"),
});

export default function PartUno() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(true);

  const [publication, form] = IPState(
    (state) => [state.publication, state.form],
    shallow
  );

  const [setPublication, setForm, setModels, clearAll, clearTransmision] =
    IPState(
      (state) => [
        state.setPublication,
        state.setForm,
        state.setModels,
        state.clearAll,
        state.clearTransmision,
      ],
      shallow
    );

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
    defaultValues: { ...publication },
  });

  const [viewModels, setViewModels] = useState(true);

  useEffect(() => {
    if (!(form.semester || form.course || form.year)) {
      setForm("semester");
      setForm("course");
      setForm("year");
    }
  }, [form.semester, form.course, form.year, setForm]);

  // useEffect(() => {
  //   if (watch("semester") && watch("course")) {
  //     (async () => {
  //       await setModels(getValues("course"), getValues("semester"));
  //       setViewModels(false);
  //     })();
  //   } else {
  //     setViewModels(true);
  //   }
  //   clearTransmision();
  // }, [watch("semester"), watch("course")]);

  useEffect(() => {
    setHydrated(false);
  }, []);

  const onSubmit = (items) => {
    /* console.log(items)
     */

    setPublication(items);
    router.push("./two");
  };

  const selectList = (list) => {
    if (Array.isArray(list)) {
      return list?.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      });
    }
    return null;
  };

  return hydrated ? (
    ""
  ) : (
    <Main>
      {/* <DevTool control={control} /> */}
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className="py-5" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Progress />
              <div className="my-5">

                {/* Nome do projeto */}
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Nome do projeto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do projeto..."
                  />
                </Form.Group>

                {/* Descrever */}
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Descreva o projeto em uma frase:</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type="text"
                      placeholder="Descreva o projeto em menos de 50 caracteres...."
                    />
                  </div>
                </Form.Group>

                {/* Nome do/s professor/res responsável/eis */}
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Nome do/a Professor/a Responsável:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do/a professor/a responsável..."
                  />
                </Form.Group>

                {/* Resumo do projeto */}
                <Form.Group className="mb-3">
                  <Form.Label>Resumo do Projeto:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Forneça uma visão geral do objetivo e propósito do projeto em menos de 300 palavras...."
                  />
                </Form.Group>

                {/* Semester,BRAND */}
                <Form.Group className="mb-3" controlId="semester">
                  <Form.Label>
                    Em que periodo você está, ou estava quando criou o projeto?
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    isInvalid={!!errors?.semester}
                    /* value={values.semester} */
                    {...register("semester")}
                  >
                    <option value="">Seleccione um período</option>

                    {selectList(form?.semester)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.semester?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/*Selecione seu curso:*/}
                 <Form.Group className="mb-3" controlId="course">
                  <Form.Label>
                    Curso de graduação: <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    {...register("course")}
                    isInvalid={errors?.course}
                    /* value={values.course} */
                  >
                    <option value="">Seleccione um curso</option>
                    {selectList(form?.course)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.course?.message}
                  </Form.Control.Feedback>
                </Form.Group> 

                {/* Ano de edição da Inovatec */}
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>
                    Ano de edição da Inovatec:
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Select
                    {...register("year")}
                    isInvalid={errors?.year}
                    /* value={values.year} */
                  >
                    <option value="">Selecciona un año</option>
                    {selectList(form?.year)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.year?.message}
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
