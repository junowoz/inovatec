import { supabase } from "supabase/client";
import { v4 } from "uuid";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

/* Recordatorio Colocar el estado del usuario para que se puede leer directamente */

export const FPState = create(
  devtools(
    persist(
      (set, get) => ({
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

        setForm: async (valor, parameters = "*", equal = null, column = "") => {
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
    .eq("category", parseInt(category));

  return error ? error : data;
};

const getDatum = async (name, parameters = "*") => {
  let { data: data, error } = await supabase.from(name).select(parameters);
  console.log(data);
  console.log(error);

  return error ? error : data;
};

const getDatumEqual = async (name, parameters = "*", equal, column) => {
  let { data: data, error } = await supabase
    .from(name)
    .select(parameters)
    .eq(column, parseInt(equal));
  console.log(data);
  console.log(error);

  return error ? error : data;
};

export const getData = async ( name = null,parameters = "*",equal = null,column = "") => {
  let data = {};

  if (equal) {
    data[name] = await getDatumEqual(valor, parameters, equal, column);
    return await data;
  }
  data[name] = await getDatum(name, parameters);

  return await data;
};

export const postImages = async (files, userID) => {
  const carpeta = v4();

  const filesUrl = files.map(async (file) => {
    const { data, error } = await supabase.storage
      .from("imagens")
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
        transmission,
        category,
        subcategory: subcategory ? subcategory : null,
        model: other,
        brand,
        material,
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
