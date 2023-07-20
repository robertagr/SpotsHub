import Link from "next/link";
import { LiaPizzaSliceSolid, LiaCocktailSolid } from "react-icons/lia";

export default function TopNavBar() {
  return (
    <nav>
      <li>
        <Link href="/">
          <LiaPizzaSliceSolid fontSize={30} />
        </Link>
      </li>
      <li>
        <Link href="/drink">
          {" "}
          <LiaCocktailSolid fontSize={30} />
        </Link>
      </li>
    </nav>
  );
}
