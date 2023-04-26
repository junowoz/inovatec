import { supabase } from "supabase/client";
import create from "zustand";

export const InscreverState = create((set) => ({
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
      supabase.from("semester").select("*"),
      supabase.from("course").select("*"),
      supabase.from("year").select("*"),
      supabase.from("tech").select("*"),
      supabase.from("industry").select("*"),
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
}));

// import { supabase } from "supabase/client";
// import create from "zustand";

// export const InscreverState = create((set) => ({
//   semesterData: [],
//   courseData: [],
//   yearData: [],
//   techData: [],
//   industryData: [],
//   setSemesterData: (data) => set(() => ({ semesterData: data })),
//   setCourseData: (data) => set(() => ({ courseData: data })),
//   setYearData: (data) => set(() => ({ yearData: data })),
//   setTechData: (data) => set(() => ({ techData: data })),
//   setIndustryData: (data) => set(() => ({ industryData: data })),

//   fetchData: async () => {
//     const { data: semesterData, error: semesterError } = await supabase
//       .from("semester")
//       .select("*");
//     const { data: courseData, error: courseError } = await supabase
//       .from("course")
//       .select("*");
//     const { data: yearData, error: yearError } = await supabase
//       .from("year")
//       .select("*");
//     const { data: techData, error: techError } = await supabase
//       .from("tech")
//       .select("*");
//     const { data: industryData, error: industryError } = await supabase
//       .from("industry")
//       .select("*");

//     if (
//       semesterError ||
//       courseError ||
//       yearError ||
//       techError ||
//       industryError
//     ) {
//       console.log(semesterError);
//       console.log(courseError);
//       console.log(yearError);
//       console.log(techError);
//       console.log(industryError);
//     } else {
//       set(() => ({
//         semesterData,
//         courseData,
//         yearData,
//         techData,
//         industryData,
//       }));
//     }
//   },
// }));
