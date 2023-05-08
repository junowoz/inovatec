import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Spinner, Row, Breadcrumb, Col } from "react-bootstrap";
import Main from "components/main";
import Head from "next/head";
import { useProjetoState } from "context/useProjetoState";
import { FiExternalLink } from "react-icons/fi";
import Midia from "components/projetos/slug/Midia";
import { Membros } from "components/projetos/Membros";
import { CardIndex } from "components/projetos/slug/CardIndex";
import { CardSecundario } from "components/projetos/slug/CardSecundario";
import { Info } from "components/projetos/slug/Info";
import Erro404Projeto from "pages/404Projeto";

export default function Slug() {
  const [hydration, setHydration] = useState(false);
  const [loading, setLoading] = useState(true); // estado para rastrear o carregamento
  const { selectedProject, fetchSlugProject, clearSelectedProject } =
    useProjetoState();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchSlugProject(slug).finally(() => {
        setLoading(false); // parar o carregamento após a chamada ser concluída
        setHydration(true);
      });
    }
    // Função de limpeza para definir selectedProject como null quando o componente for desmontado
    return () => {
      clearSelectedProject();
    };
  }, [slug, clearSelectedProject, fetchSlugProject]);

  if (loading) {
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

  if (!selectedProject) {
    return (
      <div>
        <Erro404Projeto />
      </div>
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
          <Col xs={14} sm={12} md={8} lg={8} xl={8} xxl={8} >
            <div border="none" className="p-2">
              <CardIndex />
            </div>

            {/* LINK DO PROJETO */}
            <hr style={{ color: "gray" }} />
            {selectedProject.link && (
              <div>
                <a
                  className="w-100 my-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    selectedProject.link.startsWith("http://") ||
                    selectedProject.link.startsWith("https://")
                      ? selectedProject.link
                      : "//" + selectedProject.link
                  }
                >
                  <FiExternalLink className="me-2" />
                  Link do projeto
                </a>
                <hr style={{ color: "gray" }} />
              </div>
            )}

            <Info />

            <br></br>

            <hr style={{ color: "gray" }} className="my-2" />
            <Row>
              <Col md={10}>
                <Midia />
              </Col>
            </Row>
          </Col>

          <Col>
            <Row className="mb-4">
              <CardSecundario />
            </Row>

            <Row>
              <Membros />
            </Row>

          </Col>
        </Row>
      </Container>
    </Main>
  );
}
