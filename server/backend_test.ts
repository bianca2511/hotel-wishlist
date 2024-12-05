import { assertEquals } from "jsr:@std/assert";

Deno.test("POST /api/wishlists - Create wishlist", async () => {
  const response = await fetch("http://localhost:8000/api/wishlists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "Vacation" }),
  });

  if (response.status === 200) {
    const responseBody = await response.json();
    assertEquals(responseBody, {
      message: 'Wishlist "Vacation" successfully created :)',
    });
  } else if (response.status === 400) {
    const responseBody = await response.json();
    assertEquals(responseBody.error, "Invalid or duplicate wishlist name :(");
  } else {
    throw new Error(`Unexpected status code: ${response.status}`);
  }
  
});

Deno.test("GET /api/wishlists - Retrieve all wishlists", async () => {
  const response = await fetch("http://localhost:8000/api/wishlists", {
    method: "GET",
  });

  assertEquals(response.status, 200);
  assertEquals(await response.json(), {
    wishlists: [
      {
        name: "Vacation",
        hotels: [],
      }
    ],
  });
});

Deno.test("POST /api/wishlists/:name/:hotelID - Invalid hotelID", async () => {
  const response = await fetch("http://localhost:8000/api/wishlists/Vacation/invalidID", {
    method: "POST",
  });

  assertEquals(response.status, 400);
  const responseBody = await response.json();
  assertEquals(responseBody, {
    error: "Invalid or missing hotelID",
  });
});

Deno.test("POST /api/wishlists/:name/:hotelID - Wishlist not found", async () => {
  const response = await fetch("http://localhost:8000/api/wishlists/Holiday/101", {
    method: "POST",
  });

  assertEquals(response.status, 404);
  const responseBody = await response.json();
  assertEquals(responseBody, {
    error: 'Wishlist "Holiday" not found',
  });
});



Deno.test("POST /api/wishlists/:name/:hotelID - Add hotel to wishlist (valid case)", async () => {
  const response = await fetch("http://localhost:8000/api/wishlists/Vacation/101", {
    method: "POST",
  });

  assertEquals(response.status, 200);
  const responseBody = await response.json();
  assertEquals(responseBody, {
    message: 'Hotel "Royanne" added to wishlist "Vacation"',
  });
});

Deno.test("DELETE /api/wishlists/:name/:hotelId - Remove hotel from wishlist (success case)", async () => {
  const response = await fetch("http://localhost:8000/api/wishlists/Vacation/101", {
    method: "DELETE",
  });

  assertEquals(response.status, 200);
  const responseBody = await response.json();
  assertEquals(responseBody, {
    message: 'Hotel removed from wishlist "Vacation".',
  });
});
