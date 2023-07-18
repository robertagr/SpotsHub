import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  const categories = [...new Set(data.map((category) => category.category))];
  return (
    <div>
      <h1>Restaurant Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link href={`/categories/${category}`}>
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
