import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      {/* <li>
        <Link href="/art-pieces">Profile</Link>
      </li>
      <li>
        <Link href="/favorites">Game</Link>
      </li> */}
    </ul>
  );
}
