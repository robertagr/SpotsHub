import LoginButton from "../../../components/LoginButton";
import FavoriteSpot from "../../../components/FavoriteSpot";
import styled from "styled-components";

const ProfileContainer = styled.div`
  overflow: auto;
  height: 100;
`;

const Separator = styled.div`
  border-block-end: 1px solid rgb(233, 232, 232);
`;
export default function ProfilePage() {
  return (
    <ProfileContainer>
      <LoginButton />
      <Separator />
      <FavoriteSpot />
    </ProfileContainer>
  );
}
