import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../public/stores/spotStore";
import styled from "styled-components";

export default function ListPage() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);

  const selectedRestaurantCategory = spots.filter(
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

  const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    list-style-type: none;
  `;

  const CategoryContainer = styled.div`
    position: relative;
  `;

  return (
    <div>
      <Title>{detailsList} </Title>
      <Container>
        {selectedRestaurantCategory.map((restaurant) => (
          <CategoryContainer key={restaurant._id}>
            <Link href={`/spots/restaurant/${restaurant.title}`}>
              <h2 className="photo-name">{restaurant.title}</h2>
              <Image
                src={restaurant.image}
                alt={restaurant.title}
                width={320}
                height={130}
              />
            </Link>
          </CategoryContainer>
        ))}
      </Container>
    </div>
  );
}
