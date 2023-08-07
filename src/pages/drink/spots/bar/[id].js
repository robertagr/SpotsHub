import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import FavoriteButton from "../../../../../components/FavoriteButton";
import styles from "../../../index.module.css";
import { MdLocationPin } from "react-icons/md";

const ImageStyled = styled(Image)`
  position: relative;
`;

const ImageStyledContainer = styled.div`
  position: relative;
`;

const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 30px;
  margin-right: 25px;
`;

const LocationIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f2f2f2;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  z-index: 1;
  &:hover {
    background-color: #fcbf8d;
  }
`;

const FavoriteButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  z-index: 1;
  background-color: #f2f2f2;
  font-size: 4px;
  &:hover {
    background-color: #fcbf8d;
  }
`;

const FavoriteButtonInnerContainer = styled.div`
  /* Add smaller size and padding to make the heart icon container smaller */
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  scale: 0.7;
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
  color: gray;
`;

const DescriptionText = styled.p`
  margin: 2px 20px 2px 25px;
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

export default function Bar() {
  const router = useRouter();
  const { id } = router.query;

  const { data: selectedBar } = useSWR(`/api/restaurants/${id}`);

  if (!selectedBar) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.container}`}>
      <ImageStyledContainer>
        <ImageStyled
          src={selectedBar.image}
          alt={selectedBar.title}
          width={336}
          height={327}
        />
        <LocationIconContainer>
          <Link href={selectedBar.mapURL}>
            <LocationIcon fontSize={30} />
          </Link>
        </LocationIconContainer>

        <FavoriteButtonContainer>
          <FavoriteButtonInnerContainer>
            <FavoriteButton spotId={selectedBar._id} />
          </FavoriteButtonInnerContainer>
        </FavoriteButtonContainer>
      </ImageStyledContainer>

      <InfoContainer>
        <h1 className={`${styles.title}`}>{selectedBar.title}</h1>
        <StyledTags>
          {selectedBar.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </StyledTags>

        <></>
        <DescriptionWrap>
          <DescriptionTitle>Description</DescriptionTitle>
          <DescriptionText>{selectedBar.description}</DescriptionText>
        </DescriptionWrap>
      </InfoContainer>
    </div>
  );
}

//   return (
//     <div className={`${styles.container}`}>
//       <h1 className={`${styles.title}`}>{selectedBar.title}</h1>
//       <Image
//         src={selectedBar.image}
//         alt={selectedBar.title}
//         width={336}
//         height={327}
//       />
//       <StyledTags>
//         {selectedBar.tags.map((tag, index) => (
//           <Tag key={index}>{tag}</Tag>
//         ))}
//       </StyledTags>
//       <div>
//         <Link href={selectedBar.mapURL}>Location</Link>
//       </div>
//       <div className={`${styles.heartButton}`}>
//         <FavoriteButton
//           spotId={selectedBar._id}
//           // favoriteSpots={favoriteSpots}
//           // onFavoriteChange={onFavoriteChange}
//         />
//       </div>
//       <p>{selectedBar.description}</p>
//       {/* <Link href={`/drink/spots/${selectedBar.beverageCategory}`}>
//         <div className={`${styles.styledIcons}`}>
//           <IoArrowBackCircleOutline
//             className={`${styles.textBlack}`}
//             fontSize={30}
//           />
//         </div>
//       </Link> */}
//     </div>
//   );
// }
