import { create } from "zustand";
import { persist } from "zustand/middleware";

const arrayContainsString = (array, string) => {
  // console.log({ array, string });
  const lowercaseString = string.toLowerCase();
  return array.some((item) => item.toLowerCase() === lowercaseString);
};

export const useSpotStore = create(
  persist(
    (set, get) => ({
      spots: [],
      searchQuery: "",
      searchedSpots: [],

      setData: (data) => set((state) => ({ spots: data })),
      setSearchQuery: (query) => {
        set({ searchQuery: query });
        set((state) => ({
          searchedSpots: state.spots.filter((spot) => {
            const lowercaseQuery = query.toLowerCase();
            return (
              spot.title.toLowerCase() === lowercaseQuery ||
              arrayContainsString(spot.tags, query)
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
