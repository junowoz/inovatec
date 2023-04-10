import { userState } from "context/User/UserState";
import React, { useState } from "react";

import Login from "components/formlogin/Login";

import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { isValidNumber, parsePhoneNumberFromString } from "libphonenumber-js";

const schema = yup.object({
    email: yup.string().required("El correo es requerido"),
    password: yup
        .string()
        .required("La contraseña es requerida")
        .min(6, "La contraseña debe tener 6 o mas caracteres"),
    confirmPassword: yup
        .string()
        .required("Es obligatorio confirmar la contraseña")
        .oneOf([yup.ref("password")], "Las contraseñas deben ser iguales."),
    first_name: yup.string().required("El nombre es requerido"),
    last_name: yup.string().required("El Apellido es requerido"),
});

export default function Register({}) {
    const router = useRouter();
    const registerUser = userState((state) => state.registerUser);

    const [phone, setPhone] = useState("");
    const handlePhoneChange = (value) => {
        setPhone(value);
    };

    //Resto

    const {
        handleSubmit,
        register,
        setError,

        formState: {isValid, errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (event) => {
        const reset = (error) => {
            if (error?.includes("credentials")) {
                setError("email", {
                    message: "Contraseña o usuario incorrectos",
                });
                return;
            }
            if (error?.includes("Email")) {
                setError("email", { message: "No se a confirmado el correo" });
                return;
            }
            if (error?.includes("registered")) {
                setError("account", {
                    message: "El usuario ya se encuentra registrado",
                });
                return;
            }

            setError("account", { message: error });
        };

        const { data: user, error } = await registerUser(event);

         error
             ? (reset(error.message), console.log(error.message))
             : router.push("/");
    };

    return (
        <Login>
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-content-center align-items-center"
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mb-4">Regístrate en Recycling</h1>
                    <Row className=" mb-3">
                        {/* Nombre */}
                        <Form.Group as={Col} className="" controlId="formName">
                            <Form.Label>
                                Nombre<span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Juan"
                                {...register("first_name")}
                                isInvalid={errors?.first_name ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.first_name?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors &&
                                    errors.first_name &&
                                    errors.first_name.name &&
                                    errors.first_name.name === "required" && (
                                        <span>
                                            Por favor, introduce tu nombre.
                                        </span>
                                    )}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Apellidos */}
                        <Form.Group as={Col} className="" controlId="formLast">
                            <Form.Label>
                                Apellidos<span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ramirez"
                                {...register("last_name")}
                                isInvalid={errors?.last_name ? true : false}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.last_name?.message}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors &&
                                    errors.last_name &&
                                    errors.last_name &&
                                    errors.last_name.name === "required" && (
                                        <span>
                                            Por favor, introduce tu apellido.
                                        </span>
                                    )}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {/* Correo */}
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>
                            Correo Electrónico
                            <span className="text-danger"> *</span>
                        </Form.Label>
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

                    {/* Movil */}
                    <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>
                            Teléfono móvil
                            <span className="text-danger"> *</span>
                        </Form.Label>
                        <PhoneInput
                            country={"pa"} // Define el pais por defecto
                            value={phone}
                            onChange={handlePhoneChange}
                            inputProps={{
                                required: true,
                                autoFocus: true,
                                placeholder: "+507 6234-5678", // Placeholder para Panama
                            }}
                            enableSearchField
                        />

                        {errors && errors.phone && (
                            <Form.Control.Feedback type="invalid">
                                {errors.phone?.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    {/* Contraseña */}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>
                            Contraseña<span className="text-danger"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password")}
                            isInvalid={errors?.password ? true : false}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* Confirmar contraseña */}
                    <Form.Group
                        className="mb-4"
                        controlId="formConfirmPassword"
                    >
                        <Form.Label>
                            Repite la contraseña
                            <span className="text-danger"> *</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            {...register("confirmPassword")}
                            isInvalid={errors?.confirmPassword ? true : false}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {errors?.account ? (
                        <p style={{ color: "#dc3545" }}>
                            {errors?.account?.message}
                        </p>
                    ) : null}

                    <Button
                        style={{ width: "100%" }}
                        variant="primary"
                        type="submit"
                    >
                        Crear cuenta
                    </Button>
                </Form>
            </Container>
        </Login>
    );
}
