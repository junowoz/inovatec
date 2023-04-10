import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Kits() {
  const router = useRouter();

  const nameForm = "kits";
  const setFilter = filtersState((state) => state.setFiltersB);

  const setQuest = advisorState((state) => state.setQuest);

  const onSubmit = (event) => {
    switch (event[nameForm]) {
        case "3":
            setFilter(() => ({ rines: [1]}));
            break;
        case "4":
            setFilter(() => ({ rines:[2,1] }));
            break;
        case "5":
            setFilter(() => ({ rines: [3,4]}));
            break;
        case "6":
            setFilter(() => ({ rines: [4] }));
            break;
        case "7":
            setFilter(() => ({rines: [6,5] }));
            break;
    }

    router.push(router.pathname + "/price");
  };

  // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
  const questions = [
    {
      value: 3,
      title: "1-3 años",
      description: "Bicicletas de balance o con llantas de apoyo",
      router: "/price",
    },
    {
      value: 4,
      title: "3-4 años",
      description: "Rin 12’’ y llantas de apoyo removibles",
      router: "/price",
    },
    {
      value: 5,
      title: "4-5 años",
      description: "Rin 16’’",
      router: "/price",
    },
    {
      value: 6,
      title: "5-7 años",
      description: "Rin 20’’",
      router: "/price",
    },
    {
      value: 7,
      title: "7 años o más",
      description: "Rin 24’’ y 26’’",
      router: "/price",
    },
  ];

  return (
    <Advisor
      description={"¿De qué edad?"}
      questions={questions}
      onSubmit={onSubmit}
      nameForm={nameForm}
      progress={30}
      back={"./"}
      backButtonVision={true} // <--- Hace visible al botón de atrás
    />
  );
}
