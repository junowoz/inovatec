import React, { useEffect, useState } from "react";
import Main from "components/main";
import { Row, Col, Container, Button } from "react-bootstrap";
import Link from "next/link";
import Mountain from "public/Mountain.png";
import Image from "next/image";
import { avaluadorSelect } from "context/Avaluador/avaluadorSelectState";
import { BsHandbag, BsPencilSquare, BsTag } from "react-icons/bs";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { userState } from "context/User/UserState";
import { useRouter } from "next/router";
import PopLogin from "./modal";
import Condition from "yup/lib/Condition";
import { avaluadorState } from "context/Avaluador/avaluadorState";
import ModalCondition from "./modalcondition";

export default function Value() {
  const [hydration, setHydration] = useState(true);
  const { nameCondition, off, price, imageUrl, ...cardSelected } =
    avaluadorSelect((state) => state.cardSelected);

  useEffect(() => {
    console.log(cardSelected);
  }, []);

  const [modalShow, setModalShow] = useState(false);

  const confirmUser = userState((state) => state.confirmUser);
  const router = useRouter();

  const [popCondition, setPopCondition] = useState(false);



  const Valued = (valueA, valueB) => {
    const devalueA = parseInt(off ?? 0) + valueA;
    const priceA = (price - price * (devalueA / 100)).toLocaleString("en");
    const devalueB = parseInt(off ?? 0) + valueB;
    const priceB = (price - price * (devalueB / 100)).toLocaleString("en");
    return `$${priceA} - $${priceB}`;
  };

  const userStatus = async () => {
    const { user } = await confirmUser();

    user ? router.push("./") : setModalShow(true);
  };

  useEffect(() => {
    setHydration(false);
  }, []);

  return hydration ? (
    ""
  ) : (
    <Main>
      <Container className="justify-content-center my-5">
        <Row className="justify-content-center">
          <Col sm={100} md={6} lg={5} className="justify-content-center">
            <Container>
              <Image
                src={imageUrl}
                width={500}
                height={400}
                alt=""
                className="img-fluid"
              />
            </Container>
          </Col>
          <Col md="auto" className="d-flex d-md-block justify-content-center">
            <div>
              <Row sm="auto" className=" mb-2">
                <Col className="d-flex col-auto pe-0 align-items-center">
                  <HiArrowsRightLeft color="#0FA899" size={32} />
                </Col>
                <Col className="d-flex flex-column">
                  <p className="my-0">Te la compramos ya por</p>
                  <h5>{Valued(15, 10)}</h5>
                </Col>
              </Row>
              <Row sm="auto" className=" mb-2">
                <Col className="d-flex col-auto pe-0 align-items-center">
                  <BsHandbag size={32} color="#6F42C1" />
                </Col>
                <Col className="d-flex flex-column">
                  <p className="my-0">En nuestro Marketplace por</p>
                  <h5>{Valued(5, 0)}</h5>
                </Col>
              </Row>
              <Row sm="auto" className="mb-2 d-flex ">
                <Col className="d-flex  col-auto pe-0 align-items-center">
                  <BsTag size={32} color="#0FA899" />
                </Col>
                <Col className="d-flex flex-column">
                  <p className="my-0">Si estuviera nueva</p>
                  <h5>${price?.toLocaleString("en")}</h5>
                </Col>
              </Row>
              <Row
                sm="auto"
                className=" mb-2 ps-2"
                style={{ color: "rgba(15, 168, 153, 1)" }}
                onClick={() => {
                  setPopCondition(true)
                }}
              >
                <Col className="d-flex col-auto pe-0 align-items-center">
                  <BsPencilSquare size={14} />
                </Col>
                <Col className="d-flex ps-1 flex-column">
                  Condición {nameCondition ?? Excelente}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className="justify-content-around mt-2 py-3 align-items-center d-none d-md-flex">
          <Link href="./search" className="mx-3">
            Atrás
          </Link>
          <div>
            <Link href={"./enviar"}>
              <Button className="mx-2" variant="primary" type="submit">
                <HiArrowsRightLeft size={16} /> Véndela ya
              </Button>
            </Link>

            <Button
              variant="primary"
              style={{
                backgroundColor: "rgba(111, 66, 193, 1)",
                border: "rgba(111, 66, 193, 1)",
              }}
              type="submit"
              onClick={() => userStatus()}
            >
              <BsHandbag size={16} /> Publicarla en el Marketplace
            </Button>
          </div>
        </div>
        <ModalCondition modalShow={popCondition} setModalShow={setPopCondition} />

        <PopLogin
          show={modalShow}
          onHide={() => setModalShow(false)}
          setModalShow={setModalShow}
        />
      </Container>

      <div className="d-none d-lg-block" style={{ height: "10rem" }} />
    </Main>
  );
}
