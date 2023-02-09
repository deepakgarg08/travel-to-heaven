import React, { useEffect } from "react";
import { Hotels } from "../components/Hotels";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchHotels } from "../store/hotelSlice";

export const Home = () => {
  const lang = useAppSelector((state) => state.hotels.lang);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchHotels(lang));
  }, [dispatch, lang]);
  
  return (
    <div className="App container">
      <div className="">
        <Hotels></Hotels>
      </div>
    </div>
  );
};

