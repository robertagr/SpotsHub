import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

const WelcomeText = styled.div`
  color: gray;
  margin-left: 0px;
  font-size: 15px;
  font-weight: normal;
  margin-right: 88px;
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

const SignInContainer = styled.div`
  /* padding: 25px 0; */

  padding: 25px 145px 20px 145px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  overflow: hidden;

  justify-content: center;
  min-height: 600px;
  background: linear-gradient(
    135deg,
    rgb(255 149 103 / 75%),
    rgb(255 255 255 / 75%)
  );

  /* background: linear-gradient(135deg, #ff763ac4, #ffe6de); */

  button {
    background-color: #373332;
    /* background-color: #f2500a; */
    color: #ffffff;
    border: none;
    border-radius: 10px;
    padding: 10px 40px;
    cursor: pointer;
    transition: background-color 0.4s ease;

    &:hover {
      background-color: #ff9875;
    }
  }
`;

const SignInBox = styled.div`
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0px;
  width: 200%;
  max-width: 200px;
`;

const Separator = styled.div`
  border-block-end: 1px solid rgb(233, 232, 232);
`;

export default function LoginButton() {
  const { data: session, error, isLoading } = useSession();

  return (
    <>
      {session ? (
        <>
          <Wrapper>
            <WelcomeContainer>
              <WelcomeText>Welcome,</WelcomeText>
              <UserName>{session.user.name}</UserName>
            </WelcomeContainer>

            <SignOutButton onClick={() => signOut()}>Sign out</SignOutButton>
          </Wrapper>
          <Separator />
        </>
      ) : (
        <>
          <SignInContainer>
            <SignInBox>
              <p>Explore Berlin's Authentic Flavors!</p>
              <button onClick={() => signIn()}>Sign in</button>
            </SignInBox>
          </SignInContainer>
        </>
      )}
    </>
  );
}
