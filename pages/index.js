import Main from "components/main";
import { Container } from "react-bootstrap";
import Cards from "./home/Cards";
import Presentation from "./home/Presentation";

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
