import { create } from "zustand";
import axios from "axios";

export const useFiltroStore = create((set) => ({
  categorias: [],
  tags: [],
  filteredTags: [],
  loadingFilter: false,

  fetchFiltros: async () => {
    set({ loadingFilter: true });
    try {
      const response = await axios.get(
        "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/filtros"
      );
      const { categorias, tags } = response.data;
      set({
        categorias,
        tags,
        filteredTags: tags,
        loadingFilter: false,
      });
    } catch (error) {
      console.error("Erro ao buscar filtros:", error);
      set({ categorias: [], tags: [], filteredTags: [], loadingFilter: false });
    }
  },

  filterTags: (termo) => {
    set((state) => ({
      filteredTags: state.tags.filter((tag) =>
        tag.toLowerCase().includes(termo.toLowerCase())
      ),
    }));
  },

  resetFilteredTags: () => {
    set((state) => ({ filteredTags: state.tags }));
  },
}));
