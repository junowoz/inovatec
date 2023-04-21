import React from "react";
import { ProgressBar, Row } from "react-bootstrap";
import { BsCardChecklist, BsThreeDots } from "react-icons/bs";
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
                            <BsCardChecklist
                                size="40"
                                className="p-2"
                                style={{
                                    borderRadius: "50%",
                                    backgroundColor: "#CFEEEB",
                                    color: "#0FA899",
                                }}
                            />
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
            <ProgressBar now={100} className="mb-4" />
        </div>
    );
}
