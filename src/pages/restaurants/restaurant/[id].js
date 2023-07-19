import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useRestaurantStore } from "../../../../public/stores/restaurantStore";

export default function Restaurant() {
  const restaurants = useRestaurantStore((state) => state.restaurants);
  const router = useRouter();
  const { id } = router.query;

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.title === id
  );

  if (!selectedRestaurant) {
    return;
  }

  return (
    <div>
      <ul>
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
        <Link href={`/restaurants/${selectedRestaurant.restaurantCategory}`}>
          Go Back
        </Link>
        <p>{selectedRestaurant.description}</p>
      </ul>
    </div>
  );
}
