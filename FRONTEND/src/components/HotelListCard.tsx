import React from "react";
import { deal, image } from "../store/hotelSlice";

interface Props {
  id: number;
  name: string;
  address: string;
  firstImage: image;
  firstDeal?: deal;
  distanceToCenterKm: number;
}

export const HotelListCard: React.FC<Props> = ({
  name,
  address,
  distanceToCenterKm,
  firstImage,
}) => {
  return (
    <div className="hotel_card" >
      <img src={firstImage.url} alt={firstImage.caption} className="hotel_list_view_image" />
      <div className="hotel_info">
        <p className="fw-bold fs-6 text-justify">{name}</p>
        <p className="addr">{address}</p>
        <p>{distanceToCenterKm} Km</p>
      </div>
    </div>
  );
};
