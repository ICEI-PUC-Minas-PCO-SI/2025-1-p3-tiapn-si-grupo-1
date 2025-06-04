import { create } from "zustand";

//Cria a store chamada useFlowStore
export const useFlowStore = create((set) => ({
  // Estado para armazenar os IDs dos posts curtidos
  likedPosts: [],
  // Estado para armazenar os IDs dos posts salvos
  savedPosts: [],
  // Estado para armazenar comentários. Cada postId terá um array de comentários
  comments: {},

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
}));
