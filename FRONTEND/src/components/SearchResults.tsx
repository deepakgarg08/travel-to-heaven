import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearSearchState, fetchHotelByName } from "../store/hotelSlice";
import { HotelListCard } from "./HotelListCard";

export const SearchResults: React.FC = () => {
  const { searchState, lang } = useAppSelector((state) => state.hotels);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.query) {
      dispatch(fetchHotelByName(location.state.query));
    }
  }, [dispatch, lang, location.state.query]);

  return (
    <div className="container">
      <span
        className="p-2 m-2 fw-bold fs-4 back rounded-circle bg-success text-white"
        onClick={() => {
          dispatch(clearSearchState());
          navigate("/");
        }}
      >
        &#8592;
      </span>
      <div className="hotels_list">
        {searchState.map((hotel) => (
          <Link to={`/hotel/${hotel.id}`} className="text-decoration-none">
            <HotelListCard
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              address={hotel.address}
              distanceToCenterKm={hotel.distanceToCenterKm}
              firstImage={hotel.firstImage!}
            ></HotelListCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
