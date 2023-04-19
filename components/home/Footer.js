/* eslint-disable @next/next/no-img-element */
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Link from "next/link";
import React from "react";
import { BsInstagram, BsWindow } from "react-icons/bs";
import { TbBinaryTree } from "react-icons/tb";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";

const Footer = (props) => {
  return (
    <Container style={{}}>
      <div className="text-center text-lg-start text-muted footer-customs">
        <section className="d-flex justify-content-center justify-content-lg-between p-1">
          <MDBContainer className="text-center text-md-start mt-5" fluid="true">
            {/*Container*/}
            <MDBRow className="text-center text-md-start mt-3">
              {/*Logo*/}
              <MDBCol md="3" lg="2" xl="3">
                <Link href="/">
                  <img src="/inovatec.png" alt="" className="img-fluid pb-5" />
                </Link>
              </MDBCol>

              {/*Main*/}
              <MDBCol fluid="true">
                <MDBRow className="mt-3">
                  {/*SECTION 1*/}
                  <MDBCol
                    md="4"
                    lg="3"
                    xl="2"
                    className="me-auto mb-md-0 mb-4 pb-2"
                  >
                    <h6 className="text-uppercase fw-bold mb-3">NAVEGAÇÃO</h6>
                    <p>
                      <Link href="/projetos" className="text-reset">
                        Projetos
                      </Link>
                    </p>
                    <p>
                      <Link href="/inscricao" className="text-reset">
                        Inscrição
                      </Link>
                    </p>
                    <p>
                      <Link href="#!" className="text-reset">
                        Manual
                      </Link>
                    </p>
                  </MDBCol>

                  {/*SECTION 2 - CONTATOS*/}
                  <MDBCol
                    md="5"
                    lg="4"
                    xl="3"
                    className="me-auto mb-md-0 mb-4 pb-2"
                  >
                    <h6 className="text-uppercase fw-bold mb-3">CONTATO</h6>
                    <div className="">
                      <p>
                        <Link
                          href="mailto:inovatecfametro@gmail.com"
                          target="_blank"
                          className="text-reset"
                        >
                          Email
                        </Link>
                      </p>
                      <p>
                        <Link
                          href="https://goo.gl/maps/R9pZyU568yBsnzcc7"
                          target="_blank"
                          className="text-reset"
                        >
                          Endereço
                        </Link>
                      </p>
                    </div>
                  </MDBCol>

                  {/*SECTION 3 - REDES*/}
                  <MDBCol md="3" lg="3" xl="2" className="me-auto pb-3">
                    <h6 className="text-uppercase fw-bold mb-3 text-reset">
                      REDES E SITES
                    </h6>

                    <Link
                      href="https://www.instagram.com/computacaofametro/"
                      target="_blank"
                      className="me-2 text-reset"
                    >
                      <BsInstagram size={25} />
                    </Link>

                    <Link
                      href="https://fametro.edu.br/"
                      target="_blank"
                      className="me-2 text-reset"
                    >
                      <BsWindow size={25} />
                    </Link>

                    <Link
                      href="https://www.flowcode.com/page/computacaofametro"
                      target="_blank"
                      className="text-reset"
                    >
                      <TbBinaryTree size={25} />
                    </Link>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              {/*END REDES*/}

              {/*End Content*/}
            </MDBRow>
            {/*End Container*/}
          </MDBContainer>
        </section>

        {/*Bottom Footer*/}
        <Container fluid className="pt-2 pb-3 text-center">
          <Row className="justify-content-between p-4">
            {/* <Col xl="auto"> */}
              <div className="xxl:text-center text-reset mb-4">
                2023 © Inovatec. Todos os direitos reservados{" "}
              </div>
            {/* </Col> */}
            {/* <Col xl="auto">
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
            </Col> */}
          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default Footer;
