import Link from "next/link";
import { Container, Button, Accordion } from "react-bootstrap";
import PropTypes from "prop-types";
import { parkingState } from "context/Parking/ParkingState";
import { BsChatSquareDots, BsShieldCheck } from "react-icons/bs";

export default function Descriptons() {
  const bici = parkingState((state) => state.bici);

  return (
    <Container className="py-3 d-flex flex-column">
      <h2>{bici.title}</h2>
      <p className="text-secondary">SKU: {bici.id}</p>

      <p className="mb-0 text-secondary ">
        Altura recomendada del ciclista:{" "}
        <strong className="text-black">1,77m - 1,85m</strong>
      </p>
      <Link href="#">Guía de tallas</Link>
      <h2 className="my-4">${bici.price.toLocaleString("en")}</h2>

      <Button className="mb-2 py-2">Añadir al carrito</Button>
      {/* <Button className="mb-2" variant="outline-primary btn-outline">
        Trade - in
      </Button> */}
      <div className="mt-3 d-flex justify-content-center">
        <h6 className="fw-bold">
          <BsChatSquareDots className="me-2" />
          Dudas sobre la bici?{" "}
          <Link href="#" className="fw-normal">
            {" "}
            Pregúntanos
          </Link>
        </h6>
      </div>

      <Accordion className="mt-3 separador" defaultActiveKey="0" flush>
        <Accordion.Item eventKey="1" className="separador">
          <Accordion.Header>
            <span className="fw-bold">Envío y ensamblaje</span>
          </Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <span className="fw-bold">Garantía</span>
          </Accordion.Header>

          <Accordion.Body>
            <Link href="#">
              <BsShieldCheck className="me-2" />
              Recycling Certified - 12 meses
            </Link>
            <p className="mt-2">
              Esta bicicleta ha sido inspeccionada y certificada por nuestros
              expertos mecánicos.
              <br />
              <br />
              Nuestro servicio de guante blanco incluye una puesta a punto de
              transmisión, frenos y dirección. Los consumibles desgastados como
              cadena, pastillas de freno, cubiertas o cableado son reemplazados
              por otros nuevos si han llegado al final de su vida útil
            </p>
            <hr className="text-secondary" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
