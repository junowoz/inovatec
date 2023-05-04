import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Spinner, Row, Breadcrumb, Col } from "react-bootstrap";
import Main from "components/main";
import Head from "next/head";
import { useProjetoState } from "context/useProjetoState";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import Imagens from "components/projetos/slug/imagens";
import { Membros } from "components/projetos/slug/membros";
import { CardIndex } from "components/projetos/slug/CardIndex";
import { CardSecundario } from "components/projetos/slug/CardSecundario";
import { Info } from "components/projetos/slug/Info";

export default function Slug() {
  const [hydration, setHydration] = useState(false);
  const { selectedProject, fetchProject } = useProjetoState();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchProject(slug);
    }
    setHydration(true);
  }, [slug]);

  if (!selectedProject) {
    return (
      <Main>
        <div
          style={{
            padding: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90hv",
            textAlign: "center",
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "50px", height: "50px", fontSize: "10px" }}
          />
        </div>
      </Main>
    );
  }

  return !hydration ? (
    ""
  ) : (
    <Main>
      <Head>
        <title>
          {selectedProject.name}: {selectedProject.slogan} | Inovatec
        </title>
      </Head>

      <Container className="my-5 px-4" key={selectedProject.id}>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
          <Breadcrumb.Item href="/projetos">Projetos</Breadcrumb.Item>
          <Breadcrumb.Item active>{selectedProject.name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="mt-4">
          <Col md={8}>
            <div border="none" className="p-2">
              <CardIndex />
            </div>

            {/* LINK DO PROJETO */}
            <hr style={{ color: "gray" }} />
            {selectedProject.link && (
              <div>
                <Link className="w-100 my-2" href={selectedProject.link}>
                  <FiExternalLink className="me-2" />
                  Link do projeto
                </Link>
                <hr style={{ color: "gray" }} />
              </div>
            )}

            <Info />

            <br></br>

            <hr style={{ color: "gray" }} className="my-4" />
          </Col>

          <Col md={4}>
            <Row className="mb-4">
              <CardSecundario />
            </Row>

            <Row>
              <Membros />
            </Row>
          </Col>

          <Row>
            <Col md={8}>
              <Imagens />
            </Col>
          </Row>
        </Row>
      </Container>
    </Main>
  );
}

{
  /* <Col>
<h2>Membros</h2>
{/* {selectedProject.members.map((member, index) => (
  <p key={index}>{member}</p>
))}
</Col> */
}

{
  /* Carousel para as imagens do produto */
}
{
  /* <h2>Imagens do Produto</h2>
<Carousel>
  {productImg.map((imgPath, index) => (
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={generateImageUrl(imgPath)}
        alt={`Imagem do produto ${index + 1}`}
        width={300}
        height={300}
      />
      <Carousel.Caption>
        <h3>Imagem do Produto {index + 1}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ))}
</Carousel>

 Carousel para as imagens da equipe 
<h2>Imagens da Equipe</h2>
<Carousel>
  {teamImg.map((imgPath, index) => (
    <Carousel.Item key={index}>
      <img
        className="d-block w-100"
        src={generateImageUrl(imgPath)}
        alt={`Imagem da equipe ${index + 1}`}
        width={300}
        height={300}
      />
      <Carousel.Caption>
        <h3>Imagem da Equipe {index + 1}</h3>
      </Carousel.Caption>
    </Carousel.Item>
  ))}
</Carousel> */
}

//Função para gerar URL para as imagens
// const generateImageUrl = (path) => {
//   const CDN =
//     "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/midia/";
//   return CDN + path;
// };
// const productImg = JSON.parse(selectedProject.productImg || "{}").path || [];
// const teamImg = JSON.parse(selectedProject.teamImg || "{}").path || [];
