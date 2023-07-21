import React, { useState } from "react";
import { useSpotStore } from "../public/stores/spotStore";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function RandomSpots() {
  const { spots } = useSpotStore();

  // State variable to store the random spot
  const [randomSpot, setRandomSpot] = useState(null);

  // Function to get a random spot
  const getRandomSpot = () => {
    const totalSpots = spots.length;
    const randomIndex = Math.floor(Math.random() * totalSpots);
    const randomSpot = spots[randomIndex];
    setRandomSpot(randomSpot);
  };

  const Button = styled.button`
    border-radius: 20px;
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

    h2 {
      text-align: center;
      position: absolute;
      color: white;
      text-shadow: 2px 2px black;
      transform: translateX(120px);
      font-size: x-large;
    }
  `;

  return (
    <ButtonContainer>
      <Button onClick={getRandomSpot}>Click me!</Button>
      {randomSpot && (
        <section>
          <a key={randomSpot._id}>
            <Link href={`/drink/spots/bar/${randomSpot.title}`}>
              <h2>{randomSpot.title}</h2>
              <Image
                src={randomSpot.image}
                alt={randomSpot.title}
                width={340}
                height={280}
              />
            </Link>
          </a>
        </section>
      )}
    </ButtonContainer>
  );
}
