import React from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";

export default function DrinkCategory() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  console.log(data);

  const categories = [
    ...new Set(
      data
        .map((beverageCategory) => beverageCategory.beverageCategory)
        .filter((item) => item !== undefined)
    ),
  ];

  return (
    <div>
      <h1>Drink Category</h1>
      <ul>
        {categories.map((beverageCategory) => (
          <li key={beverageCategory}>
            <Link href={`/drinkCategory/${beverageCategory}`}>
              <li>
                <Image
                  src={`/drinkImages/${beverageCategory}.jpg`}
                  alt={beverageCategory}
                  width={185}
                  height={149}
                />
                {beverageCategory}
              </li>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
