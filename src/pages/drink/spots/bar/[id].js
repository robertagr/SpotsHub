import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import FavoriteButton from "../../../../../components/FavoriteButton";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import styles from "../../../index.module.css";


const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; 

`;

const Tag = styled.span`
  font-size: 12px; 
  padding: 3px 8px; 
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`;



export default function Bar() {
  const router = useRouter();
  const { id } = router.query;

  const { data: selectedBar } = useSWR(`/api/restaurants/${id}`);

  if (!selectedBar) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container}`}>
      <h1 className={`${styles.title}`}>{selectedBar.title}</h1>
      <Image
        src={selectedBar.image}
        alt={selectedBar.title}
        width={336}
        height={327}
      />
      <StyledTags>
        {selectedBar.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </StyledTags>    
      <div>
        <Link href={selectedBar.mapURL}>Location</Link>
      </div>
      <div className={`${styles.heartButton}`}>
        <FavoriteButton
          spotId={selectedBar._id}
          // favoriteSpots={favoriteSpots}
          // onFavoriteChange={onFavoriteChange}
        />
      </div>
      <p>{selectedBar.description}</p>
      {/* <Link href={`/drink/spots/${selectedBar.beverageCategory}`}>
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
