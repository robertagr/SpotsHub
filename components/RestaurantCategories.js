import useSWR from "swr";

export default function RestaurantCategories() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return <div>RestaurantCategories</div>;
}
