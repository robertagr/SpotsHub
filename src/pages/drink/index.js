import React from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import styled from "styled-components";

export default function DrinkCategory() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });

  const categories = [
    ...new Set(
      data
        .map((beverageCategory) => beverageCategory.beverageCategory)
        .filter((item) => item !== undefined)
    ),
  ];

  const Title = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* font-family: Montserrat; */
    font-size: 20px;
    letter-spacing: -0.3px;
    padding: 20px;
  `;

  const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    list-style-type: none;
    margin: 30px;
  `;

  const CategoryContainer = styled.div`
    position: relative;
  `;

  return (
    <div>
      <Title>Drink Category</Title>
      <Container>
        {categories.map((beverageCategory) => (
          <CategoryContainer key={beverageCategory}>
            <Link href={`/drink/spots/${beverageCategory}`}>
              <li className="photo-name"> {beverageCategory}</li>
              <Image
                src={`/drinkImages/${beverageCategory}.jpg`}
                alt={beverageCategory}
                width={140}
                height={190}
              />
            </Link>
          </CategoryContainer>
        ))}
      </Container>
    </div>
  );
}
