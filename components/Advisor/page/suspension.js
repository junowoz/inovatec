import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Suspension() {
  const router = useRouter();

  const setFilter = filtersState((state) => state.setFiltersB);

  const nameForm = "suspension";

  const setQuest = advisorState((state) => state.setQuest);

  const onSubmit = (event) => {
    switch (event[nameForm]) {
      case "4":
        setFilter(() => ({ suspension: [1] }));
        break;
      case "3":
        setFilter(() => ({ suspension: [2] }));
        break;
      case "5":
        setFilter(() => ({ category: [3], subcategory: [7] }));
        break;
      case "6":
        setFilter(() => ({ suspension: [1, 2] }));
        break;
    }

    router.push(router.pathname + "/size");
  };

  // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
  const questions = [
    {
      value: 4,
      title: "Sólo delantera",
      description: "Hardtail",
      router: "/size",
    },
    {
      value: 3,
      title: "Trasera y delantera",
      description: "Full Suspension",
      router: "/size",
    },
    {
      value: 5,
      title: "Sin suspension",
      description: "Horquilla rígida",
      router: "/size",
    },
    {
      value: 6,
      title: "No sé",
      description: "Te mostraremos todas las opciones",
      router: "/size",
    },
  ];

  return (
    <Advisor
      description={"¿Qué tipo de suspensión quieres?"}
      questions={questions}
      onSubmit={onSubmit}
      nameForm={nameForm}
      progress={60}
      back={"./"}
      backButtonVision={true} // <--- Hace visible al botón de atrás
    />
  );
}
