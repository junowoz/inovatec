import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { filtersState } from "context/Filters/filtersState";
import { useRouter } from "next/router";

export function Timon() {
  const router = useRouter();

  const nameForm = "timon";

  const setFilter = filtersState((state) => state.setFiltersB);

  const setQuest = advisorState((state) => state.setQuest);

  const onSubmit = (event) => {
    switch (event[nameForm]) {
      case "drop":
        setFilter(() => ({ category: [4], subcategory: [] }));
        router.push(router.pathname + "/size");
        break;
      case "flat":
        setFilter(() => ({ category: [3], subcategory: [7, 8] }));
        router.push(router.pathname + "/charge");
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
      value: "drop",
      title: "Dropbars (agresivo)",
      description: "Timón para bicis de ruta",
      router: "/size",
    },
    {
      value: "flat",
      title: "Flatbars (cómodo)",
      description: "Timón para bicis de MTB",
      router: "/charge",
    },
  ];

  return (
    <Advisor
      description={"¿Qué estilo de timón prefieres?"}
      questions={questions}
      onSubmit={onSubmit}
      nameForm={nameForm}
      progress={45}
      back={"./"}
      backButtonVision={true} // <--- Hace visible al botón de atrás
    />
  );
}
