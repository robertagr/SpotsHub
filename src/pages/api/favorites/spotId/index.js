import { toggleFavorite } from "../../../../../lib/db";


export default async function handler(request, response) {
  const { method } = request;
  if (method === "POST") {
    try {
      const {userId, spotId} = request.body;

      // await addFavorite(userId,spotId)
      await toggleFavorite(userId, spotId);


      return response.status(200).json({status: 'Hello'});
    } catch (error) {
      console.error("Error handling favorites:", error);
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}