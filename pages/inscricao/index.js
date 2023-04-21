import { React, useContext, useEffect, useState } from "react";
import Main from "components/main";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import { BsChevronRight } from "react-icons/bs";
import { useRouter } from "next/router";

import Progress from "./progress";

import * as yup from "yup";
import { shallow } from "zustand/shallow";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FPState } from "context/FormPublications/FPstate";

const schema = yup.object().shape({
  year: yup.string().required("El año es requerido"),
  category: yup.string().required("La categoría es requerida"),
  model: yup.string().required("El modelo es requerido"),
  brand: yup.string().required("La marca es requerida"),
});

export default function PartUno() {
  const [description, setDescription] = useState('');
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

  const router = useRouter();
  const [hydrated, setHydrated] = useState(true);

  const [publication, form] = FPState(
    (state) => [state.publication, state.form],
    shallow
  );

  const [setPublication, setForm, setModels] = FPState(
    (state) => [state.setPublication, state.setForm, state.setModels],
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
    if (!(form.brands || form.category || form.years)) {
      setForm("brands");
      setForm("category");
      setForm("years");
    }
  }, [form.brands, form.category, form.years, setForm]);

  useEffect(() => {
    if (watch("brand") && watch("category")) {
      (async () => {
        await setModels(getValues("category"), getValues("brand"));
        setViewModels(false);
      })();
    } else {
      setViewModels(true);
    }
  }, [watch("brand"), watch("category")]);

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
    return list?.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
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
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>Nome do projeto:</Form.Label>
                  <Form.Control
                    type="text"
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
                      value={description}
                      onChange={handleChange}
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
                  <Form.Label>Nome do/a Professor/a Responsável </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do/a professor/a responsável..."
                  />
                </Form.Group>
                {/* Resumo do projeto */}
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>Resumo do Projeto</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    placeholder="Forneça uma visão geral do objetivo e propósito do projeto em menos de 300 palavras...."
                  />
                </Form.Group>
                {/* Categoria */}
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>
                    Categoría <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    {...register("category")}
                    isInvalid={errors?.category}
                    /* value={values.category} */
                  >
                    <option value="">Selecciona una categoría</option>
                    {selectList(form?.category)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.category?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Modelo */}
                <Form.Group className="mb-3" controlId="model">
                  <Form.Label>
                    Modelo <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    disabled={viewModels}
                    isInvalid={!!errors?.model}
                    /* value={values.model} */
                    {...register("model")}
                  >
                    <option value="">Selecciona un modelo</option>
                    {selectList(form.models)}
                    <option value="1">Otro</option>
                  </Form.Select>
                  <span className="text-secondary">
                    Tienes que seleccionar una categoría y marca primero
                  </span>
                  <Form.Control.Feedback type="invalid">
                    {errors.model?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* Año */}
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>
                    Año <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    {...register("year")}
                    isInvalid={errors?.year}
                    /* value={values.year} */
                  >
                    <option value="">Selecciona un año</option>
                    {selectList(form?.years)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.year?.message}
                  </Form.Control.Feedback>
                  <p className="mt-2 text-secondary">
                    Sabemos que no todos conocen el año de su bici. Puedes
                    agregar un estimado.
                  </p>
                </Form.Group>
              </div>

              <div className="d-flex justify-content-end pt-3">
                {" "}
                <Button variant="primary" type="submit">
                  Detalles de tu bici
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
      <div className="d-none d-lg-block" style={{ height: "20rem" }} />
    </Main>
  );
}
