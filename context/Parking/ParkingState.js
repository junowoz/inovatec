import { supabase } from "supabase/client";
import {create} from "zustand";
import { persist, devtools } from "zustand/middleware";

export const parkingState = create(
  devtools(
    persist(
      (set, get) => ({
        bici: {},

        setBici: async (id) => {
          if (id != get().bici.id && id != undefined) {
            console.log("server");
            const data = await getBici(id);
            set({ bici: { ...data } });
            return data;
          } else {
            console.log("cache");
            return { ...get().bici };
          }
        },

        clearBici: () => {
          set(
            (state) => ({
              ...state,
              bici: {},
            }),
            true
          );
        },

        parking: {},

        setParking: async () => {
          const data = await getBicis();
          set({
            parking: {
              ...data,
            },
          });
          return data;
        },

        clearParking: () => {
          set(
            (state) => ({
              ...state,
              parking: {},
            }),
            true
          );
        },

        clearAll: () => {
          get().clearParking();
          get().clearBici();
        },

        CDN2: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagesbicis/`,
      }),
      { name: "ParkingData" }
    ),

    {
      anonymousActionType: "ParkingData",
      enabled: true,
      name: "ParkingData",
    }
  )
);

const getBicis = async () => {
  const { data: bicis, error } = await supabase.from("bicis").select(`
  id,price,title,
  models (name), filesUrl, propiedades (transmission,
  category ,
  subcategory ,
  brand, 
  material ,
  suspension ,
  freno,
  rine), size, country, year`);
  console.log(error);
  console.log(bicis);
  return error ? error : await bicis;
};



const getBici = async (id) => {
  console.log("🚀 ~ file: ParkingState.js:92 ~ getBici ~ id:", id)
  const { data: bicis, error } = id
    ? await supabase
        .from("bicis")
        .select(`
        id,price,title,
          models (name), filesUrl, propiedades (transmission (name),
          category (name) ,
          subcategory (name) ,
          brands (name), 
          materials (name),
          model,
          suspension (name) ,
          frenos (name),
          rines (name)), size (name), country (name), year  (name)`
        )
        .eq("id", id)
    : { error: { message: "id = undefined" }, bicis: [] };

  console.log(error);

  return error ? error : bicis[0];
};
