import React, { useEffect, useState } from "react";
import { HotelType } from "../types.ts";
import NavBar from "../components/NavBar.tsx";
import { HotelCard } from "../components/HotelCard.tsx";
import "../styles/Wishlist.css";
interface Wishlist {
  name: string;
  hotels: HotelType[];
}

const Wishlists: React.FC = () => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedWishlists, setExpandedWishlists] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    // Fetch wishlists from the API
    const fetchWishlists = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/wishlists");
        if (!response.ok) {
          throw new Error(`Error fetching wishlists: ${response.statusText}`);
        }
        const data = await response.json();

        setWishlists(data.wishlists);

        // Initialize all wishlists in the expanded state
        const initialExpandedState: Record<string, boolean> = {};
        data.wishlists.forEach((wishlist: Wishlist) => {
          initialExpandedState[wishlist.name] = true;
        });
        setExpandedWishlists(initialExpandedState);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    fetchWishlists();
  }, []);

  const toggleWishlistVisibility = (wishlistName: string) => {
    setExpandedWishlists((prev) => ({
      ...prev,
      [wishlistName]: !prev[wishlistName],
    }));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wishlists.length) {
    return <div>Loading or no wishlists available...</div>;
  }

  return (
    <main>
      <NavBar />
      <div>
        <h1>Your Wishlists</h1>
        {wishlists.map((wishlist: Wishlist) => (
          <div key={wishlist.name}  className="hotel-list">
            <div className="wishlist-header">
              <h2>Wishlist {wishlist.name}</h2>
              <button
                className="hide-show-wishlist"
                onClick={() => toggleWishlistVisibility(wishlist.name)}
              >
                {expandedWishlists[wishlist.name] ? "Hide" : "Show"}
              </button>
            </div>

            {expandedWishlists[wishlist.name] && (
              <div>
                {wishlist.hotels.length > 0 ? (
                  <div>
                    {wishlist.hotels.map((hotel) => (
                      <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                  </div>
                ) : (
                  <p>No hotels in this wishlist</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Wishlists;
