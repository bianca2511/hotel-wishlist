import React, { useEffect, useState } from 'react';
import { HotelType } from "../types.ts";

interface Wishlist {
  name: string;
  hotels: HotelType[];
}

const Wishlists: React.FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //fetch wishlists from the API
    const fetchWishlists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/wishlists');
        if (!response.ok) {
          throw new Error(`Error fetching wishlists: ${response.statusText}`);
        }
        const data = await response.json();
        setWishlists(data.wishlists);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    };
    fetchWishlists();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wishlists.length) {
    return <div>Loading or no wishlists available...</div>;
  }

  return (
    <div>
      <h1>Your Wishlists</h1>
      {wishlists.map((wishlist: Wishlist) => (
        <div key={wishlist.name}>
          <h2>{wishlist.name}</h2>
          {wishlist.hotels.length > 0 ? (
            <ul>
              {wishlist.hotels.map((hotel) => (
                <li key={hotel.id}>{hotel.name}</li>
              ))}
            </ul>
          ) : (
            <p>No hotels in this wishlist</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Wishlists;
