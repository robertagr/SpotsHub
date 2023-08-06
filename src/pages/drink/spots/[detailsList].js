import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useSpotStore } from "../../../../public/stores/spotStore";
import styled from "styled-components";
import FavoriteButton from "../../../../components/FavoriteButton";

export default function DrinkSpotsList() {
  const router = useRouter();
  const { detailsList } = router.query;
  const spots = useSpotStore((state) => state.spots);

  const selectedDrinkCategory = spots.filter(
    (spot) => spot.beverageCategory === detailsList
  );

  if (!spots || !detailsList) {
    return <h3>Loading...</h3>;
  }

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
    padding: 25px 10px 9px 15px;
    margin-left: 18px;
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

  const DetailsListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
  `;

  const Container = styled.ul`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    list-style-type: none;
    margin: 30px;
  `;

  const CategoryContainer = styled.div`
    position: relative;
  `;

  //   return (
  //     <div>
  //       <Title>{detailsList}</Title>
  //       <Container>
  //         {selectedDrinkCategory.map((spot) => (
  //           <CategoryContainer key={spot._id}>
  //             <Link href={`/drink/spots/bar/${spot.title}`}>
  //               <h2 className="photo-name">{spot.title}</h2>
  //               <Image
  //                 src={spot.image}
  //                 alt={spot.title}
  //                 width={320}
  //                 height={130}
  //               />
  //             </Link>
  //           </CategoryContainer>
  //         ))}
  //       </Container>
  //     </div>
  //   );
  // }

  return (
    <DetailsListWrapper>
      <TitleWrapper>
        <Title className="title">Now, find your </Title>
        <SubTitle>{detailsList} Spot</SubTitle>
      </TitleWrapper>
      <Container>
        {selectedDrinkCategory.map((spot) => (
          <CategoryContainer key={spot._id}>
            <ImageContainer>
              <Link href={`/drink/spots/bar/${spot.title}`}>
                <Image
                  src={spot.image}
                  alt={spot.title}
                  width={320}
                  height={130}
                />
              </Link>
              <TitleContainer>
                <TitleBelowImage>{spot.title}</TitleBelowImage>
                <FavoriteContainer>
                  <FavoriteButton spotId={spot._id} />
                </FavoriteContainer>
              </TitleContainer>
            </ImageContainer>
          </CategoryContainer>
        ))}
      </Container>
    </DetailsListWrapper>
  );
}
