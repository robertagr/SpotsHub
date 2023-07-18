import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/restaurants", { fallbackData: [] });
  // console.log({ data });
  return (
    <div>
      <h1>Restaurant Categories</h1>
      <ul>
        {data.map((category) => (
          <li key={category._id}>
            <Link href={`/categories/${category._id}`}>
              <>{category.category}</>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
