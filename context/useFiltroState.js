import { supabase } from "supabase/client";
import create from "zustand";

export const useFiltroState = create((set) => ({

  filters: {
    year: null,
    course: null,
    semester: null,
    industry: null,
    tech: null,
  },
  
  setFilter: (name, value) =>
    set((state) => ({ filters: { ...state.filters, [name]: value } })),

  clearFilter: () =>
    set(() => ({
      filters: {
        year: null,
        course: null,
        semester: null,
        industry: null,
        tech: null,
      },
    })),

  fetchFilter: async (filters) => {
    let query = supabase.from("project").select("*");

    // adicione filtros à consulta
    for (const [name, value] of Object.entries(filters)) {
      if (value) {
        query = query.eq(name, value);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
      return;
    }

    set({ projects: data });
  },
}));
