import React from "react";
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

export default function  FavoriteSpot({ spotId, isFavorite, onToggleFavorite }) {
  // Function to handle the click on the favorite button
  const { data: sessionData } = useSession();
  const [favoriteSpots, setFavoriteSpots] = useState([]);


  // Function to handle the click on the favorite button
  const handleFavoriteClick = async () => {
    try {
      // Make a POST request to your API endpoint to add or remove the spot from favorites
      const res = await fetch(`/api/favorites/spotId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spotId, userId: sessionData.user._id }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
        fetchFavoriteSpots(); // Fetch favorite spots after toggling
      }
    } catch (error) {
      console.error("Error handling favorites:", error);
    }
  };

  return (
    <div>
      <div>Spot ID: {spotId}</div>
      <h1>Hello Spots</h1>
      <HeartButton onClick={handleFavoriteClick}>
        <HeartIcon isFavorite={isFavorite} />
      </HeartButton>
    </div>
  );
}