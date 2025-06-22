import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set, get) => ({
  users: [], // todos os usuários
  filteredUsers: [], // usuários filtrados conforme busca
  loadingUsers: false,

  // Chama uma única vez
  fetchUsers: async () => {
    set({ loadingUsers: true });
    try {
      const response = await axios.get(
        "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/usuario"
      );
      set({
        users: response.data,
        filteredUsers: response.data, // inicia com todos
      });
      console.log("USUARIOS: ", JSON.stringify(response.data));
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      set({ users: [], filteredUsers: [] });
    } finally {
      set({ loadingUsers: false });
    }
  },

  // Filtra usuários com base no termo
  filterUsers: (termo) => {
    const allUsers = get().users;
    const termoLower = termo.toLowerCase();

    const filtrados = allUsers.filter(
      (user) =>
        user.nome.toLowerCase().includes(termoLower) ||
        user.email.toLowerCase().includes(termoLower)
    );

    set({ filteredUsers: filtrados });
  },

  // Reseta busca
  resetFilteredUsers: () => {
    const allUsers = get().users;
    set({ filteredUsers: allUsers });
  },
}));
