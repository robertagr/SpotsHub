import Link from "next/link";

export default function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="">Profile</Link>
      </li>
      <li>
        <Link href="">Game</Link>
      </li>
    </ul>
  );
}
