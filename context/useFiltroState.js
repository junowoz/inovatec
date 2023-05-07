// import { supabase } from "supabase/client";
import create from "zustand";
import { persist } from "zustand/middleware";

// filtroState.js
export const useFiltroState = create(
  persist(
    (set) => ({
      filters: {
        year: "all",
        course: "all",
        semester: "all",
        industry: "all",
        tech: "all",
      },
      setFilter: (filterType, value) =>
        set((state) => ({
          filters: { ...state.filters, [filterType]: value },
        })),

      clearFilter: () =>
        set(() => ({
          filters: {
            year: [],
            course: [],
            semester: [],
            industry: [],
            tech: [],
          },
        })),
    }),
    {
      name: "FiltroData",
    }
  )
);
