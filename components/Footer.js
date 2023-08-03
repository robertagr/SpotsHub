import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {LiaHomeSolid, LiaUserSolid, LiaMap, LiaDiceD6Solid} from "react-icons/lia"
import { useRouter } from "next/dist/client/router";

const FooterContainer = styled.footer`
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  margin-top: auto;
  border-block-start: 1px solid rgb(233, 232, 232);
`;

const FooterItem = styled.li`
  list-style: none;
  padding: 2px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 20px;
  width: 70px;
  /* margin: 100px; */
  /* background-color: ${(props) => (props.active ? "#f2500a" : "transparent")}; */
  background: linear-gradient(90deg, transparent, transparent);
  background-size: 200% 100%;
  background-position: ${(props) => (props.active ? "100%" : "0%")};
  transition: background-position 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#f2500a" : "#f2500a40")};
  }

  /* Background color based on active state */
  background-color: ${(props) => (props.active ? "#f2500a" : "transparent")};

  /* Set icon color based on active state */
  svg {
    color: ${(props) => (props.active ? "#ffffff" : "#000000")};
  }

`;

export default function Footer() {
  const [activeItem, setActiveItem] = useState(null);


  const handleItemClick = (index, href) => {
    setActiveItem(index);
    if (href) {
      // Redirect to the link when an item is clicked
      window.location.href = href;
    }
  };


  return (
    <FooterContainer>
      <FooterItem className="footer-item" active={activeItem === 0} onClick={() => handleItemClick(0)}>
        <Link href="/">
          <LiaHomeSolid fontSize={26} />
        </Link>
      </FooterItem>
      <FooterItem className="footer-item" active={activeItem === 2} onClick={() => handleItemClick(2)}>
        <Link href="/randomSpot">
          <LiaDiceD6Solid fontSize={26} />
        </Link>
      </FooterItem>
      <FooterItem className="footer-item" active={activeItem === 3} onClick={() => handleItemClick(3)}>
        <Link href="/map">
          <LiaMap fontSize={26} />
        </Link>
      </FooterItem>
      <FooterItem className="footer-item" active={activeItem === 1} onClick={() => handleItemClick(1)}>
        <Link href="/profile">
          <LiaUserSolid fontSize={26} />
        </Link>
      </FooterItem>
    </FooterContainer>
  );
}




