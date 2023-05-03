import { supabase } from "supabase/client";
import create from "zustand";

export const useProjetoState = create((set) => ({
  projects: [],
  selectedProject: null,

  fetchProjects: async () => {
    const { data, error } = await supabase
      .from("project")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    set({ projects: data });
  },

  fetchProject: async (name) => {
    const { data, error } = await supabase
      .from("project")
      .select("*")
      .eq("name", name)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    set({ selectedProject: data });
  },
}));
