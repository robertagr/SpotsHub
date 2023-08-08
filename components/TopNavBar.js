import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import { LiaPizzaSliceSolid, LiaCocktailSolid } from "react-icons/lia";
import styled from "styled-components";
// import Image from "next/image";
import { Roboto_Serif } from "next/font/google";

const roboto = Roboto_Serif({
  weight: "900",
  subsets: ["latin"],
  style: ["normal"],
});

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
  margin-right: 0px;
`;

const IconsWrapper = styled.div`
  display: flex;
  margin-right: 30px;
`;

const LogoStyle = styled.div`
  color: #545454;
  border-color: rgb(233, 232, 232);
  border-radius: 19px;
  border-style: solid;
  transform: scale(0.7);
  padding: 0px 10px 0px 10px;
  margin-left: 10px;
`;

export default function TopNavBar() {
  const router = useRouter(); // Get the router object

  const isActiveRoute = (route) => {
    return router.pathname === route;
  };

  return (
    <NavBar>
      <LogoStyle>
        <h2 className={roboto.className}>spotshub</h2>
      </LogoStyle>

      <IconsWrapper>
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
      </IconsWrapper>
    </NavBar>
  );
}
