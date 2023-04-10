import React from "react";
import { ProgressBar, Row } from "react-bootstrap";
import { BsListCheck, BsThreeDots } from "react-icons/bs";
import { MdOutlinePedalBike } from "react-icons/md";

export default function Progress() {
  return (
    <>
      <div className="py-2">
        <Row className="my-1 d-flex ">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div sm="auto">
                <MdOutlinePedalBike
                  size="40"
                  className="p-2"
                  style={{
                    borderRadius: "50%",
                    marginRight: "5px",
                    backgroundColor: "#CFEEEB",
                    color: "#0FA899",
                  }}
                />
              </div>
              <div className="px-1">
                <p className="m-0 p-0" style={{ color: "#0FA899" }}>
                  Paso 1/3
                </p>
                <p className="m-0 p-0">
                  <strong>Datos de tu bici</strong>
                </p>
              </div>
            </div>

            <>
              <BsListCheck
                size="40"
                className="p-2"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#CFEEEB",
                  color: "#0FA899",
                }}
              />
            </>

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
      <ProgressBar now={30} className="mb-4" />
    </>
  );
}
