import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelType } from "../types.ts"; 
import { HotelCard } from "../components/HotelCard.tsx";

export default function Index() {
  const [hotels, setHotels] = useState<HotelType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/hotels/`);
      const allHotels = await response.json() as HotelType[];
      setHotels(allHotels);
    })();
  }, []);

  return (
    <main>
      <h1>Welcome to the Hotel Wishlist App</h1>
      <p>Create custom wishlists and sort hotels your way ❤️</p>
      {hotels.map((hotel: HotelType) => {
        return (
          <HotelCard key={hotel.id} hotel={hotel}></HotelCard>
        );
      })}
    </main>
  );
}
