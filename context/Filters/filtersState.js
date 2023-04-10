import { create } from "zustand";
import { persist } from "zustand/middleware";

export const filtersState = create(
  persist((set, get) => ({
        filters: {
          country: [],
          category: [],
          subcategory: [],
          size: [],
          brands: [],
          materials: [],
          suspension: [],
          frenos: [],
          rines: [],
          years: [],
          minPrice: 0,
          maxPrice: Infinity,
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
              country: [],
              category: [],
              subcategory: [],
              size: [],
              brands: [],
              materials: [],
              suspension: [],
              frenos: [],
              rines: [],
              years: [],
              minPrice: 0,
              maxPrice: Infinity,
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
