import { useEffect } from "react";
import Contenedor from "components/home/Contenedor";
import Article from "../Home/Article";
import Descriptons from "components/publicacion/vender";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Carractristicas from "components/publicacion/Caracteristicas";
import Vista from "components/publicacion/Vista";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

import Custom404 from "pages/404";
import { projetosState } from "context/Projetos/ProjetosState";

const Vender = () => {
  const { id } = useRouter().query;

  const bici = projetosState((state) => state.bici);

  const setBici = projetosState((state) => state.setBici);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["productos", id],
    queryFn: () => setBici(id),
  });

  if (isLoading) {
    return (
      <Contenedor>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90hv",
            textAlign: "center",
          }}
        >
          <Spinner
            animation="border"
            variant="secondary"
            style={{ width: "200px", height: "200px", fontSize: "90px" }}
          />
        </div>
        
      </Contenedor>
    );
  }
  if (isError) {
    return <Custom404 />;
  }

  return  (
    <Contenedor>
      <Container>
        <Row className="d-flex justify-content-center">
          <Row>
            <Col className="pb-4">
              <Vista />

              <div className=" d-lg-none   ">
                <Descriptons />
              </div>

              <Carractristicas />
            </Col>
            <Col
              sm="100"
              md="auto"
              lg="5"
              xl="5"
              xxl="4"
              className="d-none d-lg-block"
            >
              <Descriptons />
            </Col>
          </Row>
        </Row>
      </Container>

      <Article Title="Explora más bicis" />
    </Contenedor>
  )
};


export default Vender;
