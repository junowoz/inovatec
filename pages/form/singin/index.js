import Link from "next/link";

import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Register from "components/formlogin/Register";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userState } from "context/User/UserState";

import * as yup from "yup";


const schema = yup.object({
  password: yup.string().required("La contraseña es requerida"),
  email: yup.string().required("El correo es requerido"),
});

export default function Singing(props) {

  const signIn = userState(state => state.signIn)
  const router = useRouter();


  const {
    handleSubmit,
    register,
    setError,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    const reset = (error) => {
      if (error?.indexOf("credentials") != -1) {
        setError("email", { message: "Contraseña o usuario incorrectos" });
        return;
      }
      if (error?.indexOf("Email") != -1) {
        setError("email", { message: "No se a confirmado el correo" });
        return;
      }
      return setError("account", { message: error });
    };

    const {
      data: { user },
      error,
    } = await signIn(event);

    error
      ? (reset(error?.message), console.log(error.message))
      : router.push("/");
  };

  return (
    <Register>
      <Container
        className="d-flex flex-column justify-content-center align-content-center align-items-center"
        style={{ maxHeight: "90vh", height: "-webkit-fill-available" }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4">Accede a Recycling</h1>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="nombre@email.com"
              {...register("email")}
              isInvalid={errors?.email ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
              isInvalid={errors?.password ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Mantener sesión iniciada" />
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
            Iniciar sesión
          </Button>
          <Link
            href="./forget"
            style={{ width: "100%" }}
            className="d-flex justify-content-center "
          >
            Olvidé mi contraseña
          </Link>
        </Form>
      </Container>
    </Register>
  );
}
