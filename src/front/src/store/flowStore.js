import { create } from "zustand";
import axios from "axios";

//Cria a store chamada useFlowStore
export const useFlowStore = create((set, get) => ({
  // Estado para armazenar os IDs dos posts curtidos
  likedPosts: [],
  // Estado para armazenar os IDs dos posts salvos
  savedPosts: [],
  // Estado para armazenar comentários. Cada postId terá um array de comentários
  comments: {},
  //Estado para armazenar categoria ativa
  category: "",
  //Estado para segurar os itens de pesquisa
  searchTerm: "",
  //Estado que armazena quais flows devem ser exibidos
  flows: [],

  // Função para curtir/descurtir um post
  toggleLike: async (postId) =>
    set((state) => ({
      likedPosts: state.likedPosts.includes(postId)
        ? state.likedPosts.filter((id) => id !== postId)
        : [...state.likedPosts, postId],
    })),

  // Função para salvar/desalvar um post
  toggleSave: async (postId) =>
    set((state) => ({
      savedPosts: state.savedPosts.includes(postId)
        ? state.savedPosts.filter((id) => id !== postId)
        : [...state.savedPosts, postId],
    })),

  // Função para adicionar um comentário a um post específico
  addComment: (postId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), comment],
      },
    })),

  // Função opcional para remover um comentário com base no índice
  removeComment: async (postId, index) =>
    set((state) => {
      const newComments = [...(state.comments[postId] || [])];
      newComments.splice(index, 1); // Remove o comentário pelo índice
      return {
        comments: {
          ...state.comments,
          [postId]: newComments,
        },
      };
    }),

  setCategory: (categoria) => {
    set({ category: categoria });
    get().fetchFlows(); // atualiza a lista
  },

  setSearchTerm: (termo) => {
    set({ searchTerm: termo });
    get().fetchFlows(); // atualiza a lista
  },

  fetchFlows: async ({ useCategory = true, useSearch = true } = {}) => {
    const { category, searchTerm } = get();
    const params = {};
    if (useCategory && category) params.categoria = category;
    if (useSearch && searchTerm) params.search = searchTerm;

    console.log("Buscando flows com:", { category, searchTerm });
    try {
      const response = await axios.get(
        "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow",
        {
          params,
        }
      );
      set({ flows: response.data });
    } catch (error) {
      console.error("Erro ao buscar flows:", error);
      set({ flows: [] });
    }
  },
}));
