import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSpotStore = create(
  persist(
    (set, get) => ({
      spots: [],
      favoriteSpots: [],
      selectedTags: [],

      setData: (data) => set((state) => ({ spots: data })),
      toggleFavorite: (spotsId) =>
        set((state) => ({
          favoriteSpots: state.favoriteSpots.includes(spotsId)
            ? state.favoriteSpots.filter((id) => id !== spotsId)
            : [...state.favoriteSpots, spotsId],
        })),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
    }),

    {
      name: "spot",
    }
  )
);
