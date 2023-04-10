import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function NoEBike() {
  const router = useRouter();

  const nameForm = "hill";

  const setFilter = filtersState((state) => state.setFiltersB);

  const setQuest = advisorState((state) => state.setQuest);

  const onSubmit = (event) => {
    switch (event[nameForm]) {
      case "true":
        setFilter(() => ({ subcategory: [2, 3] }));
        break;
      case "false":
        setFilter(() => ({ subcategory: [3, 4] }));
        break;
    }

    const salida = questions.find((datum) => {
      return datum.value == event[nameForm];
    });

    router.push(router.pathname + salida.router);
  };

  // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
  const questions = [
    {
      value: "true",
      title: "Subiendo y bajando montañas",
      router: "/suspension",
    },
    {
      value: "false",
      title: "Estrictamente cuesta abajo",
      router: "/size",
    },
  ];

  return (
    <Advisor
      description={"¿Qué tipo de conducción planeas hacer?"}
      questions={questions}
      onSubmit={onSubmit}
      nameForm={nameForm}
      progress={45}
      back={"./"}
      backButtonVision={true} // <--- Hace visible al botón de atrás
    />
  );
}
