import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRestaurantStore = create(
  persist(
    (set, get) => ({
      restaurants: [],
      favoriteRestaurants: [],
      setData: (data) => set((state) => ({ restaurants: data })),
      toggleFavorite: (restaurantId) =>
        set((state) => ({
          favoriteRestaurants: state.favoriteRestaurants.includes(restaurantId)
            ? state.favoriteRestaurants.filter((id) => id !== restaurantId)
            : [...state.favoriteRestaurants, restaurantId],
        })),
    }),

    {
      name: "restaurant",
    }
  )
);
