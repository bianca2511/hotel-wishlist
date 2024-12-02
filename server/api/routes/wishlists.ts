import { Router } from "jsr:@oak/oak/router";
import data from "../data.json" with {type:"json"};

const wishlistRouter = new Router();
const wishlists: Record<string, string[]> = {};

//create new wishlist
wishlistRouter.post("/api/wishlists", async (context) => {
    const value = await context.request.body().value;
    const { name } = value;

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

//add hotel to a wishlist
wishlistRouter.post("/api.wishlists/:name/hotel", async (context) => {
  const { name } = context.params;
  const body = context.request.body();
  const value = await body.value;
  
  const { hotelID } = value;
  
  if(!wishlists[name]) {
    context.response.status = 404;
    context.response.body = {error : "wishlist not found"};
  }

  const hotel = data.hotels.find((hotel) => hotel.id === hotelID);
  if(!hotel) {
    context.response.status = 404;
    context.response.body = { error: "Hotel not found" };
    return;
  }

  wishlists[name].push(hotelID);
  context.response.body = { message: `Hotel "${hotel.name}" added to wishlist "${name}".` };
});


//remove a hotel from a wishlist
wishlistRouter.delete("/api/wishlists/:name/hotel/:hotelId", (context) => {
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