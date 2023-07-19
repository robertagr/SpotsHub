import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  const categories = [
    ...new Set(
      data.map((restaurantCategory) => restaurantCategory.restaurantCategory)
    ),
  ];
  return (
    <div>
      <h1>Restaurant Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/restaurants/${category}`}>
              <li>{category}</li>
              <Image
                src={`/images/${category}.jpg`}
                alt="Pasta"
                width={185}
                height={149}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
