import { supabase } from "supabase/client";
import { persist, devtools } from "zustand/middleware";
import { create } from "zustand";

export const helperState = create(
  persist(
    (set, get) => ({
      noMolestar: false,
      setNoMolestar: (data) => {
        set((state) => ({ noMolestar: data }));
      },
    }),
    { name: "HelperData" }
  ),
  {
    anonymousActionType: "HelperData",
    enabled: true,
    name: "HelperData",
  }
);
