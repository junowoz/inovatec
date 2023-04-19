import Contenedor from "components/home/Contenedor";
import { Container } from "react-bootstrap";
import Article from "./Home/Article";
import Promesas from "./Home/Promesas";
import Presentation from "./Home/Presentation";
import Reviews from "./Home/Reviews";
import Swiper from "./Home/Swiper";

export default function HomePage(props) {
    return (
        <Contenedor>
            <Container fluid className="presentation">
                <Presentation />
            </Container>
            <Swiper />
            <Article Title="Explora bicis destacadas" data={props.data} />

            <Reviews />

            <Promesas />
        </Contenedor>
    );
}
