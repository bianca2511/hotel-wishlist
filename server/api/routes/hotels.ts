import { Router } from "jsr:@oak/oak/router";
import data from "../data.json" with { type: "json" };

const hotelRouter = new Router();

// Get all hotels
hotelRouter.get("/api/hotels", (context) => {
  context.response.body = data.hotels;
});

// Get a specific hotel by name
hotelRouter.get("/api/hotels/:hotel", (context) => {
  const { hotel } = context.params;

  if (!hotel) {
    context.response.body = "No hotel name provided.";
    return;
  }

  const foundHotel = data.hotels.find((item) =>
    item.name.toLowerCase() === hotel.toLowerCase()
  );

  //nullish operator
  context.response.body = foundHotel ?? "No hotel found.";
});

export default hotelRouter;
