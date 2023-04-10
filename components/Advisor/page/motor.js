import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Motor() {
    const router = useRouter();

    const nameForm = "motor";

    const setQuest = advisorState((state) => state.setQuest);
    const setFilter = filtersState(state => state.setFiltersB)
    const onSubmit = (event) => {
        switch (event[nameForm]) {
            case "false":
                setFilter(() => ({ category: [3], subcategory: [] }));
                break;
            case "true":
                setFilter(() => ({ category: [3], subcategory: [10] }));
                break;
        }
        
        router.push(router.pathname + "/size");
    };

    // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
    const questions = [
        {
            value: "false",
            title: "No",
            router: "/size",
        },
        {
            value: "true",
            title: "Sí",
            router: "/size",
        },
    ];

    return (
        <Advisor
            description={"¿Quieres una bici con motor?"}
            questions={questions}
            onSubmit={onSubmit}
            nameForm={nameForm}
            progress={45}
            back={"./"}
            backButtonVision={true} // <--- Hace visible al botón de atrás
        />
    );
}
