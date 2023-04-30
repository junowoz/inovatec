import { supabase } from "supabase/client";
import create from "zustand";

export const useInscreverState = create((set) => ({
  //StoreData
  formData: {},
  setFormData: (data) => set((state) => ({ formData: data })),

  //Fetch Data
  semesterData: [],
  courseData: [],
  yearData: [],
  techData: [],
  industryData: [],
  roleData: [],
  setSemesterData: (data) => set(() => ({ semesterData: data })),
  setCourseData: (data) => set(() => ({ courseData: data })),
  setYearData: (data) => set(() => ({ yearData: data })),
  setTechData: (data) => set(() => ({ techData: data })),
  setIndustryData: (data) => set(() => ({ industryData: data })),
  setRoleData: (data) => set(() => ({ roleData: data })),

  fetchData: async () => {
    const [semester, course, year, tech, industry, role] = await Promise.all([
      supabase.from("semester").select("*").order("id", { ascending: true }),
      supabase.from("course").select("*").order("id", { ascending: true }),
      supabase.from("year").select("*").order("id", { ascending: true }),
      supabase.from("tech").select("*").order("id", { ascending: true }),
      supabase.from("industry").select("*").order("id", { ascending: true }),
      supabase.from("role").select("*").order("id", { ascending: true }),
    ]);

    if (
      semester.error ||
      course.error ||
      year.error ||
      tech.error ||
      industry.error ||
      role.error
    ) {
      console.log(semester.error);
      console.log(course.error);
      console.log(year.error);
      console.log(tech.error);
      console.log(industry.error);
      console.log(role.error);
    } else {
      set(() => ({
        semesterData: semester.data,
        courseData: course.data,
        yearData: year.data,
        techData: tech.data,
        industryData: industry.data,
        roleData: role.data,
      }));
    }
  },

  submitData: async (formData, members) => {
    // Verificar se formData tem todos os campos necessários
    if (!formData.name) {
      console.error("O campo 'name' está faltando ou é null");
      return;
    }

    // Inserir novo projeto na tabela "project", adiciona data, e status = false
    const { data: newProject, error: newProjectError } = await supabase
      .from("project")
      .insert([{ ...formData, date: new Date().toISOString(), status: false }])
      .single();

    if (newProjectError) {
      console.error(newProjectError);
      return;
    }

    // Verificar se newProject é válido
    if (!newProject) {
      console.error("Erro ao criar novo projeto, newProject é null");
      return;
    }

    // Para cada membro, inserir um novo membro na tabela "member"
    for (const member of members) {
      const { name, role, contact } = member;

      // Inserir novo membro na tabela "member"
      const { data: newMember, error: newMemberError } = await supabase
        .from("member")
        .insert([{ name, contact }])
        .single();

      if (newMemberError) {
        console.error(newMemberError);
        // opcional: se houver um erro ao inserir um membro, você pode decidir se deseja excluir o projeto que acabou de ser inserido
      }

      // Inserir novo registro na tabela "ProjectMember"
      const { error: newProjectMemberError } = await supabase
        .from("project_member")
        .insert([
          {
            project_id: newProject.id,
            member_id: newMember.id,
            role_id: role.id,
          },
        ]);

      if (newProjectMemberError) {
        console.error(newProjectMemberError);
        return;
      }
    }

  },
}));
