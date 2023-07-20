import React from "react";
import Link from "next/link";
import Image from "next/image";
import RandomButton from "../../../components/RandomButton";

export default function RandomSpot() {
  return (
    <div>
      <h1>Time to choose!</h1>
      <p>
        {" "}
        Too many cool places and don't know where to go? Just click the button
        below, and let the button decide for you!
        <RandomButton></RandomButton>
      </p>
    </div>
  );
}
