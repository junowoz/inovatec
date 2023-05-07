import { supabase } from "supabase/client";
import create from "zustand";
import { persist } from "zustand/middleware";

export const useProjetoState = create(
  persist(
    (set, get) => ({
      projects: [],
      selectedProject: null,
      projectMembers: [],

      //Traz todos os projetos fetchprojects
      fetchProject: async () => {
        const { data, error } = await supabase.from("project").select("*");

        if (error) {
          console.log(error);
          return;
        }

        set({ projects: data });
      },

      //Traz um projeto específico para o Slug Apenas fetchproject
      fetchSlugProject: async (name) => {
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

        get().fetchProjectMembers(data.projectUUID);

        return data;
      },

      //Traz o UUID do Projeto do Slug para passar pro membro
      fetchProjectMembers: async (projectUUID) => {
        const { data, error } = await supabase
          .from("member")
          .select("*")
          .eq("projectUUID", projectUUID);

        if (error) {
          console.log(error);
          return;
        }

        set({ projectMembers: data });
      },

    }),
    {
      name: "ProjetoData",
    }
  )
);
