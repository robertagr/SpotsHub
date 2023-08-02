import dbConnect from "../../../../../db/models/connect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { toggleFavorite } from "../../../../../lib/db";
import { getFavoritesByUserId, addFavorite } from "../../../../../lib/db";


export default async function handler(request, response) {

  const { method } = request;

  
  if (method === "POST") {
    // Check if the user is authenticated
    // const session = await getServerSession({ request, request, authOptions });

    // if (!session) {
    //   return response.status(401).json({ error: "Unauthorized" });
    // }

    try {
      // await dbConnect();

      // Get the user's document from the database

      // Add the spotId to favorites or remove if it's already there

      // const userId = session.userId
      
      const {userId, spotId} = request.body;


      
      // console.log({userId});

      // await toggleFavorite(userId, spotId )
      // const favorites = await getFavoritesByUserId(userId)
      await addFavorite(userId,spotId)
     

      return response.status(200).json({status: 'Hello'});
    } catch (error) {
      console.error("Error handling favorites:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}