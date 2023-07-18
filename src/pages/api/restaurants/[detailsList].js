import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";

export default function ListPage({ params }) {
  console.log(params);
  const router = useRouter();
  const { category } = router.query;
  console.log(category);

  const { data } = useSWR("/api/restaurants", {
    fallbackData: [],
  });

  console.log(data);

  const restaurants = data.filter(
    (restaurant) => restaurant.category === category
  );
  console.log({ restaurants });

  return (
    <div>
      <h1>{category} </h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <h2>{restaurant.title}</h2>
            <Image
              src={restaurant.image}
              alt={restaurant.title}
              width={185}
              height={149}
            />
            {/* Later add more details about the restaurant, such as description, mapURL, etc in the next Description page. */}
          </li>
        ))}
      </ul>
    </div>
  );
}
