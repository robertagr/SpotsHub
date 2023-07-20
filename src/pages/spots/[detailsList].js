import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../public/stores/restaurantStore";
import styled from "styled-components";

export default function ListPage() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);

  const filteredRestaurants = spots.filter(
    (restaurant) => restaurant.restaurantCategory === detailsList
  );

  const Title = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
    color: #f2500a;
    font-size: 20px;
    letter-spacing: -0.3px;
    padding: 20px;
  `;

  return (
    <div>
      <Title>{detailsList} </Title>
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
