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
            const lowercaseQuery = query.toLowerCase();
            return (
              spot.title.toLowerCase() === lowercaseQuery ||
              // (spot.tags.includes(lowercaseQuery))
              (spot.tags.includes(lowercaseQuery))
              
              // spot.tags.forEach((tag) => 
              //   tag.toLowerCase() === lowercaseQuery)

              // }));
              // spot.tags.map((tag) => tag.toLowerCase() === lowercaseQuery)

            )
          }),
        }));
      },
    }),
    {
      name: "spot",
    }
  )
);
