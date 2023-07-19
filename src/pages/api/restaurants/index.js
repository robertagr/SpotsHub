import dbConnect from "../../../../db/models/connect";
import Restaurant from "../../../../db/models/Spot";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const restaurants = await Restaurant.find();
    return response.status(200).json(restaurants);
  }

  response.status(405).end();
}
