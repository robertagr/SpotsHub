import dbConnect from "../../../../../db/models/connect";
import Spot from "../../../../../db/models/Spot";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import Favorite from "../../../../../db/models/Favorite";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  const { spotId } = request.query;
  if (session) {
    if (request.method === "POST") {
      await dbConnect();

      const newFavorite = new Favorite();
      newFavorite.username = session.user.name;
      // newFavorite.username = "roberta";

      newFavorite.spot = spotId;
      await newFavorite.save();

      return response.status(200).json(newFavorite);
    }
  }
  response.status(401);
  response.end();
}
