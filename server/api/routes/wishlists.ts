import { Router } from "jsr:@oak/oak/router";
import data from "../data.json" with { type: "json" };

const wishlistRouter = new Router();
const wishlists: Record<string, string[]> = {};

wishlistRouter.post("/api/wishlists", async (context) => {
  const body = context.request.body;
  let value;

  if (body.type() === "json") {
    value = await body.json(); //parse the body of the request as JSON
  } else {
    context.response.status = 400;
    context.response.body = { error: "Expected JSON body" };
    return;
  }

  const { name } = value; //destructure json into the name

  if (!name || wishlists[name]) {
    context.response.status = 400;
    context.response.body = { error: "Invalid or duplicate wishlist name :(" };
    return;
  }

  wishlists[name] = [];
  context.response.body = {
    message: `Wishlist "${name}" successfully created :)`,
  };
});

// Add hotel to a wishlist
wishlistRouter.post("/api/wishlists/:name/:hotelID", (context) => {
  const { name, hotelID } = context.params;

  if (!hotelID || isNaN(Number(hotelID))) {
    context.response.status = 400;
    context.response.body = { error: "Invalid or missing hotelID" };
    return;
  }

  const hotelId = Number(hotelID);

  // Check if the wishlist exists
  if (!wishlists[name]) {
    context.response.status = 404;
    context.response.body = { error: `Wishlist "${name}" not found` };
    return;
  }

  // Check if the hotel exists
  const hotel = data.hotels.find((hotel) => hotel.id === hotelId);
  if (!hotel) {
    context.response.status = 404;
    context.response.body = { error: `Hotel with ID "${hotelID}" not found` };
    return;
  }

  // Add hotel to the wishlist
  wishlists[name].push(hotelId.toString());
  context.response.status = 200;
  context.response.body = {
    message: `Hotel "${hotel.name}" added to wishlist "${name}"`,
  };
});

// Remove a hotel from a wishlist
wishlistRouter.delete("/api/wishlists/:name/:hotelId", (context) => {
  const { name, hotelId } = context.params;

  if (!wishlists[name]) {
    context.response.status = 404;
    context.response.body = { error: "Wishlist not found" };
    return;
  }

  wishlists[name] = wishlists[name].filter((id) => id !== hotelId);
  context.response.body = { message: `Hotel removed from wishlist "${name}".` };
});

//display a wishlist
wishlistRouter.get("/api/wishlists/:name", (context) => {
  const { name } = context.params;

  if (!wishlists[name]) {
    context.response.status = 404;
    context.response.body = { error: "Wishlist not found" };
    return;
  }

  const hotels = wishlists[name].map((id) =>
    data.hotels.find((hotel) => hotel.id === parseInt(id))
  );

  context.response.body = { name, hotels };
});

export default wishlistRouter;

//display all wishlists
wishlistRouter.get("/api/wishlists", (context) => {
  if (Object.keys(wishlists).length === 0) {
    context.response.status = 404;
    context.response.body = { message: "No wishlists found" };
    return;
  }

  //show all wishlists and the hotel ids they contain
  const response = Object.entries(wishlists).map(([name, hotelIds]) => ({
    name,
    hotels: hotelIds.map((id) =>
      data.hotels.find((hotel) => hotel.id === parseInt(id))
    ),
  }));

  context.response.status = 200;
  context.response.body = { wishlists: response };
});
