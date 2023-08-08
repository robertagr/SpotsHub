import React, { useState, useEffect, Children } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton.js";
import Image from "next/image.js";
import Link from "next/link.js";

const FavWrapper = styled.div`
  /* overflow: auto;
  height: 450px; */
`;

const Container = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 20px; */
  column-count: 2;
  column-gap: 17px;
  margin: 50px 20px 50px 20px;
  gap: 20px;
  margin: 20px;
`;

const FirstTitle = styled.h1`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-size: 25px; */
  margin-top: 20px;
  color: #444444;
  margin-right: 160px;
  font-size: 20px;
  font-weight: normal;
`;

const SubTitle = styled.h1`
  /* margin-left: 0px; */
  margin-right: 210px;
  font-weight: bold;
  color: #f2500a;
  font-weight: 350;
  font-size: 20px;
`;

const FirstTitleContainer = styled.div`
  margin-bottom: 20px; /* Add margin to create space between the title and images */
`;

const SpotContainer = styled.div`
  /* display: flex;
  width: 350px;
  border-radius: 20px;
  border-width: 1px;
  border-color: lightgray;
  background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  position: relative; /* Set the position to relative for the container */
`;

const OverlayContent = styled.div`
  /* position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center; */
`;

const SpotTitle = styled.h4`
  /* flex: 0.4; */
  /* text-align: center; */
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
    return <div>Error fetching favorite spots: {error.message}</div>;
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
      <Container>
        {data.map((spot) => {
          if (!spot.spotId?._id) {
            // If spotId doesn't exist, skip rendering
            return null;
          }
          return (
            <SpotContainer key={spot._id}>
              <Link href={`drink/spots/bar/${spot.spotId.title}`}>
                <Image
                  src={spot.spotId.image}
                  alt={spot.spotId.title}
                  width={"150"}
                  height={"180"}
                />
              </Link>
              <OverlayContent>
                <SpotTitle>{spot.spotId.title}</SpotTitle>
                <FavoriteButton
                  spotId={spot.spotId._id}
                  isFavorite={spot.isFavorite}
                  onFavoriteChange={handleFavoriteChange}
                />
              </OverlayContent>
            </SpotContainer>
          );
        })}
      </Container>
    </FavWrapper>
  );
}
