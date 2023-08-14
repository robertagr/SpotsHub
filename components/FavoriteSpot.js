import React, { useState, useEffect, Children } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton.js";
import Image from "next/image.js";
import Link from "next/link.js";

const FavWrapper = styled.div`
  overflow: auto;
  margin: 0px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  /* margin: 20px; */
  margin: 0px 20px 0px 5px;
`;

const FirstTitle = styled.h1`
  margin-top: 20px;
  color: #444444;
  margin-right: 160px;
  font-size: 20px;
  font-weight: normal;
`;

const SubTitle = styled.h1`
  margin-right: 210px;
  font-weight: bold;
  color: #f2500a;
  font-weight: 350;
  font-size: 20px;
`;

const FirstTitleContainer = styled.div`
  margin-bottom: 33px;
  margin-right: 40px;
  margin: 0px 70px 30px 0px;
`;

const SpotContainer = styled.div`
  border-radius: 20px;
  border-style: solid;
  border-color: lightgray;
  border-width: 0.4px;
  background-color: #fbfafa;
  width: 110%;
  display: flex;
  flex-direction: column;
  padding: 7px 0px 0px 0px;
  box-shadow: 1px 8px 10px rgb(1 1 0 / 7%);

  &:hover {
    box-shadow: 1px 8px 10px rgb(1 1 0 / 20%);
  }
`;

const TitleBelowImage = styled.h2`
  text-align: left;
  font-size: 15px;
  color: #333333;
  height: 25px;
  font-weight: 400;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row-reverse;
`;

const FavoriteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  /* margin-right: 0px; */
  font-size: 20px;
  scale: 0.8;
`;

export default function FavoriteSpot() {
  const { data: sessionData } = useSession();
  //   console.log(sessionData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data only if sessionData is available
    if (sessionData && sessionData.user && sessionData.user._id) {
      // console.log(sessionData);
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/favorites/${sessionData.user._id}`);
          if (!res.ok) {
            throw new Error("Error fetching favorite spots.");
          }
          const favoriteData = await res.json();
          setData(favoriteData);
          setIsLoading(false);
        } catch (error) {
          setError(error);
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [sessionData]);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFavoriteChange = (spotId, isFavorite) => {
    // Update the data state to reflect the favorite status change
    setData((prevData) => {
      // Remove the spot from data when it's marked as not favorite (isFavorite === false)
      if (!isFavorite) {
        return prevData.filter((spot) => spot.spotId?._id !== spotId);
      }
      return prevData;
    });
  };

  // console.log(data)

  return (
    <FavWrapper>
      <FirstTitleContainer>
        <FirstTitle>My Favorite</FirstTitle>
        <SubTitle> Spots</SubTitle>
      </FirstTitleContainer>
      <ImageContainer>
        {data.map((spot) => {
          if (!spot.spotId?._id) {
            // If spotId doesn't exist, skip rendering
            return null;
          }
          return (
            <Container key={spot._id}>
              <SpotContainer>
                <Link href={`drink/spots/bar/${spot.spotId.title}`}>
                  <Image
                    src={spot.spotId.image}
                    alt={spot.spotId.title}
                    width={150}
                    height={160}
                  />
                </Link>
                <TitleContainer>
                  <FavoriteButtonContainer>
                    <FavoriteButton
                      spotId={spot.spotId._id}
                      isFavorite={spot.isFavorite}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </FavoriteButtonContainer>
                  <TitleBelowImage>{spot.spotId.title}</TitleBelowImage>
                </TitleContainer>
              </SpotContainer>
            </Container>
          );
        })}
      </ImageContainer>
    </FavWrapper>
  );
}
