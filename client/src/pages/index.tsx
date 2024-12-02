import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HotelType } from "../types.ts"; 

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
      <p>Click on a hotel below to learn more.</p>
      {hotels.map((hotel: HotelType) => {
        return (
          <Link
            to={`/${hotel.name.toLowerCase()}`}
            key={hotel.id}
            className="hotel"
          >
            {hotel.name} - {hotel.stars}⭐
          </Link>
        );
      })}
    </main>
  );
}
