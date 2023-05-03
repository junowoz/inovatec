import React, { useEffect } from "react";
import { useProjetoState } from "context/useProjetoState";
import { useRouter } from "next/router";
import {
  Container,
  Spinner,
  Row,
  Breadcrumb,
  Col,
  Carousel,
} from "react-bootstrap";
import Main from "components/main";
import Head from "next/head";

export default function Slug() {
  const { selectedProject, fetchProject } = useProjetoState();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchProject(slug);
    }
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
  //Função para gerar URL para as imagens
  const generateImageUrl = (path) => {
    const CDN =
      "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/midia/";
    return CDN + path;
  };

  const productImages =
    JSON.parse(selectedProject.productImg || "{}").path || [];
  const teamImages = JSON.parse(selectedProject.teamImg || "{}").path || [];

  return (
    <Main>
      <Head>
        <title>Inovatec | {selectedProject.name}</title>
      </Head>
      <Container className="px-5">
        {/* BREADCRUMB */}
        <Container className="mt-4 px-5">
          <Row>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
              <Breadcrumb.Item href="/projetos">Projetos</Breadcrumb.Item>
              <Breadcrumb.Item className="text-primary" active>
                {selectedProject.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Row>
        </Container>

        {/* RENDER */}
        <Container className="mt-2 px-5" key={selectedProject.id}>
          <Row className="d-flex justify-content-center">
            <Col>
              <h1>{selectedProject.name}</h1>
              <p>{selectedProject.slogan}</p>
            </Col>
            <Col>
              {/* Carousel para as imagens do produto */}
              <h2>Imagens do Produto</h2>
              <Carousel>
                {productImages.map((imgPath, index) => (
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

              {/* Carousel para as imagens da equipe */}
              <h2>Imagens da Equipe</h2>
              <Carousel>
                {teamImages.map((imgPath, index) => (
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
              </Carousel>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Descrição do Projeto</h2>
              <p>{selectedProject.projectDescription}</p>
            </Col>
            <Col>
              <h2>Descrição do Produto</h2>
              <p>{selectedProject.productDescription}</p>
            </Col>
          </Row>
          
            <Col>
              <h2>Membros</h2>
              {/* {selectedProject.members.map((member, index) => (
                <p key={index}>{member}</p>
              ))} */}
            </Col>
        </Container>
      </Container>
    </Main>
  );
}
