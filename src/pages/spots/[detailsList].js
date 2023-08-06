import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../public/stores/spotStore";
import styled from "styled-components";
import FavoriteButton from "../../../components/FavoriteButton";

export default function ListPage() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);
  const selectedTags = useSpotStore((state) => state.selectedTags);

  if (!spots || !detailsList) {
    return <h3>Loading...</h3>;
  }

  const selectedRestaurantCategory = spots.filter(
    (restaurant) => restaurant.restaurantCategory === detailsList
  );

  // const Title = styled.h1`
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   font-family: sans-serif;
  //   color: #f2500a;
  //   font-size: 20px;
  //   letter-spacing: -0.3px;
  //   padding: 25px 0px 0px 0px;
  // `;

  const Title = styled.h1`
    color: gray;
    margin-left: 0px;
    font-size: 20px;
    font-weight: normal;
  `;

  const SubTitle = styled.p`
    margin-left: 0px;
    font-weight: bold;
    color: #f2500a;
    font-weight: 350;
  `;

  const TitleWrapper = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
    letter-spacing: -0.3px;
    padding: 25px 10px 9px 6px;
    margin-left: 18px;
  `;

  const CategoryContainer = styled.div`
    position: relative;
  `;

  const ImageContainer = styled.div`
    background-color: #fbfafa;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0px 4px 10px rgb(0 0 0 / 10%);
  `;

  const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const FavoriteContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 20px;
    scale: 0.8;
  `;

  const TitleBelowImage = styled.h2`
    text-align: left;
    font-size: 16px;
    color: black;
    height: 25px;
    margin: 15px 0px 0px 0px;
  `;

  const Link = styled.a`
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  `;

  const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    list-style-type: none;
    margin: 20px;
  `;

  const DetailsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
  `;

  return (
    <DetailsListWrapper>
      <TitleWrapper>
        <Title className="title">Now, find your </Title>
        <SubTitle>{detailsList} Spot</SubTitle>
      </TitleWrapper>
      <Container>
        {selectedRestaurantCategory.map((restaurant) => (
          <CategoryContainer key={restaurant._id}>
            <ImageContainer>
              <Link href={`/spots/restaurant/${restaurant.title}`}>
                <Image
                  src={restaurant.image}
                  alt={restaurant.title}
                  width={320}
                  height={130}
                />
              </Link>
              <TitleContainer>
                <TitleBelowImage>{restaurant.title}</TitleBelowImage>
                <FavoriteContainer>
                  <FavoriteButton spotId={restaurant._id} />
                </FavoriteContainer>
              </TitleContainer>
            </ImageContainer>
          </CategoryContainer>
        ))}
      </Container>
    </DetailsListWrapper>
  );
}
