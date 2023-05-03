// context/ProjectAdminState.js
import create from "zustand";
import { supabase } from "supabase/client";

export const useAdminState = create((set) => ({
  projects: [],
  isLoading: false,
  fetchProjects: async () => {
    set({ isLoading: true });
    const { data: projects, error } = await supabase
      .from("project")
      .select("*")
      .order("date", { ascending: false });
    if (error) {
      console.log(error);
    } else {
      set({ projects });
    }
    set({ isLoading: false });
  },
  publishProject: async (id) => {
    await supabase.from("project").update({ status: true }).match({ id });
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, status: true } : project
      ),
    }));
  },
  unpublishProject: async (id) => {
    await supabase.from("project").update({ status: false }).match({ id });
    set((state) => ({
      projects: state.projects.map((project) =>
        project.id === id ? { ...project, status: false } : project
      ),
    }));
  },

  deleteProject: async (id) => {
    // Fetch project data to get image paths
    const { data: projectData, error: fetchError } = await supabase
      .from("project")
      .select("logoImg, teamImg, productImg")
      .eq("id", id);

    if (fetchError) {
      console.error(fetchError);
      return;
    }

    // Extract image paths
    const imagePaths = [
      ...(projectData[0].logoImg
        ? JSON.parse(projectData[0].logoImg).path
        : []),
      ...(projectData[0].teamImg
        ? JSON.parse(projectData[0].teamImg).path
        : []),
      ...(projectData[0].productImg
        ? JSON.parse(projectData[0].productImg).path
        : []),
    ];

    // Delete images from storage
    await Promise.all(
      imagePaths.map(async (path) => {
        let { error } = await supabase.storage.from("midia").remove([path]);
        if (error) {
          console.error(error);
        }
      })
    );

    // Delete project from database
    await supabase.from("project").delete().match({ id });
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
    }));
  },

  updateProject: async (projectId, updatedProject) => {
    const { data, error } = await supabase
      .from("project")
      .update(updatedProject)
      .eq("id", projectId);
    if (error) {
      console.log(error);
    } else {
      // Atualiza a lista de projetos com o projeto atualizado
      set((state) => {
        const updatedProjects = state.projects.map((project) =>
          project.id === projectId ? data[0] : project
        );
        return { projects: updatedProjects };
      });
    }
  },
}));
