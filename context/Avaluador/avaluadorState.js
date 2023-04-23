import { getData } from "context/InscreverProjetos/IPState";
import { supabase } from "supabase/client";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";



export const avaluadorState = create(
  
    (set, get) => ({
      brand: "",

      quest: { years: [] },

      setYears: (data) => {
        set({ quest: { ...data } });
      },

      clearQuest: () => {
        set(
          (state) => ({
            ...state,
            quest: {},
          }),
          true
        );
      },

      setBrand: (title) => {
        set((state) => ({
          brand: title,
        }));
      },

      clearAll: () => {
        get().clearQuest();
      },

      projetos: [],

      setProjetos: async () => {
        const data = await getBicis();

        set({
          projetos: 
            [...data],
          
        });
        return data;
      },

      conditions: [],

      setConditions: async () => {
        const data = await getData("conditions");

        set(() => ({
          ...data,
        }));
      },
    }
  )
);


const getBicis = async () => {
  const { data: bicis, error } = await supabase.from("bmodels").select(`
    id,price,name,year, brands (name), category, imageUrl`);
  error? console.log(error) :null
  return error ? error : await bicis;
};