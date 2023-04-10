import { avaluadorSelect } from "context/Avaluador/avaluadorSelectState";
import { avaluadorState } from "context/Avaluador/avaluadorState";
import { useRouter } from "next/router";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useEffect} from "react"

export default function ModalCondition(props) {

    const router = useRouter()
    const conditions = avaluadorState((state) => state.conditions);
    const setCardSelected = avaluadorSelect((state) => state.setCardSelected);
    const setConditions = avaluadorState((state) => state.setConditions);
  
    const {
      handleSubmit,
      register,
      setError,
      control,
      formState: { isValid, errors },
    } = useForm();
  
    const onSubmit = (data) => {

      const datum =conditions.filter(condition => condition.id == data.nameCondition)[0]

      setCardSelected({nameCondition: datum.name, off: datum.off})
      
      props.setModalShow(false)
    };

    useEffect(() => {
      if (conditions.length === 0) {
        setConditions();
      }
    }, []);
  
    return (
      <Modal
        show={props.modalShow} 
        onHide={() => props.setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <form className=" py-5" onSubmit={handleSubmit(onSubmit)}>
            {conditions?.map((datum) => {
              return (
                <Form.Group key={datum.id} required>
                  <div className="d-flex justify-content-sm-between flex-column flex-sm-row my-4 ">
                    <Col className="mx=sm-4 my-2 my-sm-0">
                      <Form.Check type="radio" id={`radio-${datum.id}`}>
                        <Form.Check.Input
                          required
                          type="radio"
                          value={datum.id}
                          {...register("nameCondition")}
                        />
  
                        <Form.Check.Label>{datum.name}</Form.Check.Label>
                      </Form.Check>
                    </Col>
  
                    <Col sm="5" className="">
                      {datum.description}
                    </Col>
                  </div>
                </Form.Group>
              );
            })}
            <Button type="submit">Valorar </Button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
  