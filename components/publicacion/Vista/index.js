/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Breadcrumb, Row, Col, Carousel } from "react-bootstrap";
import PropTypes from "prop-types";

import Image from "next/image";
import { parkingState } from "context/Parking/ParkingState";

export default function Vista() {
  const [bici, CDN2] = parkingState((state) => [state.bici, state.CDN2]);

  const CDN = "https://yrdmpvdxobghopvoevsg.supabase.co/storage/v1/object/public/imagesbicis/"

  const [primaryVista, setPrimaryVista] = useState(
    bici?.filesUrl[0] ? bici?.filesUrl[0] :"https://via.placeholder.com/500x500" 
  );

  return (
    <>
      <Row className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/parking">Parking</Breadcrumb.Item>
          <Breadcrumb.Item active>SKU: {bici.id}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col md="2" className="d-none d-lg-block">
          {bici.filesUrl.map((link) => (
            <Image
              src={CDN + link}
              alt=""
              key={link}
              width={50}
              height={50}
              className="m-2 cover"
              onClick={() => setPrimaryVista(link)}
            />
          ))}
        </Col>
        <Col className="d-none d-lg-block" style={{height: "620px"}}>

            <Image src={CDN + primaryVista} height={500} width={500} alt="" style={{
              maxHeight: "600px"
            }}  className="img-fluid p-0" />

        </Col>

        <Col className="d-lg-none">
          <Carousel style={{height: "70vw"}}>
            {bici.filesUrl.map((link) => (
              <Carousel.Item key={link} style={{maxHeight: "70vw"}}>
                <img
                  style={{maxHeight: "70vw"}}
                  src={CDN + link}
                  className="d-block w-100 img-fluid"
                  alt="First slide"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
}
