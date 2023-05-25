import React from "react";
import { Card } from "react-bootstrap";

export default function PresentationProjetos() {
  return (
    <div>
      <Card variant="primary" className="">
        <Card.Body>
          <Card.Title className="fw-bold">Diretório de Projetos</Card.Title>

          <Card.Text className="">
            Bem-vindo ao diretório de projetos Inovatec, uma iniciativa do
            Centro Universitário Fametro para divulgar os projetos desenvolvidos
            pelos alunos dos cursos de computação ao longo dos anos.
          </Card.Text>
          <Card.Text className="">
            Aqui você pode filtrar os projetos por ano, semestre, tipo de
            tecnologia utilizada, indústria de atuação e muito mais. Não deixe
            de conferir a criatividade e inovação dos nossos alunos!
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
