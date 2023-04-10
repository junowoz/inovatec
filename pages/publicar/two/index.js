import React, { useEffect, useState } from "react";
import Contenedor from "components/home/Contenedor";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Progres2 from "./progres2";

import * as yup from "yup";

import { shallow } from "zustand/shallow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FPState } from "context/FormPublications/FPstate";

const schema = yup.object().shape({
  material: yup.string().required("El año es requerido"),
  size: yup.string().required("El modelo es requerido"),
  transmission: yup.string().required("La marca es requerida"),
  other: yup.string().min(3, "Debe tener mínimo tres caracteres"),
});

export default function Partdos() {
  const [hydrated, setHydrated] = useState(true);

  useEffect(() => {
    setHydrated(false);
  }, []);

  const router = useRouter();

  const [publication, form] = FPState(
    (state) => [state.publication, state.form],
    shallow
  );

  const [setPublication, setForm] = FPState(
    (state) => [state.setPublication, state.setForm],
    shallow
  );
  /* TODO: Coloque unas cosas de forma temporal mientras se hacen las demás paginas  */

  const {
    handleSubmit,
    register,
    setError,
    control,

    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...publication },
  });

  useEffect(() => {
    const updateFormState = (property, parameter, equal, column) => {
      if (
        !form[property] ||
        form[property]?.length === 0 ||
        form[property] === null
      ) {
        setForm(property, parameter);
      }
      console.log(form[property]);
    };

    updateFormState("subcategory");
    updateFormState("sizes");
    updateFormState("materials");
    updateFormState("transmissions");
    updateFormState("frenos");
    updateFormState("rines", "*", publication.model, "category");
    updateFormState("suspension");
  }, [
    form.sizes,
    form.materials,
    form.transmissions,
    setForm,
    form.frenos,
    form.rines,
    form.suspension,
    form.subcategory,
    form,
    publication.model,
  ]);

  const onSubmit = (items) => {
    if (publication?.model !== "1") {
      let model = form?.models?.find((model) => {
        return model?.id == items?.model;
      });
      

      items["other"] = model?.name ? model?.name :"error model";

      items["subcategory"] = model?.subcategory ?? "No asignado";
    }

    setPublication(items);
    router.push("./tres");
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
    <Contenedor>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className=" py-5" onSubmit={handleSubmit(onSubmit)}>
              <Progres2 />

              <div className="my-5">
                {publication.model === "1" ? (
                  <Form.Group className="mb-3" controlId="model">
                    <Form.Label>
                      Name Model <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      isInvalid={!!errors?.other}
                      /* value={values.model} */
                      {...register("other")}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.other?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  ""
                )}

                {publication.model === "1" ? (
                  <Form.Group className="mb-3" controlId="subcategory">
                    <Form.Label>
                      Subcategoria <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      isInvalid={!!errors.subcategory}
                      {...register("subcategory")}
                    >
                      <option value="">Selecciona una talla</option>
                      {selectList(form?.subcategory)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.subcategory?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  ""
                )}

                {/* Talla */}
                <Form.Group className="mb-3" controlId="size">
                  <Form.Label>
                    Talla <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select isInvalid={!!errors.size} {...register("size")}>
                    <option value="">Selecciona una talla</option>
                    {selectList(form?.sizes)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.size?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Material */}
                <Form.Group className="mb-3" controlId="materials">
                  <Form.Label>
                    Material <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    isInvalid={!!errors.material}
                    {...register("material")}
                  >
                    <option value="">Selecciona un material</option>

                    {selectList(form?.materials)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.material?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Transmisión */}
                <Form.Group className="mb-3" controlId="transmission">
                  <Form.Label>
                    Transmisión <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Select
                    isInvalid={errors?.transmission}
                    {...register("transmission")}
                  >
                    <option value="">Selecciona una transmisión</option>
                    {selectList(form?.transmissions)}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors?.transmission?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Rin */}
                {publication?.category === "1" ||
                publication?.category === "3" ||
                publication?.category === "6" ? (
                  <Form.Group className="mb-3" controlId="rin">
                    <Form.Label>Rin</Form.Label>
                    <Form.Select
                      isInvalid={errors?.transmission}
                      {...register("rin")}
                    >
                      <option value="">Selecciona un rin</option>
                      {selectList(form?.rines)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.rin?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  ""
                )}

                {/* freno */}
                {publication?.category === "2" ? (
                  <Form.Group className="mb-3" controlId="freno">
                    <Form.Label>freno</Form.Label>
                    <Form.Select
                      isInvalid={errors?.freno}
                      {...register("freno")}
                    >
                      <option value="">Selecciona un freno</option>
                      {selectList(form?.frenos)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.freno?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  ""
                )}

                {/* suspension */}
                {(publication?.category === "1") ? (
                  <Form.Group className="mb-3" controlId="suspension">
                    <Form.Label>Suspension</Form.Label>
                    <Form.Select
                      isInvalid={errors?.suspension}
                      {...register("suspension")}
                    >
                      <option value="">Selecciona una Suspension</option>
                      {selectList(form?.suspension)}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors?.suspension?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  ""
                )}

                {/* Botones */}
                <div className="d-flex justify-content-end pt-3 align-items-center">
                  <Link href="./uno" className="mx-3">
                    <BsChevronLeft
                      size={18}
                      className="me-2 align-items-center"
                    />
                    Atrás
                  </Link>

                  <Button variant="primary" type="submit">
                    Valor de tu bici
                    <BsChevronRight
                      size={18}
                      className="ms-2 align-items-center"
                    />
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "20rem" }} />
    </Contenedor>
  );
}
