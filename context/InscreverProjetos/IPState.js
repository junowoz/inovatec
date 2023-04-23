import { supabase } from "supabase/client";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

export const IPState = create (
  devtools(
    persist(
      (set, get) => ({
        semester: [],
        tech: [],
        course: [],
        year: [],
        industry: [],
        projects: [],

        getSemester: async () => {
          const { data, error } = await supabase.from("semester").select();

          if (error) {
            console.error(error);
          } else {
            get({ semester: data });
            console.log(data);
          }
        },

        getTech: async () => {
          const { data, error } = await supabase.from("tech").select("*");

          if (error) {
            console.error(error);
          } else {
            get({ tech: data });
          }
        },

        getCourse: async () => {
          const { data, error } = await supabase.from("course").select("*");

          if (error) {
            console.error(error);
          } else {
            get({ course: data });
          }
        },

        getYear: async () => {
          const { data, error } = await supabase.from("year").select("*");

          if (error) {
            console.error(error);
          } else {
            get({ year: data });
          }
        },

        getIndustry: async () => {
          const { data, error } = await supabase.from("industry").select("*");

          if (error) {
            console.error(error);
          } else {
            get({ industry: data });
          }
        },

        setProjects: async () => {
          const { data, error } = await supabase.from("projects").select("*");

          if (error) {
            console.error(error);
          } else {
            set({ projects: data });
          }
        },

        createProject: async (projectData) => {
          const { data, error } = await supabase
            .from("projects")
            .insert(projectData);

          if (error) {
            console.error(error);
          } else {
            set((state) => ({
              projects: [...state.projects, data[0]],
            }));
          }
        },

        clearProjects: () => {
          set({ projects: [] });
        },

        clearAll: () => {
          set({
            semester: [],
            tech: [],
            course: [],
            year: [],
            industry: [],
            projects: [],
          });
        },
      }),
      { name: "SupabaseData" }
    ),
    {
      anonymousActionType: "SupabaseData",
      enabled: true,
      name: "SupabaseData",
    }
  )
);

//   const res = await supabase.from("projects").insert([
//     {
//       title,
//       teacher,
//       briefDescription,
//       description,
//       year,
//       semester,
//       course,
//       insdustry,
//       tech,
//       logoUrl,
//       teamUrl,
//       filesUrl,
//     },
//   ]);

//   return res;
// };
