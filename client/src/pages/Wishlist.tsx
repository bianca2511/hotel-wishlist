import React, { useEffect, useState } from "react";
import { HotelType } from "../types.ts";
import NavBar from "../components/NavBar.tsx";
import "../styles/Wishlist.css";
import { WishlistHotelCard } from "../components/WishlistHotelCard.tsx";

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
    const fetchWishlists = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/wishlists");
        if (!response.ok) {
          throw new Error(`Error fetching wishlists: ${response.statusText}`);
        }
        const data = await response.json();

        setWishlists(data.wishlists);

        const initialExpandedState: Record<string, boolean> = {};
        data.wishlists.forEach((wishlist: Wishlist) => {
          initialExpandedState[wishlist.name] = false;
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

  const handleRemoveHotel = (wishlistName: string, hotelId: number) => {
    setWishlists((prevWishlists: Wishlist) =>
      prevWishlists.map((wishlist: Wishlist) =>
        wishlist.name === wishlistName
          ? {
              ...wishlist,
              hotels: wishlist.hotels.filter((hotel) => hotel.id !== hotelId),
            }
          : wishlist
      )
    );
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
      <div className="wishlist-content">
      <h1>Your Wishlists</h1>
        {wishlists.map((wishlist: Wishlist) => (
          <div key={wishlist.name} className="hotel-list">
            <div className="wishlist-header">
              <h2>{wishlist.name}</h2>
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
                      <WishlistHotelCard
                        key={hotel.id}
                        hotel={hotel}
                        wishlistName={wishlist.name}
                        onRemove={(hotelId) =>
                          handleRemoveHotel(wishlist.name, hotelId)
                        }
                      />
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
