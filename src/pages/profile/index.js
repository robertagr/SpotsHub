import LoginButton from "../../../components/LoginButton";
import FavoriteSpot from "../../../components/FavoriteSpot";
import styled from "styled-components";

const ProfileContainer = styled.div`
  overflow: auto;
  height: 100;
`;

export default function ProfilePage() {
  return (
    <ProfileContainer>
      <LoginButton />
      <FavoriteSpot />
    </ProfileContainer>
  );
}
