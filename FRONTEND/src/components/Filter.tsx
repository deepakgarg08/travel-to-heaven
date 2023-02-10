import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeLanguage, clearFilters, filterHotels, sortHotels } from "../store/hotelSlice";

export type filterPayload = {
  key: string;
  minPrice?: number;
  maxPrice?: number;
  maxDistance?: number;
};

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [minimum, setMinimum] = useState<number>(0);
  const [maximum, setMaximum] = useState<number>(100000);
  const [maxDistance, setMaxDistance] = useState<number>(0);

  const handleFilter = (filterType: string) => {
    switch (filterType) {
      case "price":
        dispatch(filterHotels({ key: filterType, minPrice: minimum, maxPrice: maximum }));
        break;
      case "distance":
        dispatch(filterHotels({ key: filterType, maxDistance }));
        break;
    }
  };

  const language = (lang: string): string => {
    switch (lang) {
      case "en-US":
        return "English";
      case "de-DE":
        return "German";
      case "fr-FR":
        return "French";
      case "es-ES":
        return "Spanish";
      default:
        return "English";
    }
  };
  const { lang } = useAppSelector((state) => state.hotels);

  return (
    <div className="sort_and_filter">
      <div className="sort m-2">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => dispatch(sortHotels("minPrice"))}>
              Price - minimum to highest
            </Dropdown.Item>
            <Dropdown.Item onClick={() => dispatch(sortHotels("distanceToCenterKm"))}>
              Distance - Nearest to Farthest
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="filter m-2">
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => dispatch(clearFilters())} className="danger">Clear Filters</Dropdown.Item>
              {/* <div className="clear_filters" onClick={() => dispatch(clearFilters())}>
                Clear Filters
              </div> */}
              <div className="d-flex">
                <input
                  type="number"
                  name="minimum"
                  id=""
                  onChange={(e) => setMinimum(Number(e.target.value))}
                  placeholder="min price"
                />
                <input
                  type="number"
                  name="maximum"
                  id=""
                  onChange={(e) => setMaximum(Number(e.target.value))}
                  placeholder="max price"
                />
                <div
                  className="btn bg-primary m-1 text-white"
                  onClick={() => handleFilter("price")}
                >
                  Go
                </div>
              </div>
              <div className="d-flex">
                <input
                  type="number"
                  name="minimum"
                  id=""
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  placeholder="max distance"
                />
                <div
                  className="btn bg-primary m-1 text-white"
                  onClick={() => handleFilter("distance")}
                >
                  Go
                </div>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="language m-2">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {language(lang)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="en-US" onClick={() => dispatch(changeLanguage("en-US"))}>
              English
            </Dropdown.Item>
            <Dropdown.Item eventKey="de-DE" onClick={() => dispatch(changeLanguage("de-DE"))}>
              German
            </Dropdown.Item>
            <Dropdown.Item eventKey="fr-FR" onClick={() => dispatch(changeLanguage("fr-FR"))}>
              French
            </Dropdown.Item>
            <Dropdown.Item eventKey="es-ES" onClick={() => dispatch(changeLanguage("es-ES"))}>
              Spanish
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
