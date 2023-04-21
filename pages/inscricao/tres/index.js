import React, { useEffect, useState } from "react";
import Main from "components/main";
import { Row, Form, Col, Container, Button } from "react-bootstrap";
import Link from "next/link";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";

import Progres3 from "./progres3";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FPState } from "context/FormPublications/FPstate";
import shallow from "zustand/shallow";
import { yupResolver } from "@hookform/resolvers/yup";

const condicionalesStyle = {
  color: "#212928",
  fontWeight: "bold",
};

const schema = yup.object().shape({
  condition: yup.string(),
});

export default function Parttres() {
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
    const updateFormState = (property) => {
      if (
        !form[property] ||
        form[property]?.length === 0 ||
        form[property] === null
      ) {
        setForm(property);
      }
      console.log(form[property]);
    };
    updateFormState("conditions");
  });

  const onSubmit = (items) => {
    setPublication(items);
    router.push("./cuatro");
  };

  return hydrated ? (
    ""
  ) : (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className=" py-5" onSubmit={handleSubmit(onSubmit)}>
              <Progres3 />
              <div className="mt-5">
                <Container>
                  {form?.conditions?.map((datum) => {
                    return (
                      <Form.Group key={datum.id} required>
                        <div className="d-flex justify-content-sm-between flex-column flex-sm-row my-4 ">
                          <Col className="mx=sm-4 my-2 my-sm-0">
                            <Form.Check
                              type="radio"
                              style={condicionalesStyle}
                              id={`radio-${datum.id}`}
                            >
                              <Form.Check.Input
                                required
                                type="radio"
                                value={datum.id}
                                {...register("conditions")}
                              />

                              <Form.Check.Label>{datum.name}</Form.Check.Label>
                            </Form.Check>
                          </Col>

                          <Col sm="5" className="text-secondary">
                            {datum.description}
                          </Col>
                        </div>
                      </Form.Group>
                    );
                  })}
                </Container>
              </div>

              <div className="d-flex justify-content-end pt-3 align-items-center">
                <Link href="./two" className="mx-3" type="submit">
                  <BsChevronLeft
                    size={18}
                    className="me-1 align-items-center"
                  />
                  Atrás
                </Link>

                <Button variant="primary" type="submit">
                  Valor de tu bici
                  <BsChevronRight
                    size={18}
                    className="ms-1 align-items-center"
                  />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="d-none d-lg-block" style={{ height: "10rem" }} />
    </Main>
  );
}
