// import UserProfile from "../../components/UserProfile";
import FavoriteButton from "../../../components/FavoriteButton";
import Login from "../../../components/Login";
import { useSpotStore } from "../../../public/stores/spotStore";

export default function ProfilePage() {
  const { favoriteSpots } = useSpotStore();

  return (
    <div>
      <Login />
      {/* <UserProfile /> */}
      <FavoriteButton favoriteSpots={favoriteSpots} />
      {/* Altri componenti del profilo, se necessario */}
    </div>
  );
}
