import EsperaComponent, { Selects } from "./component";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { esperaState } from "context/Espera/EsperaState";
import { Button, InputGroup, ProgressBar, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Form from "react-bootstrap/Form";

export default function Espera({
    questions,
    title,
    description,
    onSubmit,
    nameForm,
    back,
    backButtonVision, // <--- Hace visible on invisible el botón de Atrás
    checkbox, // <--- Agrega la propiedad "checkbox"
    progress,
}) {

    return (
        <>
            <EsperaComponent>
                <h1 style={{ color: "#06433D", fontStyle: "medium" }}>
                    ¿Aún no encuentras la bici de tus sueños? ¡Te ayudamos a
                    rodar!
                </h1>
                <p className="mb-5 text-secondary">
                    Cuéntanos más sobre lo que estás buscando, moveremos cielo y
                    tierra por conseguirlo para ti :){" "}
                </p>
                <form>
                    <Row className="d-flex flex-row">
                        <InputGroup className="mb-3">
                            <Button
                                variant="primary"
                                className=" "
                                type="submit"
                                onClick={() => {
                                    router.push("/publicar/uno");
                                }}
                            >
                                Comenzar
                                <MdKeyboardArrowRight />
                            </Button>
                        </InputGroup>
                    </Row>
                </form>
            </EsperaComponent>

            {/* <EsperaComponent>
                <form onSubmit={handleSubmit(onSubmit)} className="pt-2">
                    <div className="mt-5 d-none d-xl-block" />
                    {progress ? (
                        <ProgressBar className="mt-5" now={progress} />
                    ) : null}
                    <div className="mb-4" />
                    <h1 className="mb-5" style={{ color: "#212928" }}>
                        {title}
                    </h1>
                    <h3 className="mb-3" style={{ color: "#212928" }}>
                        {description}
                    </h3>
                     {questions.map((data, index) => (
                    <Selects
                        register={register}
                        data={data}
                        index={index}
                        name={nameForm}
                        key={index}
                        HandleClick={HandleClick}
                        className="mb-3"
                    />
                ))} 
                     */}

                    {/* Button Back con condicionales de visibilidad
                    {backButtonVision ? (
                        <Button
                            variant="light"
                            onClick={() => back && router.push(back)}
                            className="mb-5 pb-5 mb-xl-0 pb-xl-0"
                            style={{
                                color: "#0FA899",
                                background: "none",
                                border: "none",
                                shadow: "none",
                            }}
                        >
                            <MdKeyboardArrowLeft /> Atrás
                        </Button>
                    ) : null}
                    {
                         Button Back End*/}

                    {/* <button ref={submit} type="submit" className="d-none" />
                </form> 
            </EsperaComponent>
        */}
        </>
    );
}
