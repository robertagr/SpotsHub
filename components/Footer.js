import Link from "next/link";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  border-radius: 9px;
  margin-top: auto;
  background: linear-gradient(
    to right,
    rgba(242, 80, 10, 0.5),
    rgba(222, 219, 122, 0.5)
  );
`;

export default function Footer() {
  return (
    <FooterContainer>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/randomSpot">Game</Link>
      </li>
      <li>
        <Link href="/map">Map</Link>
      </li>
    </FooterContainer>
  );
}
