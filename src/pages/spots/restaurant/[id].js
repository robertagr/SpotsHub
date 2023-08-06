import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import FavoriteButton from "../../../../components/FavoriteButton";
import styles from "../../index.module.css";
import { MdLocationPin } from "react-icons/md";

const ImageStyled = styled(Image)`
  margin-top: 20px;
  position: relative;
`;

//  rgb(233, 232, 232) COLOR BORDER ICON LOCATION

const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 30px;
`;

const LocationIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 100px;
  margin-right: 210px;
  background-color: #f2f2f2;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const FavoriteButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1;
`;

const LocationIcon = styled(MdLocationPin)`
  font-size: 20px;
  color: #888; /* Grey color for the icon */
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 3px 8px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const DescriptionTitle = styled.h4`
  margin: 37px 0px 0px 25px;
  margin-top: 10px;
`;

const DescriptionText = styled.p`
  margin: 2px 20px 2px 22px;
  margin-top: 0px;
  text-align: left;
`;

const DescriptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin: 0;
  margin-left: 10px;
  margin-bottom: 15px;
  margin-right: 25px;
`;

export default function Restaurant({ favoriteSpots, onFavoriteChange }) {
  const router = useRouter();
  const { id } = router.query;
  const { data: selectedRestaurant } = useSWR(`/api/restaurants/${id}`);

  // const { spots } = useSpotStore();

  // const selectedRestaurant = spots?.find(
  //   (restaurant) => restaurant.title === id
  // );

  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container}`}>
      <ImageStyled
        src={selectedRestaurant.image}
        alt={selectedRestaurant.title}
        width={336}
        height={327}
      />
      <InfoContainer>
        <h1 className={`${styles.title}`}>{selectedRestaurant.title}</h1>
        <StyledTags>
          {selectedRestaurant.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </StyledTags>
        <Link href={selectedRestaurant.mapURL}>
          <LocationIconContainer>
            <LocationIcon fontSize={30} />
          </LocationIconContainer>
        </Link>

        <div className={`${styles.heartButton}`}>
          <FavoriteButton
            spotId={selectedRestaurant._id}
            favoriteSpots={favoriteSpots}
            onFavoriteChange={onFavoriteChange}
          />
        </div>
        <></>
        <DescriptionWrap>
          <DescriptionTitle>Description</DescriptionTitle>
          <DescriptionText>{selectedRestaurant.description}</DescriptionText>
        </DescriptionWrap>
      </InfoContainer>
    </div>
  );
}
