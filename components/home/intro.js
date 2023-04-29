import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
  InputGroup,
} from "react-bootstrap";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function Presentation() {
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    props.onSearch(searchText);
  }

  function handleInputChange(e) {
    setSearchText(e.target.value);
  }

  return (
    <Container className="text-center py-5 px-md-5">
      <div className="py-lg-4 px-lg-2">
        {/* Presentation */}
        <Row className="pb-lg-5 py-lg-4">
          <Col className="text-center d-flex flex-column justify-content-center align-items-baseline">
            <Image
              src="/Inovatec.png"
              alt="Inovatec"
              style={{ maxWidth: "75%"}}

              // Set width for different breakpoints using w- utility classes
              // w-100: full width for xs breakpoint
              // w-sm-75: 75% width for sm breakpoint and above
              // w-lg-70: 70% width for lg breakpoint and above
              className="d-lg-none align-self-center"
            />
            <h5 className="fw-bold fs-4 tittle-custom py-3 py-sm-3 d-lg-none">
              A Inovatec é uma iniciativa de empreendedorismo tecnológico
              formada por alunos e professores do setor de Computação da
              Fametro.
            </h5>
            <h5 className="fw-bold fs-3 tittle-custom py-3 py-sm-3 d-none d-lg-block">
              A Inovatec é uma iniciativa de empreendedorismo tecnológico
              formada por alunos e professores do setor de Computação da
              Fametro.
            </h5>
          </Col>
          <Col className="d-none d-lg-block d-flex flex-column">
            <div className="text-center bg-image">
              <Card.Img
                variant="top"
                src="/Inovatec.png"
                className="align-self-center img-fluid"
                style={{ maxWidth: "85%"}}
              />
            </div>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row>
          <Form
            onSubmit={handleSearch}
            className="pb-3 pt-3 justify-content-center align-items-center"
          >
            <Row className="align-items-center justify-content-center">
              <Col lg={12} md={12} sm={12} xs={12} className="text-center">
                <InputGroup>
                  <InputGroup.Text id="search-icon">
                    <BiSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Pesquisar..."
                    value={searchText}
                    onChange={handleInputChange}
                    className="px-3 py-2"
                  />
                  <Button type="submit" variant="primary" className="py-2 px-3">
                    Pesquisar
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Form>
        </Row>
      </div>
    </Container>
  );
}
