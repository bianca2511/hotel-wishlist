// deno-lint-ignore-file no-unused-vars
import { Application } from "jsr:@oak/oak/application";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import hotelRouter from "./api/routes/hotels.ts";
import wishlistRouter from "./api/routes/wishlists.ts";

export const app = new Application();

// Use middleware and routes
app.use(oakCors());
app.use(hotelRouter.routes());
app.use(hotelRouter.allowedMethods());
app.use(wishlistRouter.routes());
app.use(wishlistRouter.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

// Start the server
if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
