import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRestaurantStore = create(
  persist(
    (set, get) => ({
      restaurants: [],
      setData: (data) => set((state) => ({ restaurants: data })),
    }),
    {
      name: "restaurant",
    }
  )
);
