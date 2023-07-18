import dbConnect from "../../../../db/models/connect";
import Restaurant from "../../../../db/models/Restaurant";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const locations = await Restaurant.find();
    return response.status(200).json(locations);
  }
}
