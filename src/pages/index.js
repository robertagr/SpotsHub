import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../public/stores/restaurantStore";
import styled from "styled-components";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  const setData = useSpotStore((state) => state.setData);
  setData(data);

  const categories = [
    ...new Set(
      data.map((restaurantCategory) => restaurantCategory.restaurantCategory)
    ),
  ];

  const Title = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    text-align: center;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.3px;
  `;

  const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    list-style-type: none;
  `;

  return (
    <div>
      <Title>Restaurant Categories</Title>
      <Container>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/spots/${category}`}>
              <li>{category}</li>
              <li>
                <Image
                  src={`/restaurantImages/${category}.jpg`}
                  alt="Pasta"
                  width={120}
                  height={120}
                />
              </li>
            </Link>
          </li>
        ))}
      </Container>
    </div>
  );
}
