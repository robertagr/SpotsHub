import dbConnect from "../../../../../db/models/connect";
import { getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { toggleFavorite } from "../../../../../lib/db";
import { getFavoritesByUserId, addFavorite } from "../../../../../lib/db";
import Favorite from "../../../../../db/models/Favorite";
// import User from "../../../../../db/models/User";

export default async function handler(request, response) {

  const { method } = request;
  const {userId} = request.body;

  console.log(request)

  console.log("USERID", userId)




  if (method === "GET") {
          // Get the user's session data using getServerSession
          try {
      // const session = await getServerSession({ request, authOptions });
      // if (!session?.user?.userId) {
      //   return response.status(401).json({ error: "Unauthorized" });
      // }


     // Connect to the database
    //  await dbConnect();

    const favorites = await getFavoritesByUserId(request.query.userId)
     console.log(favorites)

      return response.status(200).json(favorites);
    } catch (error) {
      console.error("Error handling favorites:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}