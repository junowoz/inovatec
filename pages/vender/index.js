import Contenedor from "components/home/Contenedor";
import { Container } from "react-bootstrap";
import Infos from "./Infos";
import Presentation from "./Presentation";
import Martket from "./marketplace";

export default function HomePage(props) {
    return (
        <Contenedor>
            <Container fluid>
                <Presentation />
                <Infos />
            </Container>
            <Martket />

        </Contenedor>
    );
}
