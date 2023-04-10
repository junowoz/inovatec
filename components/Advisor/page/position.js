import Advisor from "components/Advisor";8
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Position() {
    const router = useRouter();

    const nameForm = "position";
    const setFilter = filtersState(state => state.setFiltersB)

    const setQuest = advisorState((state) => state.setQuest);

    const onSubmit = (event) => {
        switch (event[nameForm]) {
            case "aggressive":
                setFilter(() => ({ category: [2,8], subcategory: [1] }));
                break;
            case "relaxed":
                setFilter(() => ({ category: [2], subcategory: [5,6] }));
                break;
        }
                
        

        router.push(router.pathname +"/size");
    };

    // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
    const questions = [
        {
            value: "aggressive",
            title: "Agresiva",
            description: "Prefieres la velocidad a la comodidad",
            router: "/size",
        },
        {
            value: "relaxed",
            title: "Menos agresiva",
            description: "Una posición cómoda para largas distancias",
            router: "/size",
        },
    ];

    return (
        <Advisor
            description={"¿Qué posición del cuerpo prefieres?"}
            questions={questions}
            onSubmit={onSubmit}
            nameForm={nameForm}
            progress={45}
            back={"./"}
            backButtonVision={true} // <--- Hace visible al botón de atrás
        />
    );
}
