import Link from 'next/link';
import React from 'react'
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { userState } from "context/User/UserState";
import { useRouter } from "next/router";

import * as yup from "yup";

const schema = yup.object({
  password: yup.string().required("La contraseña es requerida"),
  email: yup.string().required("El correo es requerido"),
});


export default function PopLogin(props) {

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
      : props.setModalShow(false)
  };

  return (
    <Modal centered {...props}>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <center>
          <h3 className="mb-4">Accede a Recycling para vender tu bici</h3>
          </center>
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
            Iniciar
          </Button>
          <Link
            href="/form/forget"
            style={{ width: "100%" }}
            className="d-flex justify-content-center "
          >
            Olvidé mi contraseña
          </Link>
        </Form>
        <div className='mt-3 mb-3 d-flex justify-content-center'>

        ¿Aún no tienes cuenta?
        <Link href="/form/register" className='ms-2'>
        
          Regístrate
        </Link>
        </div>

        </Modal.Body>
    </Modal>
  )
}
