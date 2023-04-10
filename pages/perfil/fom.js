import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Register from 'components/formlogin/Register';

export default function Singin() {
  return (



    <Container className='d-flex flex-column justify-content-center align-content-center align-items-center' style={{ height: "90vh" }} fluid>

      <Form className=' p-5' style={{ borderRadius: '2%', backgroundColor: 'white' }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="Text" placeholder="Juan" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLast">
            <Form.Label>Apellido</Form.Label>
            <Form.Control type="Text" placeholder="Pedro" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>



        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Row>

          <Link className="mb-3" href="#">Cambiar contraseña</Link>
        </Row>

        <div className='d-flex flex-row-reverse'><Button variant="primary" type="submit">
          Guardar cambios
        </Button></div>


      </Form>

    </Container>

  );
}