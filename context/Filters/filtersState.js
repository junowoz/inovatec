import create from "zustand";
import { persist } from "zustand/middleware";

export const filtersState = create(
  persist((set, get) => ({
        filters: {
          course: [],
          industry: [],
          tech: [],
          semester: [],
          year: [],
        },

        setFilters: (fn) => {
          const data = fn(get().filters);
          set(() => ({ filters: { ...data } }));
        },

        setFiltersB: (fn) => {
          const data = fn();
          set(() => ({ filters: { ...get().filters,...data,  } }));
        },

        ClearFilters: () => {
          set(() => ({
            filters: {
              course: [],
              industry: [],
              tech: [],
              semester: [],
              year: [],
            },
          }));
        },
      }
    )
    ,
      {
        name: "filters",
       
      }
  )
);
