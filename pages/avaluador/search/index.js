import Main from "components/main";
import { avaluadorState } from "context/Avaluador/avaluadorState";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Relleno from "utils/relleno";
import { shallow } from "zustand/shallow";
import ButtonsYears from "./ButtonsYears";

import { useQuery } from "@tanstack/react-query";
import ListBicis from "./listbicis";
import Pop from "./pop";
import { avaluadorSelect } from "context/Avaluador/avaluadorSelectState";

export default function IndexAvaluador(props) {
  const [modalShow, setModalShow] = useState(false);

  const quest = avaluadorState((state) => state.quest, shallow);

  const brand = avaluadorState((state) => state.brand);

  const setBrand = avaluadorState((state) => state.setBrand);

  const projetos = avaluadorState((state) => state.projetos);

  const setProjetos = avaluadorState((state) => state.setProjetos);

  const setCardSelected = avaluadorSelect((state) => state.setCardSelected);

  const conditions = avaluadorState((state) => state.conditions);

  const setConditions = avaluadorState((state) => state.setConditions);

  const [models, setModels] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (e) => {
    setBrand(e.search);
  };

  let { isLoading, isError, error, data } = useQuery({
    queryKey: ["models"],
    queryFn: setProjetos,
  });

  const state = {
    data: projetos,
    quest,
    brand,
    modalShow,
    setModalShow,
    setCardSelected,
  };

  useEffect(() => {
    if (conditions.length === 0) {
      setConditions();
    }
  }, [modalShow]);

  useEffect(() => {
    setModels(ListBicis(state));
  }, [quest, brand, projetos]);

  return (
    <Main>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <InputGroup className="mb-3 mt-5" style={{ maxWidth: "456px" }}>
              <Form.Control
                type="search"
                className="me-2"
                style={{ borderRadius: "0.375rem" }}
                {...register("search")}
              />
              <InputGroup.Text
                className="p-0 d-flex "
                style={{ border: "none", background: "none" }}
              >
                <Button variant="primary" className=" " type="submit">
                  Search
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Row>
        </form>

        <h1 style={{ color: "#06433D", fontStyle: "Bold" }}>{brand}</h1>
        <p>{models.filter((n) => n !== null).length} Resultados</p>

        <ButtonsYears />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
            gap: "16px",
          }}
          className="mt-3"
        >
          {isLoading ? (
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
          ) : (
            models
          )}

          <Relleno />
        </div>

        <Pop show={modalShow} onHide={() => setModalShow(false)} />
      </Container>
      <div className="mb-5 " />
    </Main>
  );
}
