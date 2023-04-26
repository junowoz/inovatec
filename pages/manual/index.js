import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Offcanvas,
} from "react-bootstrap";
import classnames from "classnames";
import data from "./data.json";
import Main from "/components/Main";
import Head from "next/head";

const Manual = () => {
  const { topics, content } = data;
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const selectedTopic = topics[selectedTopicIndex];
  const [showSummary, setShowSummary] = useState(false);

  const handleTopicClick = (index) => {
    setSelectedTopicIndex(index);
    setShowSummary(false);
  };

  const handlePrevTopic = () => {
    if (selectedTopicIndex > 0) {
      setSelectedTopicIndex(selectedTopicIndex - 1);
    }
  };

  const handleNextTopic = () => {
    if (selectedTopicIndex < topics.length - 1) {
      setSelectedTopicIndex(selectedTopicIndex + 1);
    }
  };

  const toggleSummary = () => {
    setShowSummary(!showSummary);
  };

  return (
    <Main>
      <Head>
        <title>Inovatec | Manual</title>
      </Head>
      <Container className="text-center py-5 px-md-5">
        <Row>
          <Button
            variant="primary"
            className="d-block d-lg-none mb-3"
            onClick={toggleSummary}
          >
            Sumário
          </Button>
          <Col md={9}>
            <Card>
              <Card.Header>
                <h3>{selectedTopic}</h3>
              </Card.Header>
              <Card.Body>
                <Card.Text>{content[selectedTopic]}</Card.Text>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-between mt-3">
              <Button
                variant="secondary"
                onClick={handlePrevTopic}
                disabled={selectedTopicIndex === 0}
              >
                Página anterior
              </Button>
              <Button
                variant="secondary"
                onClick={handleNextTopic}
                disabled={selectedTopicIndex === topics.length - 1}
              >
                Próxima página
              </Button>
            </div>
          </Col>
          <Col md={3}>
            <Offcanvas
              show={showSummary}
              onHide={toggleSummary}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Sumário</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <ListGroup>
                  {topics.map((topic, index) => (
                    <ListGroupItem
                      key={topic}
                      action
                      className={classnames({
                        active: selectedTopicIndex === index,
                      })}
                      onClick={() => handleTopicClick(index)}
                    >
                      {topic}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Offcanvas.Body>
            </Offcanvas>
            <Card className="d-none d-lg-block">
              <Card.Header>
                <h4>Sumário</h4>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  {topics.map((topic, index) => (
                    <ListGroupItem
                      key={topic}
                      action
                      className={classnames({
                        active: selectedTopicIndex === index,
                      })}
                      onClick={() => handleTopicClick(index)}
                    >
                      {topic}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Manual;
