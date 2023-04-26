import React, { useState } from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Canva() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div>
        <Button
          variant="primary"
          className="d-lg-none m-2"
          onClick={handleShow}
        >
          Modal
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h4>Admin Dashboard</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <h4 className="d-none d-lg-block mt-4">Admin Dashboard</h4>
            <Accordion flush className="">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Compras</Accordion.Header>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Ventas</Accordion.Header>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <p className="accordion-body accordion-button m-0">
                  Admin Dashboard, welcome
                </p>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
