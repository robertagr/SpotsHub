import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import FavoriteButton from "../../../../../components/FavoriteButton";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import styles from "../../../index.module.css";

export default function Bar({ favoriteSpots }) {
  const router = useRouter();
  const { id } = router.query;

  const { data: selectedBar } = useSWR(`/api/restaurants/${id}`);

  // const selectedBar = spots?.find((bar) => bar.title === id);

  // const isFavorite = favoriteSpots.find((rest) => rest === selectedBar?._id);

  if (!selectedBar) {
    return <div>Loading...</div>;
  }

  // const HeartButton = styled.button`
  //   border: none;
  //   background-color: transparent;
  //   cursor: pointer;
  //   outline: none;
  // `;

  // const HeartIcon = styled(isFavorite ? VscHeartFilled : VscHeart)`
  //   font-size: 30px;
  //   color: ${(props) => (props.isFavorite ? "red" : "black")};
  // `;

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>{selectedBar.title}</h1>
      <Image
        src={selectedBar.image}
        alt={selectedBar.title}
        width={336}
        height={327}
      />
      {/* <div>{selectedBar.tags.join(" ")}</div> */}
      <div>
        <Link href={selectedBar.mapURL}>Location</Link>
      </div>
      <div className={`${styles.heartButton}`}>
        <FavoriteButton
          spotId={selectedBar._id}
          favoriteSpots={favoriteSpots}
        />
      </div>
      <p>{selectedBar.description}</p>
      <Link href={`/drink/spots/${selectedBar.beverageCategory}`}>
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
