import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useRestaurantStore } from "../../../../public/stores/restaurantStore";
import Head from "next/head";

export default function Restaurant() {
  const router = useRouter();
  const { id } = router.query;

  const { restaurants, toggleFavorite } = useRestaurantStore();
  console.log("rest", restaurants);
  // Find the selected restaurant based on the 'id' from the route
  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.title === id
  );

  // Check if the restaurant is marked as a favorite
  const isFavorite = useRestaurantStore((state) =>
    state.favoriteRestaurants.includes(selectedRestaurant._id)
  );
  console.log(selectedRestaurant);

  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{selectedRestaurant.title}</h2>
      <Image
        src={selectedRestaurant.image}
        alt={selectedRestaurant.title}
        width={336}
        height={327}
      />
      <div>
        <Link href={selectedRestaurant.mapURL}>Location</Link>
      </div>
      <Link href={`/spots/${selectedRestaurant.restaurantCategory}`}>
        Go Back
      </Link>
      <p>{selectedRestaurant.description}</p>

      {/* Add the favorite button */}
      <button onClick={() => toggleFavorite(selectedRestaurant._id)}>
        {isFavorite ? "❤️" : "🖤"}
      </button>
    </div>
  );
}
