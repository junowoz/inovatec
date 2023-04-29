import Main from "components/main";
import { Container } from "react-bootstrap";
import Cards from "pages/home/Cards";
import Presentation from "pages/home/Presentation";

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
