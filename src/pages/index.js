import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../public/stores/spotStore";
import styled from "styled-components";
import useSWR from "swr";
import "./index.module.css"
// import Login from "../../components/Login";
import { signIn, SignOut, useSession } from "next-auth/react";


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
  justify-items: center;
  margin: 20px;
  overflow: scroll;
`;

const CategoryContainer = styled.div`
  position: relative;
  height: 200px;
`;

export default function Home() {
  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR("/api/restaurants", {
    fallbackData: [],
  });
  const setData = useSpotStore((state) => state.setData);

  if (!data || isLoading || error) {
    return null;
  }

  setData(data);
  console.log("data", data);


  
  const categories = [
    ...new Set(
      data
        .map((restaurantCategory) => restaurantCategory.restaurantCategory)
        .filter((item) => item !== undefined)
    ),
  ];
  // console.log("categories",categories);

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
