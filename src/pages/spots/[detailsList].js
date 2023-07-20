import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../public/stores/restaurantStore";

export default function ListPage() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);

  const filteredRestaurants = spots.filter(
    (restaurant) => restaurant.restaurantCategory === detailsList
  );

  return (
    <div>
      <h1>{detailsList} </h1>
      <ul>
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <Link href={`/spots/restaurant/${restaurant.title}`}>
              <h2>{restaurant.title}</h2>
              <Image
                src={restaurant.image}
                alt={restaurant.title}
                width={185}
                height={149}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
