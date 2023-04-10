/* eslint-disable @next/next/no-img-element */
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Link from "next/link";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = (props) => {
    return (
        <Container style={{}}>
            <div className="text-center text-lg-start text-muted footer-customs">
                <section className="d-flex justify-content-center justify-content-lg-between p-1">
                    <MDBContainer
                        className="text-center text-md-start mt-5"
                        fluid="true"
                    >
                        {/*Container*/}
                        <MDBRow className="text-center text-md-start mt-3">
                            {/*Logo*/}
                            <MDBCol md="3" lg="2" xl="3">
                                <Link href="/">
                                    <img
                                        src="/recyclingLogo.png"
                                        alt=""
                                        className="img-fluid pb-5"
                                    />
                                </Link>
                            </MDBCol>

                            {/*Main*/}
                            <MDBCol fluid="true">
                                <MDBRow className="mt-3">
                                    {/*Seccion 1*/}
                                    <MDBCol
                                        md="3"
                                        lg="2"
                                        xl="2"
                                        className="me-auto mb-md-0 mb-4 pb-2"
                                    >
                                        <h6 className="text-uppercase fw-bold mb-3">
                                            Bicis
                                        </h6>
                                        <p>
                                            <Link
                                                href="/compra/"
                                                className="text-reset"
                                            >
                                                Comprar
                                            </Link>
                                        </p>
                                        <p>
                                            <Link
                                                href="/vender"
                                                className="text-reset"
                                            >
                                                Vender
                                            </Link>
                                        </p>
                                        <p>
                                            <Link
                                                href="/avaluador"
                                                className="text-reset"
                                            >
                                                Avaluador
                                            </Link>
                                        </p>
                                        <p>
                                            <Link
                                                href="/espera"
                                                className="text-reset"
                                            >
                                                Lista de espera
                                            </Link>
                                        </p>
                                    </MDBCol>

                                    {/*Seccion 2*/}
                                    <MDBCol
                                        md="4"
                                        lg="3"
                                        xl="2"
                                        className="me-auto mb-md-0 mb-4 pb-2"
                                    >
                                        <h6 className="text-uppercase fw-bold mb-3">
                                            Otros Servicios
                                        </h6>
                                        <p>
                                            <Link
                                                href="#!"
                                                className="text-reset"
                                            >
                                                Bike Fitting
                                            </Link>
                                        </p>
                                        <p>
                                            <Link
                                                href="#!"
                                                className="text-reset"
                                            >
                                                Mantenimiento
                                            </Link>
                                        </p>
                                    </MDBCol>

                                    {/*Seccion 3 - Contact*/}
                                    <MDBCol
                                        md="5"
                                        lg="4"
                                        xl="3"
                                        className="me-auto mb-md-0 mb-4 pb-2"
                                    >
                                        <h6 className="text-uppercase fw-bold mb-3">
                                            Contacto
                                        </h6>
                                        <div className="">
                                            <p>
                                                <Link
                                                    href="https://wa.me/50769240795?text=%C2%A1Hola!"
                                                    target="_blank"
                                                    className="text-reset"
                                                >
                                                    Escríbenos por WhatsApp
                                                </Link>
                                            </p>
                                            <p>
                                                <Link
                                                    href="mailto:recyclingpty@gmail.com"
                                                    target="_blank"
                                                    className="text-reset"
                                                >
                                                    Envíanos un Correo
                                                </Link>
                                            </p>
                                            <p>
                                                <Link
                                                    href="https://goo.gl/maps/R9pZyU568yBsnzcc7"
                                                    target="_blank"
                                                    className="text-reset"
                                                >
                                                    Visítanos
                                                </Link>
                                            </p>
                                        </div>

                                        {/*Display Antiguo - Localizacón...*/}
                                        {/* <p>
                                            <IoLocationSharp
                                                size={22}
                                                className="me-2"
                                            />
                                            New York, NY 10012, US
                                        </p>
                                        <p>
                                            <MdEmail
                                                size={22}
                                                className="me-3"
                                            />
                                            info@example.com
                                        </p>
                                        <p>
                                            <IoLogoWhatsapp
                                                size={24}
                                                className="me-3"
                                            />{" "}
                                            + 01 234 567 88
                                        </p> */}
                                    </MDBCol>

                                    {/*Seccion 4 - Síguenos*/}
                                    <MDBCol
                                        md="3"
                                        lg="3"
                                        xl="2"
                                        className="me-auto pb-3"
                                    >
                                        <h6 className="text-uppercase fw-bold mb-3 text-reset">
                                            Síguenos
                                        </h6>
                                        <Link
                                            href="https://www.instagram.com/recyclingpty/"
                                            target="_blank"
                                            className="me-2 text-reset"
                                        >
                                            <BsInstagram size={25} />
                                        </Link>
                                        <Link
                                            href="https://www.facebook.com/recyclingpty/"
                                            target="_blank"
                                            className="text-reset"
                                        >
                                            <FaFacebook size={25} />
                                        </Link>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                            {/*End Content*/}
                        </MDBRow>
                        {/*End Container*/}
                    </MDBContainer>
                </section>

                {/*Bottom Footer*/}
                <Container fluid className="pt-2 pb-3 text-center">
                    <Row className="justify-content-between p-4">
                        <Col xl="auto">
                            <div className="xxl:text-center text-reset mb-4">
                                2023 © Recycling. Todos los derechos reservados{" "}
                            </div>
                        </Col>{" "}
                        <Col xl="auto">
                            <Link href="#!" className="text-reset ms-3">
                                Política de privacidad{" "}
                            </Link>

                            <Link href="#!" className="text-reset ms-3">
                                Cookies{" "}
                            </Link>
                            <Link href="#!" className="text-reset ms-3">
                                Aviso Legal{" "}
                            </Link>
                            <Link href="#!" className="text-reset ms-3">
                                Condiciones de Uso{" "}
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    );
};

export default Footer;
