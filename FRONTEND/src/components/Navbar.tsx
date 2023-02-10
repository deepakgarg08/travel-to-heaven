import React from "react";
import { Filter } from "../components/Filter";
import { SearchBar } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { clearSearchState } from "../store/hotelSlice";
export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className="header">
      <SearchBar></SearchBar>
      <h1
        className="text-white heading"
        onClick={() => {
          dispatch(clearSearchState());
          navigate("/");
        }}
      >
        Travel to Heaven
      </h1>
      <Filter></Filter>
    </div>
  );
};
