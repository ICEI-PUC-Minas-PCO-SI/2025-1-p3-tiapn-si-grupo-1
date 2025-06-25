import { create } from "zustand";
import { useFlowStore } from "./flowStore";
import { useUserStore } from "./userStore";
import { useFiltroStore } from "./filterStore";

export const useUIStore = create((set) => ({
  isOverlayActive: false,
  isSearchModalOpen: false,
  isLogoutModalOpen: false,

  openSearchModal: () => {
    set({ isOverlayActive: true, isSearchModalOpen: true });

    // Buscar dados e resetar buscas antigas
    const flowStore = useFlowStore.getState();
    const userStore = useUserStore.getState();
    const filtroStore = useFiltroStore.getState();

    flowStore.fetchModalFlows(""); // ← busca todos os flows
    flowStore.setModalSearchTerm(""); // ← limpa input e termo anterior

    userStore.fetchUsers(); // ← busca todos os usuários
    userStore.resetFilteredUsers(); // ← mostra todos os usuários

    filtroStore.fetchFiltros(); // carrega categorias e tags do backend
    filtroStore.resetFilteredTags(); // mostra todas as tags inicialmente
  },

  closeSearchModal: () => {
    set({ isOverlayActive: false, isSearchModalOpen: false });
    useFlowStore.getState().resetModalSearch(); // <- limpa o search ao fechar
  },

  openLogoutModal: () =>
    set({ isOverlayActive: true, isLogoutModalOpen: true }),

  closeLogoutModal: () =>
    set({ isOverlayActive: false, isLogoutModalOpen: false }),

  toggleOverlay: () =>
    set((state) => ({ isOverlayActive: !state.isOverlayActive })),
}));
