import React from "react";
import styled from "styled-components";
import RandomButton from "../../../components/RandomButton";
import { useState, useEffect } from "react";

const PageContainer = styled.div`
  padding: 25px 10px 20px 10px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  gap: 5px;
  justify-content: center;
  min-height: 600px;
  background: linear-gradient(
    135deg,
    rgb(255 149 103 / 75%),
    rgb(255 255 255 / 75%)
  );
`;

const Title = styled.h1`
  text-align: center;
  font-size: 23px;
  color: #2a2a2a;
`;

const RandomTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 100%;
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
    <PageContainer>
      <Title>Feeling Indecisive?</Title>
      {isClient ? (
        <RandomTitleContainer>
          <RandomTitleText>
            Let our randomizer help you discover your next favorite spot!
          </RandomTitleText>
          {/* <RandomBox></RandomBox> */}
          <RandomButton />
        </RandomTitleContainer>
      ) : (
        "Pre-rendered"
      )}
    </PageContainer>
  );
}
