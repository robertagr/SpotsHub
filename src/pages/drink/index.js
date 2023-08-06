import React from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import styled from "styled-components";

export default function DrinkCategory() {
  const { data, error, isLoading } = useSWR("/api/restaurants", {
    fallbackData: [],
  });

  if (!data || isLoading || error) {
    return null;
  }

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

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
  `;

  const Container = styled.ul`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    list-style-type: none;
    justify-items: center;
    margin: 20px;
  `;

  const CategoryContainer = styled.div`
    position: relative;
  `;

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
