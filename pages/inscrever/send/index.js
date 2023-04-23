import React, { useEffect, useState } from "react";
import Main from "components/main";
import {
  Row,
  Form,
  Col,
  Container,
  Button,
  InputGroup,
  FormGroup,
  FloatingLabel,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import Progres2 from "./progres2";
import * as yup from "yup";

import shallow from "zustand/shallow";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IPState } from "context/InscreverProjetos/IPState";

import { userState } from "context/User/UserState";
import InputFile2 from "components/Custom/InputFile/inputFile2";

const schema = yup.object().shape({
  description: yup.string().required("La descripción es requerida"),
  title: yup.string().required("El titulo es requerido"),
  price: yup.number().required("El precio es requerida"),
  files: yup
    .array()
    .required("Se deben subir archivos")
    .min(3, "Se deben subir al 3 una foto"),
});

export default function Partdos() {
  const router = useRouter();

  const user = userState((state) => state.user);

  const [publication, form] = IPState(
    (state) => [state.publication, state.form],
    shallow
  );

  const [button, setButton] = useState(false);

  const { setPublication, setForm, UpdateImages, clearAll, postPublication } =
    IPState();

  useEffect(() => {
    if (!form.brands || !form.models) {
      setForm();
    }
    console.log(
      "🚀 ~ file: index.js:77 ~ onSubmit ~ publication:",
      publication
    );
  }, []);

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

  const onSubmit = async (items) => {
    setButton(true);
    try {
      const filesUrl = await UpdateImages(items.files, user.id);

      items = {
        ...items,
        filesUrl,
        user_id: user.id,
      };
      console.log("🚀 ~ file: index.js:77 ~ onSubmit ~ items:", items);

      await setPublication(items);

      await postPublication(items);

      await clearAll();

      router.push("/projetos");
    } catch (err) {
      setError("general", err);
    }

    setButton(false);
  };

  return (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className=" py-5" onSubmit={handleSubmit(onSubmit)}>
              <Progres2 />
              <div className="my-5">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="title">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      {...register("title")}
                      isInvalid={errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors?.title?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="validationCustomUsername">
                    <Form.Label>Precio</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        isInValue={errors?.price}
                        {...register("price")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.price?.message}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Descripción</Form.Label>
                  <FloatingLabel controlId="description">
                    <Form.Control
                      as="textarea"
                      className="p-2"
                      isInValue={!errors?.description}
                      style={{ height: "100px" }}
                      {...register("description")}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    {errors?.description?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <FormGroup className="mb-3">
                  <InputFile2
                    multiple={true}
                    {...register("files")}
                    isInValue={errors?.files}
                  />

                  {errors?.files ? (
                    <p style={{ color: "#dc3545" }}>{errors?.files?.message}</p>
                  ) : null}
                </FormGroup>

                <div className="d-flex justify-content-end pt-3 align-items-center">
                  <Link href="./cuatro" className="mx-3">
                    Atrás
                  </Link>

                  <Button variant="primary" type="submit" disabled={button}>
                    Guardar
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "20rem" }}></div>
    </Main>
  );
}
