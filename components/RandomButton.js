import React, { useState } from "react";
import { useSpotStore } from "../public/stores/restaurantStore";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div>
      <button onClick={getRandomSpot}>Show Random Spot</button>
      {randomSpot && (
        <ul>
          <li key={randomSpot._id}>
            <Link href={`/drink/spots/bar/${randomSpot.title}`}>
              <h2>{randomSpot.title}</h2>
              <Image
                src={randomSpot.image}
                alt={randomSpot.title}
                width={185}
                height={149}
              />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
