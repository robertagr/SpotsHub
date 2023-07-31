import React from "react";
import Login from "../../../components/Login";
import { getSession } from "next-auth/react";

export default function Profile({ session }) {
  return (
    <div>
      {" "}
      <Login />{" "}
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/profile",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }
