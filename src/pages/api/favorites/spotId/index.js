import dbConnect from "../../../../../db/models/connect";
// import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { toggleFavorite } from "../../../../../lib/db";
import { getFavoritesByUserId, addFavorite } from "../../../../../lib/db";
import Favorite from "../../../../../db/models/Favorite";
// import User from "../../../../../db/models/User";

export default async function handler(request, response) {

  const { method } = request;

  
  if (method === "POST") {
    console.log(method)
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

  response.status(405).end(); // Method not allowed for other request methods
}



  // const session = await getServerSession(request, response, authOptions);
  // const { spotId } = request.query;
  // if (session) {
  //   if (request.method === "POST") {
  //     await dbConnect();

  //     // If the spot is not in favorites, add it
  //     const newFavorite = new Favorite();
  //     newFavorite.username = session.user.name;
  //     // newFavorite.username = "roberta";

  //     newFavorite.spot = spotId;
  //     await newFavorite.save();

  //     return response.status(200).json(newFavorite);
  //   }

  //   const newFavorite = new Favorite();
  //   newFavorite.username = session.user.name;
  //   newFavorite.spot = spotId;
  //   await newFavorite.save();

  //   return response.status(200).json(newFavorite);
  // } else if (request.method === "DELETE") {
  //   // Remove the spot from favorites
  //   await Favorite.findOneAndDelete({
  //     username: session.user.name,
  //     spot: spotId,
  //   });

  //   return response.status(200).json({ message: "Spot removed from favorites" });


  // }
  // response.status(401);
  // response.end();




