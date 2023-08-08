import React from "react";
import styled from "styled-components";
import RandomButton from "../../../components/RandomButton";
import { useState, useEffect } from "react";

const Title = styled.h1`
  text-align: center;
  font-size: 23px;
  color: #f2500a;
  /* margin-right: 150px; */
  font-weight: 400;
`;

const RandomTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const RandomTitleText = styled.div`
  font-size: 17px;
  margin-bottom: 15px;
  color: #555555;
`;

export default function RandomSpot() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <Title>Feeling Indecisive?</Title>
      {isClient ? (
        <RandomTitleContainer>
          <RandomTitleText>
            Let our randomizer help you discover your next favorite spot!
          </RandomTitleText>
          <RandomButton />
        </RandomTitleContainer>
      ) : (
        "Pre-rendered"
      )}
    </div>
  );
}
