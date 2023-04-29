import Main from "../components/main";
import { Container } from "react-bootstrap";
import Cards from "../components/home/cards.js";
import Presentation from "../components/home/intro.js";

export default function HomePage() {
  return (
    <Main>
      <Container fluid className="presentation">
        <Presentation />
      </Container>
      <Cards />
    </Main>
  );
}
