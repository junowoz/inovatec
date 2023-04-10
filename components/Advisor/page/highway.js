import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Highway() {
    const router = useRouter();

    const nameForm = "type";

    const setQuest = advisorState((state) => state.setQuest);
    const setFilter = filtersState(state => state.setFiltersB)

    const onSubmit = (event) => {
        switch (event[nameForm]) {
            case "pavement":
                setFilter(() => ({ category: [3], subcategory: [2,8] }));
                router.push(router.pathname + "/position");
                break;
            case "mix":
                setFilter(() => ({ category: [4], subcategory: [7,8] }));
                router.push(router.pathname + "/timon");
                break;
        }


        
        
    };

    // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
    const questions = [
        {
            value: "pavement",
            title: "Caminos pavimentados",
            description: "Calles y carreteras bien asfaltadas",
            router: "/position",
        },
        {
            value: "mix",
            title: "Mezclado",
            description:
                "Principalmente pavimento con un sendero conector ocasional de gravilla o tierra",
            router: "/timon",
        },
    ];

    return (
        <Advisor
            description={
                "¿En qué tipo de carreteras circularás principalmente?"
            }
            questions={questions}
            onSubmit={onSubmit}
            nameForm={nameForm}
            progress={30}
            back={"./"}
            backButtonVision={true} // <--- Hace visible al botón de atrás
        />
    );
}
