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
  year: yup.string().required("El año es requerido"),
  category: yup.string().required("La categoría es requerida"),
  model: yup.string().required("El modelo es requerido"),
  brand: yup.string().required("La marca es requerida"),
});

export default function PartUno() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(true);

  const [publication, form] = IPState(
    (state) => [state.publication, state.form],
    shallow
  );

  const [setPublication, setForm, setModels] = IPState(
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
                {/* Ano */}
                <Form.Group className="mb-3" controlId="brands">
                  <Form.Label>
                    Marca <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    isInvalid={!!errors?.brand}
                    /* value={values.brand} */
                    {...register("brand")}
                  >
                    <option value="">Selecciona una Marca</option>

                    {selectList(form?.brands)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.brand?.message}
                  </Form.Control.Feedback>
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
