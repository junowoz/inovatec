import { supabase } from "supabase/client";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export const projetosState = create(
  devtools(
    persist(
      (set, get) => ({
        project: {},

        setProject: async (id) => {
          if (id != get().project.id && id != undefined) {
            console.log("server");
            const data = await getProject(id);
            set({ project: { ...data } });
            return data;
          } else {
            console.log("cache");
            return { ...get().project };
          }
        },

        clearProject: () => {
          set(
            (state) => ({
              ...state,
              project: {},
            }),
            true
          );
        },

        projetos: {},

        setProjetos: async () => {
          const data = await getProjects();
          set({
            projetos: {
              ...data,
            },
          });
          return data;
        },

        clearProjetos: () => {
          set(
            (state) => ({
              ...state,
              projetos: {},
            }),
            true
          );
        },

        clearAll: () => {
          get().clearProjetos();
          get().clearProject();
        },

        CDN2: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagensprojetos/`,
      }),
      { name: "ProjetosData" }
    ),

    {
      anonymousActionType: "ProjetosData",
      enabled: true,
      name: "ProjetosData",
    }
  )
);

const getProjects = async () => {
  const { data: projects, error } = await supabase.from("projects").select(`
  id, name, description, models, filesUrl, linkRepo, tech, industry, course, semester, year `);
  console.log(error);
  console.log(projects);
  return error ? error : await projects;
};

const getProject = async (id) => {
  console.log("🚀 ~ file: ProjetosState.js:92 ~ getProject ~ id:", id);
  const { data: projects, error } = id
    ? await supabase
        .from("projects")
        .select(
          `
        id, name, description, models (name), filesUrl, linkRepo, tech (name),
        industry (name), course (name), semester (name), year  (name)`
        )
        .eq("id", id)
    : { error: { message: "id = undefined" }, projects: [] };

  console.log(error);

  return error ? error : projects[0];
};
