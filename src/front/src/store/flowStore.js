import { create } from "zustand";
import axios from "axios";

// Configura o axios para incluir o token de autenticação
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cria a store chamada useFlowStore
export const useFlowStore = create((set, get) => ({
  likedPosts: [],
  savedPosts: [],
  comments: {},
  category: "",
  searchTerm: "",
  flows: [],
  loading: false,
  modalFlows: [],
  modalSearchTerm: "",
  modalLoading: false,

  toggleLike: async (postId) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) throw new Error("Usuário não autenticado");

      const { likedPosts } = get();
      if (likedPosts.includes(postId)) {
        await axios.delete(
          `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas/${usuarioId}/${postId}`
        );
      } else {
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
      get().fetchFlows(); // Atualiza contadores
    } catch (error) {
      console.error("Erro ao processar curtida:", error);
    }
  },

  toggleSave: async (postId) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      if (!usuarioId) throw new Error("Usuário não autenticado");

      const { savedPosts } = get();
      if (savedPosts.includes(postId)) {
        await axios.delete(
          `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flowsalvos/${usuarioId}/${postId}`
        );
      } else {
        await axios.post(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flowsalvos",
          { usuarioId, flowId: postId }
        );
      }
      set((state) => ({
        savedPosts: state.savedPosts.includes(postId)
          ? state.savedPosts.filter((id) => id !== postId)
          : [...state.savedPosts, postId],
      }));
      get().fetchFlows(); // Atualiza contadores
    } catch (error) {
      console.error("Erro ao processar save:", error);
    }
  },

  addComment: async (postId, comment) => {
    try {
      const response = await axios.post(
        "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario",
        { mensagem: comment, flow_id: postId }
      );
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), response.data],
        },
      }));
      get().fetchFlows(); // Atualiza contadores
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  },

  removeComment: async (postId, commentId) => {
    try {
      await axios.delete(
        `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/comentario/${commentId}`
      );
      set((state) => {
        const newComments = [...(state.comments[postId] || [])].filter(
          (comment) => comment.id !== commentId
        );
        return {
          comments: {
            ...state.comments,
            [postId]: newComments,
          },
        };
      });
      get().fetchFlows(); // Atualiza contadores
    } catch (error) {
      console.error("Erro ao remover comentário:", error);
    }
  },

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
      console.log("Flows Response:", flowsResponse.data); // Log para depuração

      // Busca todas as curtidas
      let curtidas = [];
      try {
        const curtidasResponse = await axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/curtidas"
        );
        // Trata caso em que a API retorna objeto com mensagem
        curtidas = Array.isArray(curtidasResponse.data)
          ? curtidasResponse.data
          : curtidasResponse.data.mensagem
          ? []
          : [];
        console.log("Curtidas Response:", curtidas); // Log para depuração
      } catch (curtidasError) {
        console.error("Erro ao buscar curtidas:", curtidasError);
        curtidas = []; // Fallback para array vazio
      }

      // Busca todos os salvos
      let saves = [];
      try {
        const savesResponse = await axios.get(
          "https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flowsalvos"
        );
        saves = Array.isArray(savesResponse.data) ? savesResponse.data : [];
        console.log("Saves Response:", saves); // Log para depuração
      } catch (savesError) {
        console.error("Erro ao buscar salvos:", savesError);
        saves = []; // Fallback para array vazio
      }

      // Mapeia os flows para incluir stats corretos
      const mappedFlows = await Promise.all(
        flowsResponse.data.map(async (flow) => {
          // Conta curtidas
          const likeCount = curtidas.filter(
            (curtida) => String(curtida.flow_id) === String(flow.id)
          ).length;

          // Busca comentários para este flow via /api/flow/:id
          let commentCount = 0;
          try {
            const flowDetailResponse = await axios.get(
              `https://knowflowpocess-hqbjf6gxd3b8hpaw.brazilsouth-01.azurewebsites.net/api/flow/${flow.id}`
            );
            console.log(`Flow Detail Response for flow ${flow.id}:`, flowDetailResponse.data); // Log para depuração
            commentCount = Array.isArray(flowDetailResponse.data.comentarios)
              ? flowDetailResponse.data.comentarios.length
              : flow.stats?.comments || 0;
          } catch (flowDetailError) {
            console.error(`Erro ao buscar detalhes do flow ${flow.id}:`, flowDetailError);
            commentCount = flow.stats?.comments || 0; // Fallback
          }

          // Conta salvos
          const saveCount = saves.filter(
            (save) => String(save.flow_id) === String(flow.id)
          ).length;

          return {
            ...flow,
            stats: {
              likes: likeCount,
              comments: commentCount,
              saves: saveCount,
              views: flow.stats?.views || 0,
            },
          };
        })
      );

      console.log("Mapped Flows:", mappedFlows); // Log para depuração
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