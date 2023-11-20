import { create } from "zustand";

interface UiState {
  showDetailCart: boolean;
  openDetailCart: () => void;
  closeDetailCart: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  showDetailCart: false,
  openDetailCart: () =>
    set(() => ({
      showDetailCart: true,
    })),
  closeDetailCart: () =>
    set(() => ({
      showDetailCart: false,
    })),
}));
