import Link from "next/link";
import React from "react";
import { Button, Container } from "react-bootstrap";

export default function Formnav() {
    return (
        <Link href="/form/singin">
            <Container
                fluid
                className="d-flex flex-row-reverse my-3 align-items-baseline "
            >
                <Button variant="primary" type="submit" className="mx-2">
                    Inicia sesión
                </Button>
                <p
                    href="./singin"
                    style={{ color: "black" }}
                    className="d-sm-block d-none me-3"
                >
                    ¿Ya tienes cuenta?
                </p>
            </Container>
        </Link>
    );
}
