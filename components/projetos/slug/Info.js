import { useProjetoState } from "context/useProjetoState";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

export const Info = () => {
  const [hydration, setHydration] = useState(false);
  const { selectedProject } = useProjetoState();

  useEffect(() => {
    setHydration(true);
  }, []);

  return !hydration ? (
    ""
  ) : (
    <div className="mt-4">
      {/* DESCRIÇÃO */}
      <Card.Text className="mb-4">
        <Card.Title className="mb-1 text-primary">Descrição</Card.Title>
        {selectedProject.projectDescription}
      </Card.Text>
      {/* PÚBLICO ALVO */}
      <Card.Text className="mb-4">
        <Card.Title className="mb-1 text-primary">Público Alvo</Card.Title>
        {selectedProject.targetAudience}
      </Card.Text>
      {/* VIABILIDADE */}
      <Card.Text>
        <Card.Title className="mb-1 text-primary">Viabilidade</Card.Title>
        {selectedProject.projectViability}
      </Card.Text>
      {/* DESCRIÇÃO DO PRODUTO */}
      <Card.Text>
        <Card.Title className="text-primary">Descrição do Produto</Card.Title>
        {selectedProject.productDescription}
      </Card.Text>
    </div>
  );
};
