import { supabase } from "supabase/client";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";

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

    // Generate a UUID for the project
    const projectImageId = uuidv4();

    // Handle the image upload, load numerous images
    const logoImgPath = await uploadFile(
      formData.logoImg,
      "logo",
      projectImageId
    );
    const teamImgPath = await uploadFile(
      formData.teamImg,
      "team",
      projectImageId
    );
    const productImgPath = await uploadFile(
      formData.productImg,
      "product",
      projectImageId
    );

    // Then you can save the paths to these images in your formData
    formData.logoImg = logoImgPath;
    formData.teamImg = teamImgPath;
    formData.productImg = productImgPath;

    // Inserir novo projeto na tabela "project", adiciona data, e status = false
    const { data: newProject, error: newProjectError } = await supabase
      .from("project")
      .insert([
        {
          ...formData,
          date: new Date().toISOString(),
          status: false,
          logoImg: formData.logoImg
            ? JSON.stringify({ path: formData.logoImg })
            : null,
          teamImg: formData.teamImg
            ? JSON.stringify({ path: formData.teamImg })
            : null,
          productImg: formData.productImg
            ? JSON.stringify({ path: formData.productImg })
            : null,
        },
      ])
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

    //Upload Files
    async function uploadFile(fileList, path, projectImageId) {
      const files = Array.from(fileList);
      const uploadedFilePaths = await Promise.all(
        files.map(async (file) => {
          const fileName = `${uuidv4()}-${file.name}`;
          const folderPath = `${path}/${projectImageId}`; // Create a folder with projectImageId
          const filePath = `${folderPath}/${fileName}`;
          let { error } = await supabase.storage
            .from("midia")
            .upload(filePath, file);
          if (error) {
            throw error;
          }
          return filePath;
        })
      );
      return uploadedFilePaths;
    }

    //INSERT MEMBERS
    for (const member of members) {
      // Insert member into "member" table
      const { data: newMember, error: newMemberError } = await supabase
        .from("member")
        .insert([
          {
            name: member.name,
            contact: member.contact,
          },
        ])
        .single();

      if (newMemberError) {
        console.error(newMemberError);
        return;
      }

      // Check if newMember is valid
      if (!newMember) {
        console.error("Error while creating new member, newMember is null");
        return;
      }

      // Insert member into "project_member" table
      const { error: projectMemberError } = await supabase
        .from("project_member")
        .insert([
          {
            project_id: newProject.id,
            role_id: member.role,
            member_id: newMember.id, // Use the ID of the newly created member
          },
        ]);

      if (projectMemberError) {
        console.error(projectMemberError);
        return;
      }
    }
  },
}));
