import { HotelType } from "../types.ts";
import "../styles/HotelCard.css";

interface WishlistHotelCardProps {
  hotel: HotelType;
  wishlistName: string;
  onRemove: (hotelId: number) => void;
}

export const WishlistHotelCard: React.FC<WishlistHotelCardProps> = ({
  hotel,
  wishlistName,
  onRemove,
}) => {
  const removeHotel = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/wishlists/${wishlistName}/${hotel.id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error("Failed to remove hotel from wishlist");
      }

      onRemove(hotel.id);
    } catch (error) {
      console.error(error);
      alert("Error removing hotel from wishlist.");
    }
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
      />{" "}
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
      <button className="remove-wishlist-button" onClick={removeHotel}>
        Remove from ❤️
      </button>
    </div>
  );
};
