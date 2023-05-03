import React from "react";
import ContainerLogin from "components/formlogin/ContainerLogin";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userState } from "context/UserState";

import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("O Email é requerido"),
  password: yup.string().required("A Senha é requerida"),
});

export default function Login() {
  const signIn = userState((state) => state.signIn);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    const reset = (error) => {
      if (error?.indexOf("credentials") != -1) {
        setError("email", { message: "Senha ou Email Incorretos" });
        return;
      }
      if (error?.indexOf("Email") != -1) {
        setError("email", { message: "Email não confirmado" });
        return;
      }
      return setError("account", { message: error });
    };

    const {
      error,
    } = await signIn(event);

    error
      ? (reset(error?.message), console.log(error.message))
      : router.push("/");
  };

  return (
    <ContainerLogin>
      <Container
        className="d-flex flex-column justify-content-center align-content-center align-items-center"
        style={{ maxHeight: "90vh", height: "-webkit-fill-available" }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4">Admin Dashboard</h1>
          <Form.Group className="mb-3" controlId="formUser">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="admin@email.com"
              {...register("email")}
              isInvalid={errors?.email ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
              isInvalid={errors?.password ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          {errors?.account ? (
            <p style={{ color: "#dc3545" }}>{errors?.account?.message}</p>
          ) : null}
          <Button
            style={{ width: "100%" }}
            variant="primary"
            type="submit"
            className="mb-3"
          >
            Entrar
          </Button>
        </Form>
      </Container>
    </ContainerLogin>
  );
}
