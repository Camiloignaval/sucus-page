import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface productCart {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inStock: number;
}

interface CartState {
  items: productCart[];
  addToCart: (item: productCart) => void;
  removeOneFromCart: (id: string) => void;
  removeAllFromCart: (id: string) => void;
  getTotalQuantity: () => number;
  getQuantityById: (id: string) => number;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, getState) => ({
      items: [],
      addToCart: (item) =>
        set((state) => ({
          items: state.items.some((existing) => existing.id === item.id)
            ? state.items.map((existing) => {
                if (existing.id !== item.id) return existing;
                return {
                  ...existing,
                  quantity: existing.quantity + 1,
                };
              })
            : [...state.items, { ...item, quantity: 1 }],
        })),

      removeOneFromCart: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id !== id) return item;
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            })
            .filter((item) => item.quantity > 0),
        })),
      removeAllFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      getTotalQuantity: () => {
        const state = getState(); // Accede al estado actual
        const totalQty = state.items.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        return totalQty;
      },
      clearCart: () => set({ items: [] }),
      getQuantityById: (id) => {
        const state = getState();
        const item = state.items.find((item) => item.id === id);
        return item?.quantity ?? 0;
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
