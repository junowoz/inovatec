// eslint-disable-next-line react/no-unescaped-entities
import React from "react";
import { Alert } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

export const MembrosMensagem = () => {
  return (
    <div>
      <Alert variant="primary" className="p-4">
        <Alert.Heading>
          <FaUserPlus className="me-2" /> Adicione membros e líderes do projeto
        </Alert.Heading>
        <ul>
          <li>
            Insira os nomes dos <italic>membros</italic> separados por vírgulas,
            Enter ou colando uma lista com os nomes.
          </li>
          <li>
            Adicione os <italic>líderes</italic> preenchendo os campos
            &quot;Nome&quot; e &quot;LinkedIn ou Email&quot; e selecionando
            &quot;Fundador&quot; ou &quot;Cofundador&quot;. Clique no botão
            &quot;Adicionar Líder&quot; para adicionar mais líderes, se
            necessário.
          </li>
        </ul>
        <p>
          Líderes são responsáveis pelo projeto, enquanto membros são outros
          integrantes que contribuem.
        </p>
        <p>
          Depois de adicionar todos os membros e líderes, clique em
          &quot;Finalizar Inscrição&quot;.
        </p>
      </Alert>
    </div>
  );
};
