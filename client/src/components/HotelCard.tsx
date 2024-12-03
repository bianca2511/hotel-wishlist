import React from "react";
import { HotelType } from "../types.ts";
import "../styles/HotelCard.css";

type HotelCardProps = {
  hotel: HotelType;
};

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <img src="/images/dog.jpg" className="hotel-photo"></img>
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
        <a className="wishlist-button">Add to ❤️</a>
      </div>
    </div>
  );
};
