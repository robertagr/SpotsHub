import Link from "next/link";

export default function TopNavBar() {
  return (
    <ul>
      <li>
        <Link href="/">Eat</Link>
      </li>
      <li>
        <Link href="/drinkCategory">Drink</Link>
      </li>
    </ul>
  );
}
