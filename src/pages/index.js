import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../public/stores/spotStore";
import styled from "styled-components";
import useSWR from "swr";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  letter-spacing: -0.3px;
  padding: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  list-style-type: none;
  width: 80%;
  justify-items: center;
  margin: 20px;
`;

const CategoryContainer = styled.div`
  position: relative;
`;

export default function Home() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  const setData = useSpotStore((state) => state.setData);
  setData(data);

  const categories = [
    ...new Set(
      data
        .map((restaurantCategory) => restaurantCategory.restaurantCategory)
        .filter((item) => item !== undefined)
    ),
  ];

  return (
    <Wrapper>
      <Title className="title">Restaurant Categories</Title>
      <Container>
        {categories.map((category) => (
          <CategoryContainer key={category}>
            <Link href={`/spots/${category}`}>
              <h2 className="photo-name">{category}</h2>
              <Image
                src={`/restaurantImages/${category}.jpg`}
                alt={category}
                width={140}
                height={200}
              />
            </Link>
          </CategoryContainer>
        ))}
      </Container>
    </Wrapper>
  );
}
