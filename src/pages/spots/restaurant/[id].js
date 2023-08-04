import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useSWR from "swr";
import FavoriteButton from "../../../../components/FavoriteButton";
import styles from "../../index.module.css";


const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 

`;

const Tag = styled.span`
  font-size: 14px; 
  padding: 3px 8px; 
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`;

export default function Restaurant() {
  const router = useRouter();
  const { id } = router.query;
  const { data: selectedRestaurant } = useSWR(`/api/restaurants/${id}`);


  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>{selectedRestaurant.title}</h1>
      <Image
        src={selectedRestaurant.image}
        alt={selectedRestaurant.title}
        width={336}
        height={327}
      />
            <StyledTags>
        {selectedRestaurant.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </StyledTags>    
      <div>
        <Link href={selectedRestaurant.mapURL}>Location</Link>
      </div>
      <div className={`${styles.heartButton}`}>
        <FavoriteButton
          spotId={selectedRestaurant._id}
          // favoriteSpots={favoriteSpots}
          // onFavoriteChange={onFavoriteChange}
        />
      </div>
      <p>{selectedRestaurant.description}</p>
      
      {/* <Link href={`/spots/${selectedRestaurant.restaurantCategory}`}>
        <div className={`${styles.styledIcons}`}>
          <IoArrowBackCircleOutline
            className={`${styles.textBlack}`}
            fontSize={30}
          />
        </div>
      </Link> */}
    </div>
  );
}
