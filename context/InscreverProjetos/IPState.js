import { supabase } from "supabase/client";
import { v4 } from "uuid";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

/* Recordatorio Colocar el estado del usuario para que se puede leer directamente */

export const IPState = create(
  devtools(
    persist(
      (set, get) => ({

        name: "",
        setName: (name) => {
          set({ name });
        },


        publication: {},

        setPublication: async (data) => {
          set({ publication: { ...data } });
        },

        postPublication: async (items) => {
          return await postBici(items);
        },

        clearPublication: () => {
          set(
            (state) => ({
              ...state,
              publication: {},
            }),
            true
          );
        },

        form: {},

        setForm: async (
          valor,
          parameters = "*",
          equal = null,
          column = null
        ) => {
          console.log(equal, column);
          const data = await getData(valor, parameters, equal, column);

          set({
            form: {
              ...get().form,
              ...data,
              live: true,
            },
          });
        },

        setModels: async (category, brand) => {
          let data = await getModels(category, brand);
          set({
            form: {
              ...get().form,
              models: [...data],
              live: true,
            },
          });
        },

        clearTransmision: async () => {
          set({
            form: {
              ...get().form,
              transmissions: null,
              suspension: null,
              frenos: null,
              rines: null,
            },
          });
        },

        clearForm: () => {
          set(
            (state) => ({
              ...state,
              form: {},
            }),
            true
          );
        },

        UpdateImages: async (files, userID) => {
          const paths = await postImages(files, userID);

          Promise.resolve(paths).then((images) => {
            set({
              publication: { filesUrl: [...images] },
            });
          });

          return paths;
        },

        clearAll: () => {
          get().clearForm();
          get().clearPublication();
        },
      }),
      { name: "FormPublicationData" }
    ),
    {
      anonymousActionType: "FormPublicationData",
      enabled: true,
      name: "FormPublicationData",
    }
  )
);

const getModels = async (category, brand) => {
  // converter brand to id

  let { data, error } = await supabase
    .from("models")
    .select("id,name")
    .eq("brand", parseInt(brand))
    .eq("category", parseInt(category))
    .order("name", { ascending: true });

  return error ? error : data;
};

const getDatum = async (name, parameters = "*") => {
  let { data: data, error } = await supabase
    .from(name)
    .select(parameters)
    .order("id", { ascending: true });

  return error ? error : data;
};

const getDatumEqual = async (name, parameters = "*", equal, column) => {
  let { data: data, error } = await supabase
    .from(name)
    .select(parameters)
    .eq(column, parseInt(equal))
    .order("id", { ascending: true });

  return error ? error : data;
};

export const getData = async (name, parameters = "*", equal, column) => {
  let data = {};

  if (equal !== null) {
    console.log("🚀 ~ file: FPstate.js:129 ~ getData ~ equal:", equal);

    data[name] = await getDatumEqual(name, parameters, equal, column);
    return await data;
  }
  data[name] = await getDatum(name, parameters);

  return await data;
};

export const postImages = async (files, userID) => {
  const carpeta = v4();

  const filesUrl = files.map(async (file) => {
    const { data, error } = await supabase.storage
      .from("imagesbicis")
      .upload(userID + "/" + carpeta + "/" + v4(), file);

    return error ? (console.log(error), error) : data.path;
  });

  return await Promise.all(filesUrl);
};

const postBici = async ({
  conditions,
  year,
  model,
  category,
  brand,
  size,
  material,
  transmission,
  title,
  description,
  other,
  suspension,
  freno,
  rin,
  price,
  subcategory,
  filesUrl,
  user_id,
}) => {
  const propsres = await supabase
    .from("propiedades")
    .insert([
      {
        transmission: transmission ? transmission : null,
        category: category ? category : null,
        subcategory: subcategory ? subcategory : null,
        model: other,
        brand: brand ? brand : null,
        material: material ? material : null,
        suspension: suspension ? suspension : null,
        freno: freno ? freno : null,
        rine: rin ? rin : null,
      },
    ])
    .select("*");

  const res = await supabase.from("bicis").insert([
    {
      condition: conditions,
      year,
      model,
      size,
      title,
      description,
      price,
      filesUrl,
      user_id,
      country: 1,
      propiedades: propsres?.data[0]?.id ?? 8,
    },
  ]);

  return res;
};
