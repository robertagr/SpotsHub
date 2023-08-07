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
  /* display: flex; */
  /* align-items: center; */
  padding: 25px 10px 20px 6px;
  /* margin-right: 100%; */
`;

const SignInButton = styled.button`
  border-radius: 10px;
  border-style: none;
  width: 80px;
  height: 30px;
  /* margin: 0px 0px 5px 200px; */
  margin-left: 10px;
  cursor: pointer;
  &:hover {
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
            <SignInButton onClick={() => signOut()}>Sign out</SignInButton>
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
