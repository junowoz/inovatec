import React, { useState } from "react";
import { userState } from "context/User/UserState";
import {
  Form,
  Button,
  Alert,
  Container,
  Modal,
  Col,
  Card,
  Row,
} from "react-bootstrap";
import Main from "components/main";
import withAuth from "utils/withAuth";
import Head from "next/head";

const AlterarSenha = () => {
  const resetPassword = userState((state) => state.resetPassword);
  const signOut = userState((state) => state.signOut);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }
    setShowModal(true);
  };

  const confirmChange = async () => {
    setShowModal(false);
    try {
      const user = await resetPassword({ password: newPassword });
      if (user.error) {
        setError(user.error.message);
      } else {
        setSuccess(true);
        signOut();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Main>
      <Head>
        <title>Inovatec | Alterar Senha</title>
      </Head>
      <Container fluid>
        <Row className="justify-content-center align-items-center my-5">
          <Col xs={10} sm={8} md={6} lg={6} xl={4} xxl={4} className="my-5">
            <Card className="p-5 shadow">
              <Card.Title className="text-center mb-4">
                <h3>Alterar Senha</h3>
              </Card.Title>
              <Form onSubmit={handlePasswordChange}>
                {success && (
                  <Alert variant="success">Senha alterada com sucesso!</Alert>
                )}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formNewPassword">
                  <Form.Label>Nova senha</Form.Label>
                  <Form.Control
                    className="mb-3"
                    type="password"
                    placeholder="Digite a nova senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirmar senha</Form.Label>
                  <Form.Control
                    className="mb-4"
                    type="password"
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary" type="submit">
                    Alterar senha
                  </Button>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Você realmente deseja alterar a senha?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmChange}>
                      Confirmar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default withAuth(AlterarSenha);
