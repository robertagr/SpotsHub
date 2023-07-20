import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../../public/stores/restaurantStore";

export default function ListPage() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);
  console.log(spots);

  const filteredDrinkSpots = spots.filter(
    (spots) => spots.restaurantCategory === detailsList
  );

  return (
    <div>
      <h1>{detailsList}</h1>
      <ul>
        {filteredDrinkSpots.map((spot) => (
          <li key={spot._id}>
            <Link href={`/drinkCategory/spots/${spot.title}`}>
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
