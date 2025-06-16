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
  flows: [], //Feed Principal
  //Estado que indica que uma consulta está sendo realizada
  loading: false,
  //modal
  //Estado que armazena apenas os flows para aparecer no modal
  modalFlows: [],
  modalSearchTerm: "",
  modalLoading: false,

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
    const { searchTerm } = get();
    get().fetchFlows({ category: categoria, searchTerm }); // ← PASSA os valores certos
  },

  setSearchTerm: (termo) => {
    set({ searchTerm: termo });
    const { category } = get();
    get().fetchFlows({ searchTerm: termo, category }); // feed principal
  },

  setModalSearchTerm: (termo) => {
    set({ modalSearchTerm: termo });
    get().fetchModalFlows(termo); // apenas no modal
  },

  fetchFlows: async (params = {}) => {
    set({ loading: true });

    const { category, searchTerm } = get(); // estados atuais
    const queryParams = new URLSearchParams();

    const finalSearchTerm = params.searchTerm ?? searchTerm;
    const finalCategory = params.category ?? category;

    if (finalSearchTerm) queryParams.append("search", finalSearchTerm);
    if (finalCategory) queryParams.append("categoria", finalCategory);

    try {
      const response = await axios.get(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow?${queryParams.toString()}`
      );

      set({ flows: response.data });
    } catch (error) {
      console.error("Erro ao buscar flows:", error);
      set({ flows: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchModalFlows: async (termo = "") => {
    set({ modalLoading: true });
    const search = termo || get().modalSearchTerm || "";
    const queryParams = new URLSearchParams();

    if (search.trim() !== "") queryParams.append("search", search);

    try {
      const response = await axios.get(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow?${queryParams.toString()}`
      );
      set({ modalFlows: response.data });
    } catch (error) {
      console.error("Erro ao buscar flows no modal:", error);
      set({ modalFlows: [] });
    } finally {
      set({ modalLoading: false });
    }
  },

  resetModalSearch: () =>
    set({
      searchTerm: "",
      modalFlows: [],
    }),
}));
