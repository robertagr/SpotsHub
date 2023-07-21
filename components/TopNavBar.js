import Link from "next/link";
import { LiaPizzaSliceSolid, LiaCocktailSolid } from "react-icons/lia";
import styled from "styled-components";

const StyledIcons = styled.div`
  color: black;
  /* flex-shrink: 0; */

  &:hover {
    color: #f2500a;
    background-color: #ececec;
    padding: 6px;
    border-radius: 30px;
  }

  &:active {
    color: #f2500a;
  }
`;

export default function TopNavBar() {
  return (
    <nav>
      <Link href="/">
        <StyledIcons>
          <LiaPizzaSliceSolid fontSize={30} />
        </StyledIcons>
      </Link>
      <Link href="/drink">
        <StyledIcons>
          {" "}
          <LiaCocktailSolid fontSize={30} />
        </StyledIcons>
      </Link>
    </nav>
  );
}
