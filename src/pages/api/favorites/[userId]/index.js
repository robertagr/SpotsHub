import dbConnect from "../../../../../db/models/connect";
import { getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next";
import { authOptions } from "../../auth/[...nextauth]";
import { toggleFavorite } from "../../../../../lib/db";
import { getFavoritesByUserId, addFavorite, removeFavorite } from "../../../../../lib/db";
import Favorite from "../../../../../db/models/Favorite";
// import User from "../../../../../db/models/User";

export default async function handler(request, response) {

  const { method } = request;
  const {userId} = request.body;

  // console.log(request)

  console.log("USERID", userId)

  if (method === "GET") {
          try {

    const favorites = await getFavoritesByUserId(request.query.userId)
     console.log(favorites)

      return response.status(200).json(favorites);
    } catch (error) {
      console.error("Error handling favorites:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }




if (method === "DELETE") {
  try {
    const { spotId } = request.body;
    const favorite = await Favorite.findOneAndDelete({
      userId: request.query.userId,
      spotId: spotId,
    });
    if (!favorite) {
      return response.status(404).json({ error: "Favorite not found" });
    }
    return response.status(200).json({ status: "Success" });
  } catch (error) {
    console.error("Error unfavorite:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
}