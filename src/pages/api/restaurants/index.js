import dbConnect from "../../../utils/models/connect";
import Spot from "../../../utils/models/Spot";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const spots = await Spot.find();
    return response.status(200).json(spots);
  }

  response.status(405).end();
}
