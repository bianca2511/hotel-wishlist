// deno-lint-ignore-file no-unused-vars
import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import data from "./api/data.json" with { type: "json" };

export const app = new Application();
const router = new Router();

// Get all hotels
router.get("/api/hotels", (context) => {
  context.response.body = data.hotels; // Access the `hotels` property
});

// Get a specific hotel by name
router.get("/api/hotels/:hotel", (context) => {
  if (!context?.params?.hotel) {
    context.response.body = "No hotel name provided.";
    return;
  }

  const hotel = data.hotels.find((item) =>
    item.name.toLowerCase() === context.params.hotel.toLowerCase()
  );

  context.response.body = hotel ?? "No hotel found.";
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));

if (import.meta.main) {
  console.log("Server listening on port http://localhost:8000");
  await app.listen({ port: 8000 });
}
