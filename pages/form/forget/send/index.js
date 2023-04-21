import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Login from "components/formlogin/Login";

export default function Login() {
    return (
        <Login>
            <Container className="mb-5" style={{}}>
                <div className="p-md-5">
                    <div className="p-md-5">
                        <div className="p-md-5">
                            <div className="p-md-5">
                                <Container
                                    style={{
                                        paddingLeft: "0px",
                                        paddingRight: "0px",
                                    }}
                                    className="d-flex flex-column justify-content-top align-content-center align-items-center mb-5"
                                >
                                    <Form>
                                        <h1 className="mb-4">
                                            Hemos enviado un correo de
                                            recuperación
                                        </h1>
                                        <h4>
                                            Te hemos enviado un email a tu
                                            dirección de correo electrónico.
                                            Contiene un enlace que te permitirá
                                            reiniciar tu senha. Si no lo
                                            encuentras, recuerda revisar en la
                                            carpeta de correo no deseado/spam.
                                        </h4>
                                    </Form>
                                </Container>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Login>
    );
}
