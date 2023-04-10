import Advisor from "components/Advisor";
import { advisorState } from "context/Advisor/AdvisorState";
import { useRouter } from "next/router";

export function City() {
  const router = useRouter();

  const nameForm = "city";

  const setQuest = advisorState((state) => state.setQuest);

  const onSubmit = (event) => {
    //FIXME: Corección de la subcategoria caso 2,3,4

    switch (event[nameForm]) {
      case "1":
        setQuest(() => ({ subcategory: [10] }));
        router.push(router.pathname + "/motor");
        return;
      case "2":
        setQuest(() => ({ subcategory: [7, 11] }));
        break;
      case "3":
        setQuest(() => ({ subcategory: [13] }));
        break;
      case "4":
        setQuest(() => ({ subcategory: [12] }));
        break;
    }

    router.push(router.pathname + "/size");
  };

  // En value, nunca uses booleanos. Apenas números o palabras para representarlo.
  const questions = [
    {
      value: "1",
      title: "Ir al trabajo o a la escuela",
      router: "/motor",
    },
    {
      value: "2",
      title: "Montar para hacer un poco de ejercicio",
      router: "/size",
    },
    {
      value: "3",
      title: "Ir de compras",
      router: "/size",
    },
    {
      value: "4",
      title: "Transportar a los niños por la ciudad",
      router: "/size",
    },
  ];

  return (
    <Advisor
      description={"¿Para qué actividad vas a usarla principalmente?"}
      questions={questions}
      onSubmit={onSubmit}
      nameForm={nameForm}
      progress={30}
      back={"./"}
      backButtonVision={true} // <--- Hace visible al botón de atrás
    />
  );
}
