// import { supabase } from "supabase/client";
// import create from "zustand";
// import { persist, devtools } from "zustand/middleware";

// export const projetosState = create(
//   devtools(
//     persist(
//       (set, get) => ({
//         project: {},

//         setProject: async (id) => {
//           if (id != get().project.id && id != undefined) {
//             console.log("server");
//             const data = await getProject(id);
//             set({ project: { ...data } });
//             return data;
//           } else {
//             console.log("cache");
//             return { ...get().project };
//           }
//         },

//         clearProject: () => {
//           set(
//             (state) => ({
//               ...state,
//               project: {},
//             }),
//             true
//           );
//         },

//         projetos: [],
//         setProjetos: async () => {
//           const data = await getProject();
//           set({
//             projetos: data,
//           });
//           return data;
//         },

//         clearProjetos: () => {
//           set(
//             (state) => ({
//               ...state,
//               projetos: {},
//             }),
//             true
//           );
//         },

//         clearAll: () => {
//           get().clearProjetos();
//           get().clearProject();
//         },

//         CDN2: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagens/`,
//       }),
//       { name: "ProjetosData" }
//     ),

//     {
//       anonymousActionType: "ProjetosData",
//       enabled: true,
//       name: "ProjetosData",
//     }
//   )
// );

// const getProject = async () => {
//   const { data: project, error } = await supabase.from("project").select(`
//   id, name, description, models, filesUrl, linkRepo, tech, industry, course, semester, year `);
//   console.log(error);
//   console.log(project);
//   return error ? error : await project;
// };

// const getProject = async (id) => {
//   console.log("🚀 ~ file: ProjetosState.js:92 ~ getProject ~ id:", id);
//   const { data: project, error } = id
//     ? await supabase
//         .from("project")
//         .select(
//           `
//         id, name, description, models (name), filesUrl, linkRepo, tech (name),
//         industry (name), course (name), semester (name), year  (name)`
//         )
//         .eq("id", id)
//     : { error: { message: "id = undefined" }, project: [] };

//   console.log(error);

//   return error ? error : project[0];
// };
