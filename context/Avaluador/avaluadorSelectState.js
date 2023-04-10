import { create } from "zustand";
import { persist } from "zustand/middleware";

export const avaluadorSelect = create(
  persist(
    (set, get) => ({
      cardSelected: {},

      setCardSelected: (data) => {
        set((state) => ({ cardSelected: { ...state.cardSelected, ...data } }));
      },
    }),
    {
      name: "Avaluator",
    }
  )
);
