import React, { useState, useEffect, Children } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr"
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton.js";
import Image from "next/image.js";

const FavWrapper = styled.div`
overflow: auto;
height: 450px; /* Add a fixed height here (adjust as needed) */

`;

const Container = styled.div`
display: flex;
flex-wrap: wrap;
flex-direction: column;
align-items: center;
gap: 15px;
list-style-type: none;
margin: 20px;
`;

export default function ProfilePage()  {
  const { data: sessionData } = useSession();
  console.log(sessionData);
  
  const { data, error, isLoading } = useSWR(`/api/favorites/${sessionData.user._id}`, {
      fallbackData: [],
    });
   
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching favorite spots: {error}</div>;
  }


  const handleToggleFavorite = async (spotId) => {
    try {
      const res = await fetch(`/api/favorites/spotId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spotId, userId: sessionData.user._id }),
      });
    } catch (error) {
      console.error("Error toggling favorite spot:", error);
    }
  };
 

console.log(data)

const uniqueSpotIds = [];
  
return (
  <FavWrapper>
    <Container>
    <h2>My Favorite Spots</h2>
        {data.map((spot) => {
          if (!spot.spotId?._id || uniqueSpotIds.includes(spot.spotId._id)) {
            // If spotId doesn't exist or is already in the array, skip rendering
            return null;
          }
          // If not, add it to the array and render the spot
          uniqueSpotIds.push(spot.spotId._id);
          return (
            <div key={spot._id}>
              {spot.spotId.title}
              <Image src={spot.spotId.image} alt={spot.spotId.title} width={220} height={130} />
              <FavoriteButton />
            </div>
          );
        })}
      </Container>
    </FavWrapper>
  );
}