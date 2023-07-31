import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSpotStore = create(
  persist(
    (set, get) => ({
      spots: [],
      favoriteSpots: [],
      selectedTags: [],
      searchQuery: "",
      searchedSpots: [],

      setData: (data) => set((state) => ({ spots: data })),
      toggleFavorite: (spotsId) =>
        set((state) => ({
          favoriteSpots: state.favoriteSpots.includes(spotsId)
            ? state.favoriteSpots.filter((id) => id !== spotsId)
            : [...state.favoriteSpots, spotsId],
        })),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        set((state) => ({
          searchedSpots: state.spots.filter((spot) => {
            const tags = spot.tags || [];
            return (
              tags.some((tag) =>
                tag.toLowerCase().includes(query.toLowerCase())
              ) || spot.title.toLowerCase().includes(query.toLowerCase())
            );
          }),
        }));
      },
    }),
    {
      name: "spot",
    }
  )
);
