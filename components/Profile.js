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

console.log(data)

  

return (
    <FavWrapper>
      <Container>
        <h2>My Favorite Spots</h2>
        {data.map((spot) => {
          if (!spot.spotId?._id) {
            // If spotId doesn't exist, skip rendering
            return null;
          }
          return (
            <div key={spot._id}>
              {spot.spotId.title}
              <Image
                src={spot.spotId.image}
                alt={spot.spotId.title}
                width={220}
                height={130}
              />
              <FavoriteButton
                spotId={spot.spotId._id}
                isFavorite={spot.isFavorite}
                onFavoriteChange={handleFavoriteChange}
              />
            </div>
          );
        })}
      </Container>
    </FavWrapper>
  );
}