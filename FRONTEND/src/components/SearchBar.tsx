import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { useAppDispatch } from "../store/hooks";
import { fetchHotelByName } from "../store/hotelSlice";

export const SearchBar: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const search = (input: string) => {
    if (input.trim() === "") {
      return;
    }
    dispatch(fetchHotelByName(input));
    setInput("");
    navigate("/search", {
      state: {
        query: input,
      },
    });
  };

  return (
    <div className="search_box">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={input}
          className="search_bar"
          placeholder="Nach hotelnamen suchen.."
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div
          className="btn bg-success text-white h-100"
          onClick={(e) => {
            e.preventDefault();
            search(input);
          }}
        >
          <BiSearchAlt />
        </div>
      </form>
    </div>
  );
};
