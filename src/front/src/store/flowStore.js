import { create } from "zustand";
import axios from "axios";

// Configura o axios para incluir o token de autenticação (alinhado com FlowViewer)
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cria a store chamada useFlowStore
export const useFlowStore = create((set, get) => ({
  // Estado para armazenar os IDs dos posts curtidos
  likedPosts: [],
  // Estado para armazenar os IDs dos posts salvos
  savedPosts: [],
  // Estado para armazenar comentários. Cada postId terá um array de comentários
  comments: {},
  // Estado para armazenar categoria ativa
  category: "",
  // Estado para segurar os itens de pesquisa
  searchTerm: "",
  // Estado que armazena quais flows devem ser exibidos
  flows: [], // Feed Principal
  // Estado que indica que uma consulta está sendo realizada
  loading: false,
  // Modal
  modalFlows: [],
  modalSearchTerm: "",
  modalLoading: false,

  // Função para curtir/descurtir um post
  toggleLike: async (postId) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) throw new Error("Usuário não autenticado");

      const { likedPosts } = get();
      if (likedPosts.includes(postId)) {
        // Remover curtida
        const curtidasResponse = await axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas"
        );
        const curtida = curtidasResponse.data.find(
          (c) =>
            String(c.usuario_id || c.usuarioId) === String(usuarioId) &&
            String(c.flow_id || c.flowId) === String(postId)
        );
        if (!curtida || !curtida.id) throw new Error("Curtida não encontrada");
        await axios.delete(
          `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas/${curtida.id}`
        );
      } else {
        // Adicionar curtida
        await axios.post(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas",
          { flow_id: postId }
        );
      }
      set((state) => ({
        likedPosts: state.likedPosts.includes(postId)
          ? state.likedPosts.filter((id) => id !== postId)
          : [...state.likedPosts, postId],
      }));
    } catch (error) {
      console.error("Erro ao processar curtida:", error);
    }
  },

  // Função para salvar/desalvar um post
  toggleSave: async (postId) => {
    try {
      // Aqui você pode adicionar chamadas à API para salvar/desalvar, se necessário
      set((state) => ({
        savedPosts: state.savedPosts.includes(postId)
          ? state.savedPosts.filter((id) => id !== postId)
          : [...state.savedPosts, postId],
      }));
    } catch (error) {
      console.error("Erro ao processar save:", error);
    }
  },

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
      newComments.splice(index, 1);
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
    get().fetchFlows({ category: categoria, searchTerm });
  },

  setSearchTerm: (termo) => {
    set({ searchTerm: termo });
    const { category } = get();
    get().fetchFlows({ searchTerm: termo, category });
  },

  setModalSearchTerm: (termo) => {
    set({ modalSearchTerm: termo });
    get().fetchModalFlows(termo);
  },

  fetchFlows: async (params = {}) => {
    set({ loading: true });

    const { category, searchTerm } = get();
    const queryParams = new URLSearchParams();

    const finalSearchTerm = params.searchTerm ?? searchTerm;
    const finalCategory = params.category ?? category;

    if (finalSearchTerm) queryParams.append("search", finalSearchTerm);
    if (finalCategory) queryParams.append("categoria", finalCategory);

    try {
      // Busca os flows
      const flowsResponse = await axios.get(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow?${queryParams.toString()}`
      );

      // Busca todas as curtidas
      let curtidas = [];
      try {
        const curtidasResponse = await axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas"
        );
        curtidas = curtidasResponse.data;
      } catch (curtidasError) {
        console.error("Erro ao buscar curtidas:", curtidasError);
      }

      // Mapeia os flows para incluir stats corretos
      const mappedFlows = flowsResponse.data.map((flow) => {
        // Conta curtidas para este flow
        const likeCount = curtidas.filter(
          (curtida) => String(curtida.flow_id || curtida.flowId) === String(flow.id)
        ).length;

        // Retorna o flow com stats ajustado
        return {
          ...flow,
          stats: {
            likes: likeCount,
            comments: flow.comentarios?.length || 0,
            saves: flow.stats?.saves || 0,
            views: flow.stats?.views || 0,
          },
        };
      });

      set({ flows: mappedFlows });
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