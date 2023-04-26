import create from 'zustand';
import { supabase } from "supabase/client";


const InscreverStore = create((set) => ({
  // Aquí definimos los valores iniciales de nuestro estado compartido
  projectData: {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    // Aquí puedes agregar más campos según tus necesidades
  },
  setPageData: (page, data) =>
    set((state) => ({
      projectData: {
        ...state.projectData,
        [page]: data,
      },
    })),
}));

export default InscreverStore;
