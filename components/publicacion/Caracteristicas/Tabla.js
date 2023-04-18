import { Table, Col, Row } from "react-bootstrap";
import {useEffect} from "react";

import { projetosState } from "context/Projetos/ProjetosState";

export default function Tabla() {
  const bici = projetosState((state) => state.bici);

  useEffect(() => {
    console.log(bici)
  })

  const {
    brand,
    models,
    size,

    propiedades,

  } = bici;
    console.log("🚀 ~ file: Tabla.js:21 ~ Tabla ~ propiedades:", propiedades)
  

  const data = (name, datum) => {
    return (
      <tr>
        <td colSpan={2}>{name}</td>
        <td colSpan={2}>{datum}</td>
      </tr>
    );
  };

  /*  {
    transmission: { name: 'Shimano XTR' },
    category: { name: 'mtb' },
    subcategory: { name: 'endurance' },
    brands: { name: 'pinarello' },
    materials: { name: 'carbon' },
    suspension: null,
    frenos: { name: 'freno-disco' },
    rines: { name: '700-c' }
  } */

  return (
    <div>
      <Row>
        <Col md="2" className="me-2">
          <h5>Detalles</h5>
        </Col>
        <Col>
          <Table striped>
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              {propiedades?.brands?.name ? data("Marca", propiedades.brands.name) : null}
              {propiedades?.model ? data("Modelo", propiedades.model) : null}
              {propiedades?.transmission?.name ? data("Transmisión", propiedades?.transmission?.name) : null}
              {size.name ? data("Talla", size.name) : null}

              {propiedades?.materials?.name ? data("Material", propiedades?.materials?.name) : null}
              {propiedades?.suspension?.name ? data("Suspensión", propiedades?.suspension?.name) : null}
              {propiedades?.frenos?.name ? data("Frenos", propiedades?.frenos?.name) : null}
              {propiedades?.rines?.name ? data("Rines", propiedades?.rines?.name) : null}
{/* 


              {material ? data("Material", material) : null}

              {transmission ? data("Transmisión", transmission) : null}

              {suspension ? data("Suspensión", suspension) : null}

              {saddle ? data("Sillín", saddle) : null} */}


            </tbody>
          </Table>
        </Col>
      </Row>
    
{/*       {bici.others ? (
        <Row className="mt-5">
          <Col md="2">
            <h5>Build</h5>
          </Col>
          <Col>
            <Table striped>
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>Sillín</td>
                  <td colSpan={2}>None</td>
                </tr>
                <tr>
                  <td colSpan={2}>Rines</td>
                  <td colSpan={2}>None</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : null} */}
    </div>
  );
}
