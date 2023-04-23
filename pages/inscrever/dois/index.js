import React, { useState } from "react";
import Main from "components/main";
import {
  Row,
  Form,
  Col,
  Container,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Link from "next/link";
import Progress2 from "./progress2";

export default function Dois() {
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [people, setPeople] = useState([
    { type: "fundador", index: 1, canDelete: false },
  ]);
  const [deletedPeopleCount, setDeletedPeopleCount] = useState(0);

  const handleAddPerson = (type) => {
    setNumOfPeople(numOfPeople + 1);
    setPeople([
      ...people,
      { type, index: numOfPeople + 1 + deletedPeopleCount, canDelete: true },
    ]);
  };

  const handleDeletePerson = (index) => {
    const updatedPeople = people.filter((person) => person.index !== index);
    setPeople(updatedPeople);

    // increment deletedPeopleCount if the deleted person is not a cofounder and there is only one founder left
    if (
      updatedPeople.filter((p) => p.type === "fundador").length === 1 &&
      updatedPeople.find((p) => p.index === index)?.type !== "fundador"
    ) {
      setDeletedPeopleCount(deletedPeopleCount + 1);
    }
  };

  const cards = people.map((person) => {
    const isFundador = person.type === "fundador";

    const canDelete =
      person.canDelete ||
      (isFundador && people.filter((p) => p.type === "fundador").length > 1);

    return (
      <Card key={person.index} className="mb-3">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <span>
              {isFundador ? "Fundador" : "Cofundador"} {person.index}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeletePerson(person.index)}
              disabled={!canDelete}
            >
              Excluir
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Form.Group controlId={`name${person.index}`}>
            <Form.Label>
              Nome <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control type="text" placeholder="Digite seu nome..." />
          </Form.Group>
          {isFundador && (
            <Form.Group controlId={`email${person.index}`} className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Digite seu email..." />
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    );
  });

  return (
    <Main>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="8" xl="6">
            <Form className=" py-5">
              <Progress2 />

              {/*Texto*/}
              <Alert variant="primary">
                <Alert.Heading>Adicione os Fundadores e Cofundadores do Projeto</Alert.Heading>
                <p>
                Insira os nomes dos líderes e colaboradores do projeto nos campos abaixo.
                </p>
                <hr />
                <p className="mb-0">
                <span style={{fontWeight: 'bold'}}>Fundadores</span> são lideres do projeto.
                </p>                
                <p className="mb-0">
                <span style={{fontWeight: 'bold'}}>Cofundadores</span> são pessoas que contribuem para o projeto.
                </p>
              </Alert>
              {/*EndTexto*/}
              <div className="my-5">
                {cards}
                <Button
                  variant="primary"
                  onClick={() => handleAddPerson("fundador")}
                  className="me-3"
                >
                  + Fundador
                </Button>

                <Button
                  variant="primary"
                  onClick={() => handleAddPerson("cofundador")}
                >
                  + Cofundador
                </Button>
                {/* Botones */}
                <div className="d-flex justify-content-end align-items-center">
                  <Link href="./" className="mx-3">
                    <BsChevronLeft
                      size={18}
                      className="me-2 align-items-center"
                    />
                    Atrás
                  </Link>

                  <Link href="./inscrever/tres">
                    <Button variant="primary" type="submit">
                      Seguinte
                      <BsChevronRight
                        size={18}
                        className="ms-2 align-items-center"
                      />
                    </Button>
                  </Link>
                </div>
                {/* End Botones */}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <div className="d-none d-lg-block" style={{ height: "20rem" }} />
    </Main>
  );
}

//   return (
//     <Main>
//       <Container>
//         <Row className="justify-content-md-center">
//           <Col md="8" xl="6">
//             <Form className=" py-5" onSubmit={handleSubmit(onSubmit)}>
//               <Progress2 />

//               <div className="my-5">
//                 {publication.model === "1" ? (
//                   <Form.Group className="mb-3" controlId="model">
//                     <Form.Label>
//                       Name Model <span className="text-danger">*</span>
//                     </Form.Label>
//                     <Form.Control
//                       isInvalid={!!errors?.other}
//                       /* value={values.model} */
//                       {...register("other")}
//                     ></Form.Control>
//                     <Form.Control.Feedback type="invalid">
//                       {errors.other?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 ) : (
//                   ""
//                 )}

//                 {publication.model === "1" ? (
//                   <Form.Group className="mb-3" controlId="subcategory">
//                     <Form.Label>
//                       Subcategoria <span className="text-danger">*</span>
//                     </Form.Label>
//                     <Form.Select
//                       isInvalid={!!errors.subcategory}
//                       {...register("subcategory")}
//                     >
//                       <option value="">Selecciona una talla</option>
//                       {selectList(form?.subcategory)}
//                     </Form.Select>
//                     <Form.Control.Feedback type="invalid">
//                       {errors.subcategory?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 ) : (
//                   ""
//                 )}

//                 {/* Talla */}
//                 <Form.Group className="mb-3" controlId="size">
//                   <Form.Label>
//                     Talla <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Select isInvalid={!!errors.size} {...register("size")}>
//                     <option value="">Selecciona una talla</option>
//                     {selectList(form?.sizes)}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors?.size?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Material */}
//                 <Form.Group className="mb-3" controlId="materials">
//                   <Form.Label>
//                     Material <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     isInvalid={!!errors.material}
//                     {...register("material")}
//                   >
//                     <option value="">Selecciona un material</option>

//                     {selectList(form?.materials)}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors?.material?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Transmisión */}
//                 <Form.Group className="mb-3" controlId="transmission">
//                   <Form.Label>
//                     Transmisión <span className="text-danger">*</span>
//                   </Form.Label>
//                   <Form.Select
//                     isInvalid={errors?.transmission}
//                     {...register("transmission")}
//                   >
//                     <option value="">Selecciona una transmisión</option>
//                     {selectList(form?.transmissions)}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     {errors?.transmission?.message}
//                   </Form.Control.Feedback>
//                 </Form.Group>

//                 {/* Rin */}
//                 {publication?.category === "1" ||
//                 publication?.category === "3" ||
//                 publication?.category === "6" ? (
//                   <Form.Group className="mb-3" controlId="rin">
//                     <Form.Label>Rin</Form.Label>
//                     <Form.Select
//                       isInvalid={errors?.transmission}
//                       {...register("rin")}
//                     >
//                       <option value="">Selecciona un rin</option>
//                       {selectList(form?.rines)}
//                     </Form.Select>
//                     <Form.Control.Feedback type="invalid">
//                       {errors?.rin?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 ) : (
//                   ""
//                 )}

//                 {/* freno */}
//                 {publication?.category === "2" ? (
//                   <Form.Group className="mb-3" controlId="freno">
//                     <Form.Label>freno</Form.Label>
//                     <Form.Select
//                       isInvalid={errors?.freno}
//                       {...register("freno")}
//                     >
//                       <option value="">Selecciona un freno</option>
//                       {selectList(form?.frenos)}
//                     </Form.Select>
//                     <Form.Control.Feedback type="invalid">
//                       {errors?.freno?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 ) : (
//                   ""
//                 )}

//                 {/* suspension */}
//                 {publication?.category === "1" ? (
//                   <Form.Group className="mb-3" controlId="suspension">
//                     <Form.Label>Suspension</Form.Label>
//                     <Form.Select
//                       isInvalid={errors?.suspension}
//                       {...register("suspension")}
//                     >
//                       <option value="">Selecciona una Suspension</option>
//                       {selectList(form?.suspension)}
//                     </Form.Select>
//                     <Form.Control.Feedback type="invalid">
//                       {errors?.suspension?.message}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 ) : (
//                   ""
//                 )}

//                 {/* Botones */}
//                 <div className="d-flex justify-content-end pt-3 align-items-center">
//                   <Link href="./uno" className="mx-3">
//                     <BsChevronLeft
//                       size={18}
//                       className="me-2 align-items-center"
//                     />
//                     Atrás
//                   </Link>

//                   <Button variant="primary" type="submit">
//                     Valor de tu bici
//                     <BsChevronRight
//                       size={18}
//                       className="ms-2 align-items-center"
//                     />
//                   </Button>
//                 </div>
//               </div>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//       <div className="d-none d-lg-block" style={{ height: "20rem" }} />
//     </Main>
//   );
// };
