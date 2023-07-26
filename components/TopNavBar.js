import Link from "next/link";
import { LiaPizzaSliceSolid, LiaCocktailSolid } from "react-icons/lia";
import styled from "styled-components";

const StyledIcons = styled.div`
  color: black;

  &:hover {
    color: #f2500a;
  }

  &:active {
    color: #f2500a;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-block-end: 1px solid rgb(160, 156, 156);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

export default function TopNavBar() {
  return (
    <NavBar>
      <IconContainer>
        <Link href="/">
          <StyledIcons>
            <LiaPizzaSliceSolid fontSize={30} />
          </StyledIcons>
        </Link>
      </IconContainer>
      <IconContainer>
        <Link href="/drink">
          <StyledIcons>
            {" "}
            <LiaCocktailSolid fontSize={30} />
          </StyledIcons>
        </Link>
      </IconContainer>
    </NavBar>
  );
}
