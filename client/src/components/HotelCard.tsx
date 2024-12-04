// @deno-types="@types/react"
import React, { useState } from "react";
import { HotelType, Wishlist } from "../types.ts";
import "../styles/HotelCard.css";

type WishlistWithFlag = Wishlist & {
  containsHotel: boolean;
};

type HotelCardProps = {
  hotel: HotelType;
};

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
}: HotelCardProps) => {
  const [wishlists, setWishlists] = useState<WishlistWithFlag[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  //fetch wishlists with a flag indicating if the hotel is already added
  const fetchWishlists = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/wishlists");
      if (!response.ok) {
        throw new Error(`Error fetching wishlists: ${response.statusText}`);
      }
      const data = await response.json();

      const updatedWishlists: WishlistWithFlag[] = data.wishlists.map(
        (wishlist: Wishlist) => ({
          ...wishlist,
          // name: wishlist.name,
          // hotels: wishlist.hotels,
          containsHotel: wishlist.hotels.some(
            (h: HotelType) => h.id === hotel.id,
          ),
        }),
      );
      setWishlists(updatedWishlists);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch wishlists");
    }
  };

  //add the hotel to a wishlist if not already added
  const addToWishlist = async (wishlistName: string) => {
    const wishlist = wishlists.find(
      (w: { name: string }) => w.name === wishlistName,
    );
    if (wishlist?.containsHotel) {
      alert(`Hotel is already in wishlist "${wishlistName}"`);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/wishlists/${wishlistName}/${hotel.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to add hotel to wishlist.");
        return;
      }

      const data = await response.json();
      alert(data.message);

      setWishlists((prev: WishlistWithFlag[]) =>
        prev.map((w) =>
          w.name === wishlistName ? { ...w, containsHotel: true } : w
        )
      );
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Unexpected error occurred.");
    }
  };

  //toggle the dropdown visibility and fetch wishlists if needed
  const handleDropdownToggle = async () => {
    if (!showDropdown) {
      await fetchWishlists();
    }
    setShowDropdown((prev: boolean) => !prev);
  };

  return (
    <div className="hotel-card">
      <img
        className="hotel-photo"
        src={`/images/${hotel.photo}`}
        alt={hotel.name}
        onError={(e) => {
          e.currentTarget.src = "/images/dog.jpg"; //use the default image
        }}
      />
      <div className="hotel-info">
        <div className="hotel-header">
          <h2>{hotel.name}</h2>
          <p className="hotel-star-rating">
            {Array(hotel.stars)
              .fill(0)
              .map((_, index) => (
                <span key={index} className="star">
                  ⭐
                </span>
              ))}
          </p>
        </div>
        {hotel.facilities.length > 0 && (
          <p>Facilities: {hotel.facilities.join(", ")}</p>
        )}
      </div>
      <div className="hotel-button">
        <button className="wishlist-button" onClick={handleDropdownToggle}>
          Add to ❤️
        </button>
        {showDropdown && (
          <div className="dropdown">
            {wishlists.length > 0
              ? (
                wishlists.map((wishlist: WishlistWithFlag) => (
                  <div
                    key={wishlist.name}
                    className="dropdown-item"
                    onClick={() => addToWishlist(wishlist.name)}
                  >
                    {wishlist.name}
                    {wishlist.containsHotel && (
                      <span className="checkmark">✔️</span>
                    )}
                  </div>
                ))
              )
              : <div className="dropdown-item">No wishlists available</div>}
          </div>
        )}
      </div>
    </div>
  );
};
