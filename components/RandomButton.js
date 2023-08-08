import React, { useState } from "react";
import { useSpotStore } from "../public/stores/spotStore";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function RandomSpots() {
  const { spots } = useSpotStore();
  const [randomSpot, setRandomSpot] = useState(null);

  // Function to get a random spot
  const getRandomSpot = () => {
    const totalSpots = spots.length;
    const randomIndex = Math.floor(Math.random() * totalSpots);
    const randomSpot = spots[randomIndex];
    setRandomSpot(randomSpot);
  };

  const Button = styled.button`
    border-radius: 10px;
    border: none;
    font-family: sans-serif;
    color: #ffffff;
    font-size: 15px;
    background: #f2500a;
    padding: 10px 20px 10px 20px;
    cursor: pointer;

    &:hover {
      background: #ff9875;
    }
    &:focus {
      background: #f2500a;
    }
  `;

  const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 10px 20px 20px 20px;
    position: relative;

    h2 {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      color: #545454;
      font-size: medium;
      text-decoration: none;
      background-color: rgba(255, 255, 255, 0.8);
      padding: 5px 10px;
      border-radius: 15px;
      width: 60%;
    }
  `;

  return (
    <ButtonContainer>
      <Button onClick={getRandomSpot}>Click me!</Button>
      {randomSpot && (
        <section>
          <div key={randomSpot._id}>
            <Link href={`/drink/spots/bar/${randomSpot.title}`}>
              <Image
                src={randomSpot.image}
                alt={randomSpot.title}
                width={280}
                height={250}
              />
            </Link>
            <h2>{randomSpot.title}</h2>
          </div>
        </section>
      )}
    </ButtonContainer>
  );
}
