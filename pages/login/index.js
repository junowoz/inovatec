import Link from "next/link";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ContainerLogin from "components/formlogin/ContainerLogin";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userState } from "context/User/UserState";

import * as yup from "yup";


const schema = yup.object({
  password: yup.string().required("A senha é requerida"),
  user: yup.string().required("O usuário é requerido"),
});

export default function Login(props) {

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
        setError("user", { message: "Senha ou usuario incorretos" });
        return;
      }
      if (error?.indexOf("User") != -1) {
        setError("user", { message: "No se a confirmado el correo" });
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
    <ContainerLogin>
      <Container
        className="d-flex flex-column justify-content-center align-content-center align-items-center"
        style={{ maxHeight: "90vh", height: "-webkit-fill-available" }}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4">Admin Dashboard</h1>
          <Image
            src="/Inovatec.png"
            alt="Inovatec"
            width={100}
            height={100}
            style={{ maxWidth: "100%" }}
            // Set width for different breakpoints using w- utility classes
            // w-100: full width for xs breakpoint
            // w-sm-75: 75% width for sm breakpoint and above
            // w-lg-70: 70% width for lg breakpoint and above
            className="d-lg-none align-self-center"
          />
          <Form.Group className="mb-3" controlId="formUser">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              type="user"
              placeholder="Admin"
              {...register("user")}
              isInvalid={errors?.user ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {errors.user?.message}
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
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Manter conectado" />
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
          <Link
            href="./forget"
            style={{ width: "100%" }}
            className="d-flex justify-content-center "
          >
            Esqueci a senha
          </Link>
        </Form>
      </Container>
    </ContainerLogin>
  );
}
