import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

export default function ListPage() {
  const router = useRouter();
  const { detailsList } = router.query;
  console.log("detailsList", detailsList);

  const { data } = useSWR("/api/restaurants", {
    fallbackData: [],
  });

  console.log(data);

  const restaurants = data.filter(
    (restaurant) => restaurant.restaurantCategory === detailsList
  );
  console.log({ restaurants });

  return (
    <div>
      <h1>{detailsList} </h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <Link href={`/restaurants/${restaurant}`}>
              <h2>{restaurant.title}</h2>
              <Image
                src={restaurant.image}
                alt={restaurant.title}
                width={185}
                height={149}
              />
              {/* Later add more details about the restaurant, such as description, mapURL, etc in the next Description page. */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
