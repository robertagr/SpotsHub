import React from "react";
import styled from "styled-components";
import RandomButton from "../../../components/RandomButton";
import { useState, useEffect } from "react";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  color: #f2500a;
  align-items: center;
  /* font-family: Montserrat; */
  font-size: 20px;
  letter-spacing: -0.3px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style-type: none;
  justify-content: center;
`;

const Random = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  list-style-type: none;
  justify-content: center;
`;

export default function RandomSpot() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <Title>Time to choose!</Title>
      {isClient ? (
        <p>
          Too many cool places and don't know where to go? Just click the button
          below, and let the button decide for you!
          <RandomButton></RandomButton>
        </p>
      ) : (
        "Pre-rendered"
      )}
    </div>
  );
}
