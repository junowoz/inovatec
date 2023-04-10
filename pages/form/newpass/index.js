import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Login from "components/formlogin/Login";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userState } from "context/User/UserState";

const schema = yup.object({
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener 6 o mas caracteres"),
  confirmPassword: yup
    .string()
    .required("Es obligatorio confirmar la contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas deben ser iguales."),
});

export default function NewPass() {
  const resetPassword = userState((state) => state.resetPassword);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    const { data: user, error } = await resetPassword(event);

    console.log(error);

    error
      ? (console.log(error.message),
        setError("password", { message: error.message }))
      : router.push("/");
  };

  return (
      <Login>
          <Container
              fluid
              className="d-flex flex-column justify-content-center align-content-center align-items-center mb-5"
          >
              <Form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className="mb-4">
                      Elige una nueva <br /> contraseña
                  </h1>
                  <Form.Group className="mb-3" controlId="1">
                      <Form.Label>Nueva contraseña</Form.Label>
                      <Form.Control
                          type="password"
                          {...register("password")}
                          isInvalid={errors?.password ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.password?.message}
                      </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-5" controlId="2">
                      <Form.Label>Confirma tu nueva contraseña</Form.Label>
                      <Form.Control
                          type="password"
                          {...register("confirmPassword")}
                          isInvalid={errors?.confirmPassword ? true : false}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword?.message}
                      </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                      style={{ width: "100%" }}
                      variant="primary"
                      type="submit"
                      className="mb-3"
                  >
                      Recuperar contraseña
                  </Button>
              </Form>
          </Container>
      </Login>
  );
}
