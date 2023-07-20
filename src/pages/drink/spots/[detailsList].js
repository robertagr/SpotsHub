import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../../public/stores/restaurantStore";

export default function DrinkSpotsList() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);

  const filteredDrinkSpots = spots.filter(
    (spot) => spot.beverageCategory === detailsList
  );

  return (
    <div>
      <h1>{detailsList}</h1>
      <ul>
        {filteredDrinkSpots.map((spot) => (
          <li key={spot._id}>
            <Link href={`/drink/spots/bar/${spot.title}`}>
              <h2>{spot.title}</h2>
              <Image
                src={spot.image}
                alt={spot.title}
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
