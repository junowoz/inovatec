import Contenedor from "components/home/Contenedor";
import Image from "react-bootstrap/Image";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Custom404() {

        const router = useRouter();

  return (
    <Contenedor>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
          className="my-5 d-flex justify-content-center flex-column align-content-center align-items-center"
        >
          <div
          className="d-flex "
            style={{
              maxWidth: "567px",
            }}
          >
            <Image
              src="/Error404.png"
              alt=""
              className="img-fluid"
              style={{}}
            />
          </div>
          <h3 style={{ color: "#0FA899" }} className="mb-3">
            ¡No encontramos esta ruta! Sigue rodando en Recycling
          </h3>
          <div className="w-100 d-flex justify-content-center mb-5">
            <Button gap={2} color="primary" className="d-md-none w-100" onClick={() => router.push('/')} >
              Ir a la Página de Inicio
            </Button>
            <Button  color="primary" className="d-none d-md-block" onClick={() => router.push('/')} >
              Ir a la Página de Inicio
            </Button>
          </div>
        </div>
      </Container>
    </Contenedor>
  );
}
