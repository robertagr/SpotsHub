// import FavoriteButton from "../../../components/FavoriteButton";
import LoginButton from "../../../components/LoginButton";
import Profile from "../../../components/Profile";

export default function ProfilePage({ favoriteSpots}) {
console.log(favoriteSpots);
  return (
    <div>
      <LoginButton />
      <Profile/> 
    </div>
  );
}
