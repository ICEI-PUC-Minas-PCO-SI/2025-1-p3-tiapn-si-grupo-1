import { create } from "zustand";
import { useFlowStore } from "./flowStore";
import { useUserStore } from "./userStore";

export const useUIStore = create((set) => ({
  isOverlayActive: false,
  isSearchModalOpen: false,

  
  openSearchModal: () => {
    set({ isOverlayActive: true, isSearchModalOpen: true });

    // Buscar dados e resetar buscas antigas
    const flowStore = useFlowStore.getState();
    const userStore = useUserStore.getState();

    flowStore.fetchModalFlows("");       // ← busca todos os flows
    flowStore.setModalSearchTerm("");    // ← limpa input e termo anterior

    userStore.fetchUsers();              // ← busca todos os usuários
    userStore.resetFilteredUsers();      // ← mostra todos os usuários
  },


  closeSearchModal: () => {
    set({ isOverlayActive: false, isSearchModalOpen: false });
    useFlowStore.getState().resetModalSearch(); // <- limpa o search ao fechar
  },

  toggleOverlay: () =>
    set((state) => ({ isOverlayActive: !state.isOverlayActive })),
}));
