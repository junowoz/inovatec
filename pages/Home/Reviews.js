import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { FcGoogle } from "react-icons/fc";
import {
    BsStarFill,
    BsShieldFillCheck,
    BsBoxArrowUpRig,
    BsBoxArrowUpRight,
} from "react-icons/bs";

import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import React from "react";
import Link from "next/link";

const google = {
    platform: "Google Reviews",
    link: "https://goo.gl/maps/R9pZyU568yBsnzcc7",
};

const reviews = [
    {
        date: "Hace un mes",
        rating: 5,
        photo: "/person.png",
        text: '"Excelente servicio, muy buena asesoría y venta rápida y lo más importante todo claro y sin tramuñas. Sigan de esta forma y llegarán lejos."',
        author: "Reinaldo Calojero",
    },
    {
        date: "Hace un mes",
        rating: 5,
        photo: "/person2.png",
        text: "“Super confiable y seguro, conseguí mi bicicleta en excelente estado y ademas con opcion de abono. Buena atención del staff”",
        author: "Jackeline Morales",
    },
    {
        date: "Hace un mes",
        rating: 4,
        photo: "/person3.png",
        text: "“Impresionante, postearon la bici hoy a media mañana, en la tarde me pidieron que la llevara, que un interesado quería verla, se vendió de una vez y me hicieron la transferencia de inmediato.”",
        author: "Alex Villarreta",
    },
];

function Reviews(props) {
    const cardWidth = "auto";

    return (
        <Container className="px-2 my-2 mt-5">
            <Container>
                <h2 className="tittle-custom mb-4">
                    Conoce lo que miles de ciclistas dicen de nosotros
                </h2>

                <Swiper
                    className="py-2"
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 40,
                        },
                        360: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 1.05,
                            spaceBetween: 30,
                        },
                        576: {
                            slidesPerView: 1.15,
                            spaceBetween: 40,
                        },
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 40,
                        },
                        992: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1200: {
                            slidesPerView: 2.5,
                            spaceBetween: 40,
                        },
                        1400: {
                            slidesPerView: 2.75,
                            spaceBetween: 40,
                        },
                    }}
                    slidesPerView="auto"
                >
                    {reviews.map((review, index) => (
                        <SwiperSlide key={index}>
                            <Card style={{ width: cardWidth }}>
                                <Card.Body style={{ fontSize: 16 }}>
                                    <div className="d-flex justify-content-between ">
                                        <div
                                            style={{ color: "gray" }}
                                            className="d-flex align-items-center "
                                        >
                                            <FcGoogle
                                                size={18}
                                                className="mr-1"
                                            />{" "}
                                            <p className="d-flex mx-1 align-items-center m-0">
                                                {google.platform}
                                            </p>
                                        </div>
                                        <Card.Text> {review.date}</Card.Text>
                                    </div>
                                    <Row className="mt-3">
                                        {/* Image */}
                                        <div
                                            style={{ width: "auto" }}
                                            className="mt-1"
                                        >
                                            <Image
                                                alt="Person"
                                                src={review.photo}
                                                width={42}
                                            />
                                        </div>
                                        {/* End Image */}
                                        <Col>
                                            <div
                                                style={{
                                                    color: "rgba(255, 193, 7, 1)",
                                                }}
                                            >
                                                <span>
                                                    {" "}
                                                    {[
                                                        ...Array(review.rating),
                                                    ].map((star, index) => {
                                                        return (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <BsStarFill />{" "}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                            <Card.Title
                                                style={{ fontSize: 16 }}
                                            >
                                                {review.text}
                                            </Card.Title>
                                            <Card.Text
                                                style={{ color: "gray" }}
                                            >
                                                {review.author}
                                            </Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Link
                                            href={google.link}
                                            target="_blank"
                                            className="d-flex flex-row-reverse align-items-center"
                                            style={{
                                                color: "rgba(25, 135, 84, 1)",
                                                fontSize: 14,
                                            }}
                                        >
                                            <div className="d-flex gap-1 align-items-center">
                                                <BsShieldFillCheck /> Ir a las
                                                reseñas
                                                <BsBoxArrowUpRight className="ms-1" />
                                            </div>
                                        </Link>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </Container>
    );
}

export default Reviews;
