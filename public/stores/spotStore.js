import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSpotStore = create(
  persist(
    (set, get) => ({
      spots: [],
      selectedTags: [],
      searchQuery: "",
      searchedSpots: [],

      setData: (data) => set((state) => ({ spots: data })),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        set((state) => ({
          searchedSpots: state.spots.filter((spot) => {
            return spot.title.toLowerCase() === query.toLowerCase();
          }),
        }));
      },
    }),
    {
      name: "spot",
    }
  )
);
