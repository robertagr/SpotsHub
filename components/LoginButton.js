import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const WelcomeText = styled.div`
  color: gray;
  margin-left: 0px;
  font-size: 15px;
  font-weight: normal;
  margin-right: 88px;

  /* margin-left: 0px; */
`;

const UserName = styled.div`
  color: gray;
  margin-left: 0px;
  font-size: 15px;
  font-weight: normal;
  font-weight: bold;
  margin-right: 40px;
`;

const WelcomeContainer = styled.div`
  padding: 25px 10px 20px 6px;
  margin: 0px;
`;

const SignOutButton = styled.button`
  border-radius: 10px;
  border-style: none;
  width: 80px;
  height: 30px;
  margin-left: 80px;
  cursor: pointer;
  &:hover {
    /* box-shadow: 2px 2px 7px rgb(1 1 0 / 7%); */
    border-radius: 0px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function LoginButton() {
  const { data: session, error, isLoading } = useSession();

  return (
    <div>
      {session ? (
        <>
          <Wrapper>
            <WelcomeContainer>
              <WelcomeText>Welcome,</WelcomeText>
              <UserName>{session.user.name}</UserName>
            </WelcomeContainer>
            <SignOutButton onClick={() => signOut()}>Sign out</SignOutButton>
          </Wrapper>
        </>
      ) : (
        <>
          <div>Please Log In</div>
          <button onClick={() => signIn()}>Sign in </button>
        </>
      )}
    </div>
  );
}
