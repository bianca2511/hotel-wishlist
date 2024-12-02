import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HotelType } from "../types.ts";

export default function Hotel() {
  const { selectedHotel } = useParams();
  const [hotel, setHotel] = useState<HotelType>();

  useEffect(() => { 
    (async () => {
      const resp = await fetch(`/api/hotels/${selectedHotel}`);
      const HotelType = await resp.json() as HotelType;
      setHotel(HotelType);
    })();
  }, [selectedHotel]);

  return (
    <div>
      <h1>{hotel.name}</h1>
      <p>{hotel.description}</p>
      <Link to="/">🠠 Back to all hotels</Link>
    </div>
  );
}
