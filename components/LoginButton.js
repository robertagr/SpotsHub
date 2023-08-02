import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, error, isLoading } = useSession();

  // if (!session || error || isLoading) {
  //   return null;
  // }
  console.log("session", session);
  // if (session) {
    // try to find user by name
    // if user does not exist, create it
    // store user inside zustand/global state
  // }

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
