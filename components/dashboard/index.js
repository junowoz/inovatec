import Link from "next/link";
import React from "react";
import { Col, Row, Container, Button } from "react-bootstrap";

export default function DashboardContainer(props) {
  const styles = (puntero, name) => {
    return puntero === name
      ? { color: "#000000E5", background: "#CFEEEB" }
      : {
          color: "#0000008C",
        };
  };

  return (
    <div
      className="d-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1.1fr 1fr",
        gridTemplateRows: "1fr 1.1fr 0.9fr",
        gap: "0px 0px",
        gridTemplateAreas: ` "panel settings settings"
        "panel settings settings"
        "panel settings settings"`,
      }}
    >
      <Col
        className="d-grid  align-content-between "
        style={{ gridArea: "panel" }}
      >
        <div className="d-grid">
          <h5>Admin Dashboard</h5>
          <Link
            className="ps-1"
            href={"./publicaciones"}
            style={styles(props.puntero, "publicaciones")}
          >
            Publicaciones de venta
          </Link>
          <Link
            className="ps-1"
            href={"./ventadirecta"}
            style={styles(props.puntero, "ventadirecta")}
          >
            Ventas directas
          </Link>

          <Link
            className="ps-1"
            href={"./listadeespera"}
            style={styles(props.puntero, "listadeespera")}
          >
            Lista de espera
          </Link>
          <Link
            className="ps-1"
            href={"ach"}
            style={styles(props.puntero, "ach")}
          >
            Pagos por ACH
          </Link>
        </div>
        <div className="d-grid">
          <Link
            className="ps-1"
            href={"./miembros"}
            style={styles(props.puntero, "miembros")}
          >
            Miembros
          </Link>
          <Link className="ps-1 Link" href={"#"} style={{ color: "#0000008C" }}>
            Cerrar sesión
          </Link>
        </div>
      </Col>

      <div
        className="p-3"
        xs={6}
        style={{ background: "#f8f9fa", gridArea: "settings" }}
      >
        {props.children}
      </div>
    </div>
  );
}
