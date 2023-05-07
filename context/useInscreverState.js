import { supabase } from "supabase/client";
import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

//COLOQUE O DOS MEMBROS DENTRO DO SUBMITDATA
export const useInscreverState = create(
  persist(
    (set) => ({
      //StoreData
      formData: {},
      //setFormData: (data) => set(() => ({ formData: data })),
      setFormData: (data) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),
      resetFormData: () => set(() => ({ formData: {} })),

      //Fetch Data
      semesterData: [],
      courseData: [],
      yearData: [],
      techData: [],
      industryData: [],
      setSemesterData: (data) => set(() => ({ semesterData: data })),
      setCourseData: (data) => set(() => ({ courseData: data })),
      setYearData: (data) => set(() => ({ yearData: data })),
      setTechData: (data) => set(() => ({ techData: data })),
      setIndustryData: (data) => set(() => ({ industryData: data })),

      fetchData: async () => {
        const [semester, course, year, tech, industry] = await Promise.all([
          supabase
            .from("semester")
            .select("*")
            .order("id", { ascending: true }),
          supabase.from("course").select("*").order("id", { ascending: true }),
          supabase.from("year").select("*").order("id", { ascending: true }),
          supabase.from("tech").select("*").order("id", { ascending: true }),
          supabase
            .from("industry")
            .select("*")
            .order("id", { ascending: true }),
        ]);

        if (
          semester.error ||
          course.error ||
          year.error ||
          tech.error ||
          industry.error
        ) {
          console.log(semester.error);
          console.log(course.error);
          console.log(year.error);
          console.log(tech.error);
          console.log(industry.error);
        } else {
          set(() => ({
            semesterData: semester.data,
            courseData: course.data,
            yearData: year.data,
            techData: tech.data,
            industryData: industry.data,
          }));
        }
      },

      //Submit Data
      submitData: async (formData, leaderMember, commonMember) => {
        // Verificar se formData tem todos os campos necessários
        if (!formData.name) {
          console.error("O campo 'name' está faltando ou é null");
          return;
        }

        // Generate a UUID for the project
        const projectUUID = uuidv4();

        // Handle the image upload, load numerous images
        const logoImgPath = await uploadFile(
          formData.logoImg,
          "logo",
          projectUUID
        );
        const teamImgPath = await uploadFile(
          formData.teamImg,
          "team",
          projectUUID
        );
        const productImgPath = await uploadFile(
          formData.productImg,
          "product",
          projectUUID
        );

        // Then you can save the paths to these images in your formData
        formData.logoImg = logoImgPath;
        formData.teamImg = teamImgPath;
        formData.productImg = productImgPath;
        formData.projectUUID = projectUUID;

        console.log(projectUUID);

        //MEMBROS
        const insertMembers = async (members) => {
          const { data, error } = await supabase.from("member").insert(members);

          if (error) {
            console.error("Erro ao inserir membros na tabela", error);
          } else {
            console.log("Membros inseridos com sucesso", data);
          }
        };

        const formattedLeaderMembers = leaderMember.map((member) => ({
          name: [member.name],
          contact: member.contact,
          isFounder: member.isFounder,
          isLeader: true,
          projectUUID: projectUUID,
        }));

        const formattedCommonMembers = {
          name: commonMember, // Adiciona todos os membros comuns como um único array
          contact: null,
          isFounder: null,
          isLeader: false,
          projectUUID: projectUUID,
        };

        const allMembers = formattedLeaderMembers.concat(
          formattedCommonMembers
        );

        console.log(allMembers, "allMembers");

        await insertMembers(allMembers);

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

        // Verificar se newProject é válido
        if (newProjectError) {
          console.error(newProjectError);
          return;
        }

        if (!newProject) {
          console.error("Erro ao criar novo projeto, newProject é null");
          return;
        }

        //Upload Files
        async function uploadFile(fileList, path, projectUUID) {
          const files = Array.from(fileList);
          const uploadedFilePaths = await Promise.all(
            files.map(async (file) => {
              const fileName = `${uuidv4()}-${file.name}`;
              const folderPath = `${path}/${projectUUID}`; // Create a folder with projectUUID
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
      },
    }),

    {
      name: "InscreverData",
    }
  )
);
