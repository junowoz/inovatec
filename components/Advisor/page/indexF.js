import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { useRouter } from "next/router";

export function IndexF() {
    const router = useRouter();
    const setQuest = advisorState((state) => state.setQuest);
    const nameForm = "index";

    // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
    const questions = [
        {
            value: "true",
            title: "No sé mucho",
            description: "Te ayudaremos con el proceso",
            router: "/compra/class",
        },
        {
            value: "false",
            title: "Lo tengo claro",
            description: "Accederás al Marketplace directamente",
            router: "/projetos",
        },
    ];

    const onSubmit = (event) => {

        switch (event[nameForm]) {
            case "true":
                router.push("/compra/class")
                break;
            case "false":
                router.push("/projetos")
                break;
        }
    };

    return (
        <Advisor
            title={
                "¿Buscas una bici? A veces, el proceso puede ser un poco intimidante. Estamos aquí para ayudar."
            }
            description={"¿Sabes lo que estás buscando?"}
            questions={questions}
            onSubmit={onSubmit}
            nameForm={nameForm}
            checkbox={true} // <--- No volver a mostrar pregunta
            backButtonVision={false} // <--- Hace invisible al botón de atrás
        />
    );
}
