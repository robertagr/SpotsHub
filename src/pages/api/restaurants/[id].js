import dbConnect from "../../../../db/models/connect";
import Spot from "../../../../db/models/Spot";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const { id } = request.query;
    const spot = await Spot.findOne({ title: id });
    return response.status(200).json(spot);
  }

  response.status(405).end();
}
