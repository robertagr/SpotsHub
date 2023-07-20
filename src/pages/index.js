import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../public/stores/restaurantStore";
import styled from "styled-components";
import useSWR from "swr";

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
`;

export default function Home() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  const setData = useSpotStore((state) => state.setData);
  setData(data);

  const categories = [
    ...new Set(
      data.map((restaurantCategory) => restaurantCategory.restaurantCategory)
    ),
  ];

  return (
    <div>
      <Title className="title">Restaurant Categories</Title>
      <Container>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/spots/${category}`}>
              <li className="photo-name">{category}</li>
              <Image
                src={`/restaurantImages/${category}.jpg`}
                alt="Pasta"
                width={140}
                height={170}
              />
            </Link>
          </li>
        ))}
      </Container>
    </div>
  );
}
