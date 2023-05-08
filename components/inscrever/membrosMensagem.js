// eslint-disable-next-line react/no-unescaped-entities
import React from "react";
import { Alert } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";

export const MembrosMensagem = () => {
  return (
    <div>
      <Alert variant="primary" className="p-4">
        <Alert.Heading>
          <FaUserPlus className="me-2" /> Adicione membros e fundadores do projeto
        </Alert.Heading>
        <ul>
          <li>
            Insira os nomes dos <italic>membros</italic> separados por vírgulas,
            Enter ou colando uma lista com os nomes.
          </li>
          <li>
            Adicione os <italic>fundadores</italic> preenchendo os campos
            &quot;Nome&quot; e &quot;LinkedIn ou Email&quot; e selecionando
            &quot;Fundador&quot; ou &quot;Cofundador&quot;. Clique no botão
            &quot;Adicionar Fundador&quot; para adicionar mais fundadores, se
            necessário.
          </li>
        </ul>
        <p>
          Fundadores são responsáveis pelo projeto, enquanto membros são outros
          integrantes que contribuem.
        </p>
        <p>
          Depois de adicionar todos os membros e fundadores, clique em
          &quot;Finalizar Inscrição&quot;.
        </p>
      </Alert>
    </div>
  );
};
