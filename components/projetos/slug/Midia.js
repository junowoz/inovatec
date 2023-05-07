import { useProjetoState } from "context/useProjetoState";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, Image, Col, Row } from "react-bootstrap";

const ImageUrl = (path) => {
  const CDN =
    "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/midia/";
  return CDN + path;
};

export default function Midia() {
  const [hydration, setHydration] = useState(false);
  const { selectedProject } = useProjetoState();

  //Função para gerar URL para as imagens
  const CDN =
    "https://tskpdujrzwsmbmdcxlej.supabase.co/storage/v1/object/public/midia/";

  //GERA PRODUTO
  const productImg = JSON.parse(selectedProject.productImg || "{}").path || [];

  //GERA TIME
  const teamImg =
    CDN + JSON.parse(selectedProject.teamImg || "{}").path?.[0] || "";

  useEffect(() => {
    setHydration(true);
  }, []);

  return !hydration ? (
    ""
  ) : (
    <div className="my-4">
      <div>
        <Card.Title className="mb-1 text-muted">Produto</Card.Title>
        <Row>
          {productImg.map((imgPath, index) => (
            <Col key={index}>
              <Link href={ImageUrl(imgPath)} target="blank">
                <Image
                  className="mx-auto m-2 w-100"
                  rounded
                  fluid
                  style={{ border: "1px solid gray" }}
                  src={ImageUrl(imgPath)}
                  alt={`Produto ${index + 1}`}
                />
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      {/* FOTO DO TIME */}
      <div className="my-4">
        <Card.Title className="mb-1 text-muted">Time</Card.Title>
        <Link href={teamImg} target="blank">
          <Image
            src={teamImg}
            className="d-block mx-auto m-2 w-20"
            rounded
            fluid
            style={{ border: "1px solid gray" }}
          />
        </Link>
      </div>
    </div>
  );
}
