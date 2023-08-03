import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useSWR from "swr";
import FavoriteButton from "../../../../components/FavoriteButton";
import styles from "../../index.module.css";
import FilterTags from "../../../../components/FilterTags";

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
      <div>
        <Link href={selectedRestaurant.mapURL}>Location</Link>
      </div>
      <div>{selectedRestaurant.tags}</div>
      <div className={`${styles.heartButton}`}>
        <FavoriteButton
          spotId={selectedRestaurant._id}
          // favoriteSpots={favoriteSpots}
          // onFavoriteChange={onFavoriteChange}
        />
      </div>
      <p>{selectedRestaurant.description}</p>
      
      <Link href={`/spots/${selectedRestaurant.restaurantCategory}`}>
        <div className={`${styles.styledIcons}`}>
          <IoArrowBackCircleOutline
            className={`${styles.textBlack}`}
            fontSize={30}
          />
        </div>
      </Link>
    </div>
  );
}
