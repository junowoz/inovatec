import { avaluadorState } from "context/Avaluador/avaluadorState";
import { Card, Col, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { use, useEffect, useRef, useState } from "react";

export default function ListBicis({
  data,
  quest,
  brand,
  setModalShow,
  setCardSelected,
}) {
  return data?.map((datum) => {
    let { name, price, year, id, brands, imageUrl } = datum;

    if (
      (quest.years.length === 0 || quest.years?.includes(year)) &&
      (name.toLowerCase().includes(brand.toLowerCase()) ||
        brands.name.toLowerCase().includes(brand.toLowerCase()))
    ) {
      return (
        <div key={id}>
          <Card
            style={{ width: "auto", maxWidth: "514px", minHeight: "361px" }}
            onClick={() => {
              setModalShow(true);
              setCardSelected(datum);
            }}
          >
            <div className="m-3">
              <Card.Img variant="top" src={imageUrl} />
            </div>
            <Card.Body>
              <Card.Title>
                {brands.name}, {name}, {year}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      );
    }

    return null;
  });
}
