import React, { useState } from 'react'
import { Col, Container, Row, Accordion } from 'react-bootstrap'
import Login from './fom'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Canva() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <div > <Button variant="primary" className="d-lg-none m-2" onClick={handleShow}>
                Launch
            </Button></div>

            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h4>Mi cuenta</h4></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container >
                        <h4 className='d-none d-lg-block mt-4'> Mi cuenta</h4>

                        <Accordion flush className=''>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Compras</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Ventas</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="2">
                                <p className='accordion-body accordion-button m-0'>Perfil</p>
                            </Accordion.Item>


                            
                        </Accordion>
                    </Container>


                </Offcanvas.Body>
            </Offcanvas>



        </div>
    )
}
