import { useEffect, useState } from "react";
import { HotelType } from "../types.ts";
import { HotelCard } from "../components/HotelCard.tsx";
import NewWishlist from "../components/NewWishlist.tsx";
import NavBar from "../components/NavBar.tsx";
import "../styles/index.css";

export default function Index() {
  const [hotels, setHotels] = useState<HotelType[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/hotels/`);
      const allHotels = (await response.json()) as HotelType[];
      setHotels(allHotels);
    })();
  }, []);

  return (
    <main>
      <NavBar></NavBar>
      <div className="index-content">
        <NewWishlist></NewWishlist>
        <h1>Welcome to the Hotel Wishlist App</h1>
        <p>
          Browse hotels, create custom wishlists and sort everything your way ❤️
        </p>
        {hotels.map((hotel: HotelType) => {
          return <HotelCard key={hotel.id} hotel={hotel}></HotelCard>;
        })}
      </div>
    </main>
  );
}
