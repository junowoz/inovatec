import Advisor from "components/Advisor";
import category from "components/parking/filtros/category";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Class() {
    const setFilter = filtersState(state => state.setFiltersB)
    const router = useRouter();

    const nameForm = "category";

    const setQuest = advisorState((state) => state.setQuest);

    const onSubmit = (event) => {

        switch (event[nameForm]) {
            case "1":
                setFilter(()=> ({category: [1]}))
                return router.push(router.pathname + "/mountain")
            case "2":
                setFilter(()=> ({category: [2]}))   
                return router.push(router.pathname + "/highway")
            case "3":
                 setFilter(()=> ({category: [3]}))
                 return router.push(router.pathname + "/city")
            case "6":
                setFilter(()=> ({category: [6]}))
                return router.push(router.pathname + "/kits")
        }

/*         const salida = questions.find((datum) => {
            return datum.value == event[nameForm];
        });

        router.push(router.pathname + salida.router); */
    };

    // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
    const questions = [
        {
            value: "1",
            title: "Ciclismo de montaña",
            description:
                "Single track, senderos de montaña, parques de ciclismo",
            router: "/mountain",
        },
        {
            value: "2",
            title: "Ciclismo de ruta o carretera",
            description:
                "Ciclismo de mayor distancia en caminos pavimentados o de grava",
            router: "/highway",
        },
        {
            value: "3",
            title: "Ciclismo en la ciudad",
            description: "Montar distancias cortas en un entorno urbano",
            router: "/city",
        },
        {
            value: "6",
            title: "Para niños",
            description: "Las bicicletas que deseabas tener cuando eras niño",
            router: "/kits",
        },
    ];

    return (
        <Advisor
            title={"¡Encontremos tu bici ideal!"}
            description={"¿Para qué usarás la bici?"}
            questions={questions}
            onSubmit={onSubmit}
            nameForm={nameForm}
            progress={15}
            back={"./"}
            backButtonVision={true} // <--- Hace visible al botón de atrás
        />
    );
}
