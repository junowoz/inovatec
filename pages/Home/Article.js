import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { Container, Card, Badge, Button } from "react-bootstrap";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs/";

function Article({ Title }) {
    const [change, setChange] = useState(null);

    const styleButtons = {
        background: "#CFEEEB",
        borderRadius: "40px",
        borderColor: "#CFEEEB",
        color: "black !important",
        height: "32px",
        width: "32px",
    };

    return (
        <Container className="px-2 py-5">
            <Container>
                <div className="d-flex mb-4 justify-content-between">
                    <h2 className="tittle-custom">{Title}</h2>
                    {/*Start Arrows */}

                    <div className="d-flex justify-content-center align-items-center">
                        <Button
                            className="me-2 d-grid justify-content-center align-content-center"
                            variant="light"
                            onClick={() => change?.slidePrev()}
                            style={styleButtons}
                        >
                            <BsChevronLeft size={16} />
                        </Button>
                        <Button
                            className="ms-1 d-grid justify-content-center align-content-center"
                            variant="light"
                            onClick={() => change?.slideNext()}
                            style={styleButtons}
                        >
                            <BsChevronRight size={16} />
                        </Button>
                    </div>
                    {/*End Arrows */}
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    onSwiper={(swiper) => {
                        setChange(swiper);
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        360: {
                            slidesPerView: 1.15,
                            spaceBetween: 20,
                        },
                        480: {
                            slidesPerView: 1.4,
                            spaceBetween: 30,
                        },
                        576: {
                            slidesPerView: 1.6,
                            spaceBetween: 40,
                        },

                        768: {
                            slidesPerView: 2.25,
                            spaceBetween: 40,
                        },

                        992: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1200: {
                            slidesPerView: 3.75,
                            spaceBetween: 40,
                        },
                        1400: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                    slidesPerView="auto"
                >
                    <SwiperSlide>
                        {" "}
                        <Card style={{ width: "18rem" }}>
                            <div className="m-3">
                                <Badge bg="primary">Popular</Badge>
                                <Card.Img variant="top" src="/imagec.png" />
                            </div>
                            <Card.Body>
                                <Card.Text>MTB · COLOMBIA</Card.Text>
                                <Card.Title>
                                    Specialized S-Works Tarmac SL7 Road Bike -
                                    2021, 56cm
                                </Card.Title>
                                <Card.Text>$6,499</Card.Text>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide>
                        {" "}
                        <Card style={{ width: "18rem" }}>
                            <div className="m-3">
                                <Badge bg="primary">Gran oferta</Badge>
                                <Card.Img variant="top" src="/imagec.png" />
                            </div>
                            <Card.Body>
                                <Card.Text>MTB · PANAMÁ</Card.Text>
                                <Card.Title>
                                    Specialized S-Works Tarmac SL7 Road Bike -
                                    2021, 56cm
                                </Card.Title>
                                <Card.Text>$1,299</Card.Text>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide>
                        {" "}
                        <Card style={{ width: "18rem" }}>
                            <div className="m-3">
                                <Badge bg="none">Popular</Badge>
                                <Card.Img variant="top" src="/imagec.png" />
                            </div>
                            <Card.Body>
                                <Card.Text>MTB · PANAMÁ</Card.Text>
                                <Card.Title>
                                    Specialized S-Works Tarmac SL7 Road Bike -
                                    2021, 56cm
                                </Card.Title>
                                <Card.Text>$1,299</Card.Text>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide>
                        {" "}
                        <Card style={{ width: "18rem" }}>
                            <div className="m-3">
                                <Badge bg="primary">Popular</Badge>
                                <Card.Img variant="top" src="/imagec.png" />
                            </div>
                            <Card.Body>
                                <Card.Text>MTB · PANAMÁ</Card.Text>
                                <Card.Title>
                                    Specialized S-Works Tarmac SL7 Road Bike -
                                    2021, 56cm
                                </Card.Title>
                                <Card.Text>$1,299</Card.Text>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>

                    <SwiperSlide>
                        {" "}
                        <Card style={{ width: "18rem" }}>
                            <div className="m-3">
                                <Badge bg="primary">Popular</Badge>
                                <Card.Img variant="top" src="/imagec.png" />
                            </div>
                            <Card.Body>
                                <Card.Text>MTB · PANAMÁ</Card.Text>
                                <Card.Title>
                                    Specialized S-Works Tarmac SL7 Road Bike -
                                    2021, 56cm
                                </Card.Title>
                                <Card.Text>$1,299</Card.Text>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </Container>
        </Container>
    );
}

export default Article;
