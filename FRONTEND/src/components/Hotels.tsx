import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { HotelListCard } from "./HotelListCard";

export const Hotels: React.FC = () => {
  const { hotels, searchState } = useAppSelector((state) => state.hotels);
  return (
    <div className="hotels_list">
      {hotels.map((hotel) => (
        <Link to={`/hotel/${hotel.id}`} className="text-decoration-none" key={hotel.id}>
          <HotelListCard
            id={hotel.id}
            name={hotel.name}
            address={hotel.address}
            distanceToCenterKm={hotel.distanceToCenterKm}
            firstImage={hotel.firstImage!}
          ></HotelListCard>
        </Link>
      ))}
    </div>
  );
};
