import { supabase } from "supabase/client";
import { persist, devtools } from "zustand/middleware";
import create from "zustand";

export const userState = create(
  devtools(
    persist(
      (set) => ({
        user: {},

        signIn: async (data) => {
          const user = await signInUser(data);
          set(() => ({ user: user.data.user }));
          return user;
        },

        getUser: async () => {
          const user = await getInfoUser();
          return user;
        },
        updateSession: (user) => {
          set(() => ({ user }));
        },
        registerUser: async (data) => {
          const user = await registerNewUser(data);
          set(() => ({ user: user.data.user }));
          return user;
        },
        resetPassword: async (data) => {
          const user = await resetPassword(data);
          set(() => ({ user: user.data.user }));
          return user;
        },


        confirmUser: async () => {
          const { data: user } = await supabase.auth.getUser();

          set(() => ({ user: user.user }));
          return user;
        },

        signOut: () => {
          signOutUser();
          set(
            (state) => ({
              ...state,
              user: {},
            }),
            true
          );
        },
      }),
      { name: "UserData" }
    ),
    {
      anonymousActionType: "UserData",
      enabled: true,
      name: "UserData",
    }
  )
);

const getInfoUser = async () => {
  const { data: user, error } = await supabase.auth.getUser();

  return error ? error : user;
};

const signInUser = async ({ email, password }) => {
  const user = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(user);
  return user;
};

const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  error ? console.log(error) : null;
};


const registerNewUser = async ({ email, password, first_name, last_name }) => {
  const data = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
      },
    },
  });

  return data;
};

const resetPassword = async ({ password }) => {
  const data = await supabase.auth.updateUser({
    password,
  });
  return data;
};
