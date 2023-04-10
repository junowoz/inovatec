import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Login from 'components/formlogin/Login';

export default function Send() {
  return (
    <Login>

      <Container className='' style={{ padding: "20%" }}>
        <Container className='d-flex flex-column justify-content-center align-content-center align-items-center' >

          <Form>
            <h1 className='mb-4'>Hemos enviado un correo de confirmacion</h1>
            <h4>
              Te hemos enviado un email a tu dirección de correo electrónico. Contiene un enlace que te permitirá confirmar tu cuenta. Si no lo encuentras, recuerda revisar en la carpeta de correo no deseado/spam.
            </h4>
          </Form>
        </Container>


      </Container>
    </Login>
  );
}