import { create } from "zustand";

export const useUIStore = create((set) => ({
  isOverlayActive: false,
  isSearchModalOpen: false,

  openSearchModal: () =>
    set({ isOverlayActive: true, isSearchModalOpen: true }),

  closeSearchModal: () =>
    set({ isOverlayActive: false, isSearchModalOpen: false }),

  toggleOverlay: () =>
    set((state) => ({ isOverlayActive: !state.isOverlayActive })),
}));
