import { create } from "zustand";
import axios from "axios";

export const useStatisticsStore = create((set) => ({
  loadingStatistics: false,
  flows: 0,
  users: 0,
  communityPosts: 0,
  likes: 0,

  fetchAllStatistics: async () => {
    set({ loadingStatistics: true });
    try {
      const [flowsRes, usersRes, postsRes, likesRes] = await Promise.all([
        axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow"
        ),
        axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario"
        ),
        axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/postagemcomunidade"
        ),
        axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas"
        ),
      ]);

      set({
        flows: flowsRes.data.length,
        users: usersRes.data.length,
        communityPosts: postsRes.data.length,
        likes: likesRes.data.length,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      set({
        flows: 0,
        users: 0,
        communityPosts: 0,
        likes: 0,
      });
    } finally {
      set({ loadingStatistics: false });
    }
  },
}));
