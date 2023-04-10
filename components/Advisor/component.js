import Contenedor from "components/home/Contenedor";

import { Card, Col, Container, Form, Row } from "react-bootstrap";

import ImagePrueba from "./img";
import PropTypes from "prop-types";

export default function AdvisorComponent(props) {
    return (
        <Contenedor>
            <Container>
                <Row>
                    <Col>{props.children}</Col>

                    <Col className="d-none d-xl-block">
                        <ImagePrueba />
                    </Col>
                </Row>
            </Container>
        </Contenedor>
    );
}

export const Selects = ({ name, data, register, ...props }) => {
    return (
        <div className={props.className}>
            <label className="w-100">
                <Card>
                    <Card.Body>
                        <Form.Check
                            style={{ color: "#212928", fontWeight: 600 }}
                            type="radio"
                            value={data.value}
                            label={data.title}
                            id={data.value}
                            onClick={() => {
                                setTimeout(() => {
                                    props.HandleClick();
                                }, 10);
                            }}
                            {...register(name)}
                        />{" "}
                        <Card.Text
                            className="ms-4"
                            style={{ color: "#6C757D" }}
                        >
                            {data.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </label>
        </div>
    );
};

Selects.PropType = {
    data: PropTypes.object,
    register: PropTypes.object,
    name: PropTypes.string,
};

Selects.defaultProps = {
    data: "option",
    register: {},
    HandleClick: () => null,
};
