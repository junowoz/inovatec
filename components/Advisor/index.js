import AdvisorComponent, { Selects } from "components/Advisor/component";
import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { advisorState } from "context/Advisor/AdvisorState";
import { Button, ProgressBar } from "react-bootstrap";
import { useRouter } from "next/router";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { helperState } from "context/Helper/HelperState";

export default function Advisor({
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
    const router = useRouter();
    const quest = advisorState((state) => state.quest);
    const setNoMolestar = helperState((state) => state.setNoMolestar);
    const noMolestar = helperState((state) => state.noMolestar);

    if (noMolestar) {
        router.push("/parking");
    }

    const { handleSubmit, register, control } = useForm({
        defaultValues: quest,
    });

    const submit = useRef(null);

    const HandleClick = () => {
        submit.current.click();
    };

    return (
        <AdvisorComponent>

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

                {/* Button Back con condicionales de visibilidad*/}
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
                {/* Button Back End*/}

                {/*Agrega el checkbox con condicionales de visibilidad */}
                {checkbox ? (
                    <Form.Check
                        type="checkbox"
                        id="checkbox"
                        className="mb-5 pb-5 mb-xl-0 pb-xl-0"
                        label="No volver a mostrar pregunta"
                        onClick={ () => setNoMolestar(true)}
                    />
                ) : null}
                {/* End checkbox */}

                <button ref={submit} type="submit" className="d-none" />
            </form>
        </AdvisorComponent>
    );
}
