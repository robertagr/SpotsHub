import React, { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import styled from "styled-components";

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

const FavoriteButton = ({ spotId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle the click on the favorite button
  const handleFavoriteClick = async () => {
    try {
      // Make a POST request to your API endpoint to add or remove the spot from favorites
      const res = await fetch(`/api/favorites/${spotId}`, {
        method: isFavorite ? "DELETE" : "POST",
        credentials: "same-origin",
      });

      if (res.ok) {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
      }
    } catch (error) {
      console.error("Error handling favorites:", error);
    }
  };

  return (
    <HeartButton onClick={handleFavoriteClick}>
      <HeartIcon isFavorite={isFavorite} />
    </HeartButton>
  );
};

export default FavoriteButton;
