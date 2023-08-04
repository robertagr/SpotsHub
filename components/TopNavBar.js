import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import { LiaPizzaSliceSolid, LiaCocktailSolid } from "react-icons/lia";
import styled from "styled-components";

const StyledIcons = styled.div`
  color: ${(props) => (props.active ? "#f2500a" : "black")};

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
  border-block-end: 1px solid rgb(233, 232, 232);
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

export default function TopNavBar() {
  const router = useRouter(); // Get the router object

  const isActiveRoute = (route) => {
    return router.pathname === route;
  };

  return (
    <NavBar>
      <IconContainer>
        <Link href="/">
          <StyledIcons active={isActiveRoute("/")}>
            <LiaPizzaSliceSolid fontSize={30} />
          </StyledIcons>
        </Link>
      </IconContainer>
      <IconContainer>
        <Link href="/drink">
          <StyledIcons active={isActiveRoute("/drink")}>
            <LiaCocktailSolid fontSize={30} />
          </StyledIcons>
        </Link>
      </IconContainer>
    </NavBar>
  );
}