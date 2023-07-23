import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useSpotStore } from "../../../../../public/stores/spotStore";

export default function Bar() {
  const router = useRouter();
  const { id } = router.query;

  const { spots, favoriteSpots, toggleFavorite } = useSpotStore();

  const selectedBar = spots?.find((bar) => bar.title === id);

  const isFavorite = favoriteSpots.find((rest) => rest === selectedBar?._id);

  if (!selectedBar) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{selectedBar.title}</h2>
      <Image
        src={selectedBar.image}
        alt={selectedBar.title}
        width={336}
        height={327}
      />
      {/* <div>{selectedBar.tags.join(" ")}</div> */}
      <div>
        <Link href={selectedBar.mapURL}>Location</Link>
      </div>
      <Link href={`/drink/spots/${selectedBar.beverageCategory}`}>Go Back</Link>
      <p>{selectedBar.description}</p>
      <button onClick={() => toggleFavorite(selectedBar._id)}>
        {isFavorite ? "❤️" : "🖤"}
      </button>
    </div>
  );
}
