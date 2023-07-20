import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSpotStore } from "../../../../public/stores/restaurantStore";

export default function Restaurant() {
  const router = useRouter();
  const { id } = router.query;

  const { spots, favoriteSpots, toggleFavorite } = useSpotStore();
  const selectedRestaurant = spots?.find(
    (restaurant) => restaurant.title === id
  );

  const isFavorite = favoriteSpots.find(
    (rest) => rest === selectedRestaurant?._id
  );

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
        <div>{selectedRestaurant.tags.join(" ")}</div>

        <Link href={selectedRestaurant.mapURL}>Location</Link>
      </div>
      <Link href={`/spots/${selectedRestaurant.restaurantCategory}`}>
        Go Back
      </Link>
      <p>{selectedRestaurant.description}</p>

      <button onClick={() => toggleFavorite(selectedRestaurant._id)}>
        {isFavorite ? "❤️" : "🖤"}
      </button>
    </div>
  );
}
