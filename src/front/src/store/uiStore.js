import { create } from "zustand";
import { useFlowStore } from "./flowStore";

export const useUIStore = create((set) => ({
  isOverlayActive: false,
  isSearchModalOpen: false,

  openSearchModal: () => {
    set({ isOverlayActive: true, isSearchModalOpen: true });
    // Chama diretamente do flowStore, pois são stores separadas
    useFlowStore.getState().fetchModalFlows("");
  },

  closeSearchModal: () => {
    set({ isOverlayActive: false, isSearchModalOpen: false });
    useFlowStore.getState().resetModalSearch(); // <- limpa o search ao fechar
  },

  toggleOverlay: () =>
    set((state) => ({ isOverlayActive: !state.isOverlayActive })),
}));
