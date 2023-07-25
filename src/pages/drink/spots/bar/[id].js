import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSpotStore } from "../../../../../public/stores/spotStore";
import styled from "styled-components";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

export default function Bar() {
  const router = useRouter();
  const { id } = router.query;

  const { spots, favoriteSpots, toggleFavorite } = useSpotStore();

  const selectedBar = spots?.find((bar) => bar.title === id);

  const isFavorite = favoriteSpots.find((rest) => rest === selectedBar?._id);

  if (!selectedBar) {
    return <div>Loading...</div>;
  }

  const Title = styled.h1`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: sans-serif;
    color: black;
    font-size: 20px;
    letter-spacing: -0.3px;
    padding: 25px 0px 0px 0px;
  `;

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  `;

  const StyledIcons = styled.div`
    color: black;

    &:hover {
      color: #f2500a;
    }

    &:active {
      color: #f2500a;
    }
  `;

  const HeartButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
  `;

  const HeartIcon = styled(isFavorite ? VscHeartFilled : VscHeart)`
    font-size: 30px;
    color: ${(props) => (props.isFavorite ? "red" : "black")};
  `;

  return (
    <Container>
      <Title>{selectedBar.title}</Title>
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
      <HeartButton onClick={() => toggleFavorite(selectedBar._id)}>
        <HeartIcon isFavorite={isFavorite} />
      </HeartButton>
      <p>{selectedBar.description}</p>
      <Link href={`/drink/spots/${selectedBar.beverageCategory}`}>
        <StyledIcons>
          <IoArrowBackCircleOutline fontSize={30} />
        </StyledIcons>
      </Link>
    </Container>
  );
}
