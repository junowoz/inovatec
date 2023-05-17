// import { supabase } from 'supabase/client'; // Corrija isso se você estiver usando Supabase
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { v4 } from 'uuid';

// filtroState.js
export const useMemberState = create(
  persist(
    (set, get) => ({
      leaderMember: [{ id: v4(), name: '', contact: '', isFounder: true }],
      setLeaderMember: (members) => set((state) => ({ leaderMember: [...members] })),

      deleteLeaderMember: (i) => {
        const newMembersData = get().leaderMember.filter((item, index) => index !== i)
        set((state) => ({ leaderMember: [...newMembersData] }))
      },

      handleFounderChange: (i) => { // Alterei changeFunder para handleFounderChange
        const newMembersData = get().leaderMember.map((item, index) => {
          if (index === i) {
            return { ...item, isFounder: !item.isFounder }
          }
          return item
        })
        set((state) => ({ leaderMember: [...newMembersData] }))
      }
    }),
    {
      name: 'FiltroData', // o nome do seu estado persistente
    }
  )
);
