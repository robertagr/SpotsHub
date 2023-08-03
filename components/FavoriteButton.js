import React, { useState, useEffect } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import styled from "styled-components";
import { useSession } from "next-auth/react";


const HeartButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;

const HeartIcon = styled(({ isFavorite, ...props }) =>
  isFavorite ? <VscHeartFilled {...props} /> : <VscHeart {...props} />
)`
  font-size: 30px;
  color: ${(props) => (props.isFavorite ? "red" : "black")};
`;
  
    const FavoriteButton = ({ spotId, onFavoriteChange  }) => {
      const { data: sessionData } = useSession();
      const [isFavorite, setIsFavorite] = useState(false);
    
      // Function to handle the click on the favorite button
      const handleFavoriteClick = async () => {
        try {
          if (isFavorite) {
            // Make a DELETE request to remove the spot from favorites
            const res = await fetch(`/api/favorites/${sessionData.user._id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ spotId,  userId: sessionData.user._id  }),
            });
    
            if (res.ok) {
              setIsFavorite(false);

              onFavoriteChange?.(spotId, false);

            }
          } else {
            // Make a POST request to add the spot to favorites
            const res = await fetch(`/api/favorites/spotId`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ spotId, userId: sessionData.user._id }),
            });
    
            if (res.ok) {
              setIsFavorite(true);
              onFavoriteChange?.(spotId, true);

            }
          }
        } catch (error) {
          console.error("Error handling favorites:", error);
        }
      };
    
      // Fetch favorite status on component mount
      useEffect(() => {
        if (!sessionData?.user?._id){
          return
        }
        const fetchFavoriteStatus = async () => {
          try {
            const res = await fetch(`/api/favorites/${sessionData.user._id}`);
            if (!res.ok) {
              throw new Error("Error fetching favorite spots.");
            }
            const favoriteData = await res.json();
            const isSpotFavorite = favoriteData.some((spot) => spot.spotId?._id === spotId);
            setIsFavorite(isSpotFavorite);
          } catch (error) {
            console.error("Error fetching favorite status:", error);
          }
        };
        fetchFavoriteStatus();
      }, [spotId, sessionData]);
    
      return (
        <HeartButton onClick={handleFavoriteClick}>
          <HeartIcon isFavorite={isFavorite} />
        </HeartButton>
      );
    };
    
    export default FavoriteButton;