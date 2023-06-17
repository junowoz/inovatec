import create from "zustand";
import { persist } from "zustand/middleware";

// filtroState.js
export const useFiltroState = create(
  persist(
    (set) => ({
      filters: {
        year: [],
        course: [],
        semester: [],
        industry: [],
        tech: [],
      },
      setFilter: (category, id) =>
        set((state) => {
          const newCategory = [...state.filters[category]];
          if (!newCategory.includes(id)) {
            newCategory.push(id);
          } else {
            const index = newCategory.indexOf(id);
            newCategory.splice(index, 1);
          }
          return { filters: { ...state.filters, [category]: newCategory } };
        }),

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
