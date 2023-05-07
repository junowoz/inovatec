import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Spinner, Row, Breadcrumb, Col } from "react-bootstrap";
import Main from "components/main";
import Head from "next/head";
import { useProjetoState } from "context/useProjetoState";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import Midia from "components/projetos/slug/Midia";
import { Membros } from "components/projetos/slug/Membros";
import { CardIndex } from "components/projetos/slug/CardIndex";
import { CardSecundario } from "components/projetos/slug/CardSecundario";
import { Info } from "components/projetos/slug/Info";

export default function Slug() {
  const [hydration, setHydration] = useState(false);
  const [loading, setLoading] = useState(true); // estado para rastrear o carregamento
  const { selectedProject, fetchSlugProject } = useProjetoState();
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      fetchSlugProject(slug).finally(() => {
        setLoading(false); // parar o carregamento após a chamada ser concluída
        setHydration(true);
      });
    }
  }, [slug]);

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
          <p>Projeto não encontrado.</p>
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
              <Midia />
            </Col>
          </Row>
        </Row>
      </Container>
    </Main>
  );
}
