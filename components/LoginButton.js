import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, error, isLoading } = useSession();


  // console.log("session", session);


  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in </button>
      )}
    </div>
  );
}
