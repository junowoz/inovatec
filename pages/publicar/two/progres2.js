import React from "react";
import { ProgressBar, Row } from "react-bootstrap";
import { BsListCheck, BsThreeDots } from "react-icons/bs";
import { MdOutlinePedalBike } from "react-icons/md";

export default function Progres2() {
    return (
        <div>
            <div className="py-2">
                <Row className="my-1 d-flex ">
                    <div className="d-flex justify-content-between">
                        <>
                            <MdOutlinePedalBike
                                size="40"
                                className="p-2"
                                style={{
                                    borderRadius: "50%",
                                    backgroundColor: "#CFEEEB",
                                    color: "#0FA899",
                                }}
                            />
                        </>

                        <div className="d-flex">
                            <BsListCheck
                                size="40"
                                className="p-2"
                                style={{
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                    backgroundColor: "#CFEEEB",
                                    color: "#0FA899",
                                }}
                            />
                            <div className="px-1">
                                <p
                                    className="m-0 p-0"
                                    style={{ color: "#0FA899" }}
                                >
                                    Paso 2/3
                                </p>
                                <p className="m-0 p-0">
                                    <strong>Detalles de tu bici</strong>
                                </p>
                            </div>
                        </div>

                        <>
                            <BsThreeDots
                                size="40"
                                className="p-2"
                                style={{
                                    borderRadius: "50%",
                                    backgroundColor: "#CFEEEB",
                                    color: "#0FA899",
                                }}
                            />
                        </>
                    </div>
                </Row>
            </div>
            <ProgressBar now={60} className="mb-4" />
        </div>
    );
}
