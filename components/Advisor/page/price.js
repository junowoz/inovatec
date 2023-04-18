import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Price() {
    const router = useRouter();
    const setQuest = advisorState((state) => state.setQuest);
    const nameForm = "price";
    const setFilter = filtersState(state => state.setFiltersB)

    const onSubmit = (event) => {
        switch (event[nameForm]) {
            case "2":
                setFilter(() => ({ minPrice: 0, maxPrice: 500 }));
                break;
            case "3":
                setFilter(() => ({ minPrice: 500, maxPrice: 1000 }));
                break;
            case "4":
                setFilter(() => ({ minPrice: 1000, maxPrice: 1500 }));
                break;
            case "5":

                setFilter(() => ({ minPrice: 1500, maxPrice: 2000 }));
                break;
            case "6":
                setFilter(() => ({ minPrice: 2000, maxPrice: 2500 }));
                break;
            case "7":
                setFilter(() => ({ minPrice: 3000, maxPrice: 1000000 }));
                break;
        }

        router.push("/projetos");
    };

    // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
    const questions = [
        {
            value: 2,
            title: "$0 - $500",
        },
        {
            value: 3,
            title: "$500 - $1000",
        },
        {
            value: 4,
            title: "$1000 - $1500",
        },
        {
            value: 5,
            title: "$1500 - $2000",
        },
        {
            value: 6,
            title: "$2000 - $2500",
        },
        {
            value: 7,
            title: "$3000 o más",
        },
    ];

    return (
        <Advisor
            title={""}
            description={"¿Cuál es tu presupuesto?"}
            questions={questions}
            onSubmit={onSubmit}
            nameForm={nameForm}
            progress={90}
            back={"./"}
            backButtonVision={true} // <--- Hace visible al botón de atrás
        />
    );
}
