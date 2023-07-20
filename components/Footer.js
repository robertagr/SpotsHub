import Link from "next/link";

export default function Footer() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="">Profile</Link>
      </li>
      <li>
        <Link href="/randomSpot">Game</Link>
      </li>
    </ul>
  );
}
