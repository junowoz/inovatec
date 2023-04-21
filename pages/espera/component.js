import Main from "components/main";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import ImagePrueba2 from "./img";

export default function EsperaComponent(props) {
    return (
        <Main>
            <Container>
                <Row>
                    <Col className="d-flex justify-content-center flex-column mt-lg-0 mt-5 p-sm-4 p-5">
                        {props.children}
                    </Col>

                    <Col className="d-none d-lg-block ">
                        <ImagePrueba2 />
                    </Col>
                </Row>
            </Container>
            <div className="mb-5 mb-sm-0 " />
        </Main>
    );
}

// export const Selects = ({ name, data, register, ...props }) => {
//     return (
//         <>
//             <div className={props.className}>
//                 <label className="w-100">
//                     <Card>
//                         <Card.Body>
//                             <Form.Check
//                                 style={{ color: "#212928", fontWeight: 600 }}
//                                 type="radio"
//                                 value={data.value}
//                                 label={data.title}
//                                 id={data.value}
//                                 onClick={() => {
//                                     setTimeout(() => {
//                                         props.HandleClick();
//                                     }, 10);
//                                 }}
//                                 {...register(name)}
//                             />{" "}
//                             <Card.Text
//                                 className="ms-4"
//                                 style={{ color: "#6C757D" }}
//                             >
//                                 {data.description}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </label>
//             </div>
//         </>
//     );
// };

// Selects.PropType = {
//     data: PropTypes.object,
//     register: PropTypes.object,
//     name: PropTypes.string,
// };

// Selects.defaultProps = {
//     data: "option",
//     register: {},
//     HandleClick: () => null,
// };
