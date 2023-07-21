import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../../public/stores/restaurantStore";
import styled from "styled-components";

export default function DrinkSpotsList() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);

  const [isClient, setIsClient] = useState(false);

  const filteredDrinkSpots = spots.filter(
    (spot) => spot.beverageCategory === detailsList
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <Title>{detailsList}</Title>
      {isClient ? (
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
      ) : (
        "Pre-rendered"
      )}
    </div>
  );
}
