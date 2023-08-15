import { getFavoritesByUserId } from "../../../../../lib/db";
import Favorite from "../../../../utils/models/Favorite";

export default async function handler(request, response) {
  const { method } = request;
  const { userId } = request.body;

  if (method === "GET") {
    try {
      const favorites = await getFavoritesByUserId(request.query.userId);

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
