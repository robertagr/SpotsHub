import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../public/stores/spotStore";
import styled from "styled-components";
import useSWR from "swr";
import "./index.module.css";
import { signIn, SignOut, useSession } from "next-auth/react";

const Title = styled.h1`
  color: gray;
  margin-left: 0px;
  font-size: 20px;
  font-weight: normal;
`;

const SubTitle = styled.p`
  margin-left: 0px;
  font-weight: bold;
`;
const TitleWrapper = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  letter-spacing: -0.3px;
  padding: 25px 10px 42px 6px;
  margin-left: 0px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px 15px;
  list-style-type: none;
  justify-items: center;
  margin: 20px;
  scale: 1.1;
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
  // const setData = useSpotStore((state) => state.setData);

  if (!data || isLoading || error) {
    return null;
  }

  // if (!session) {
  //   return <>
  //   <div>Please Log In</div>
  //   <button onClick={() => signIn()}>Sign in </button>
  //   </>;
  // }

  // setData(data);
  // console.log("data", data);

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
      <TitleWrapper>
        <Title className="title">Explore your next favorite </Title>
        <SubTitle>Food Spot</SubTitle>
      </TitleWrapper>
      <Container>
        {categories.map((category) => (
          <CategoryContainer key={category}>
            <Link href={`/spots/${category}`}>
              <li className="photo-name">{category}</li>
              <Image
                src={`/restaurantImages/${category}.jpg`}
                alt={category}
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
