import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { apiGetAllHotels, apiGetHotelById, apiSearchHotel } from "../helpers/apiRequests";
import { sort, filerByPrice, filterByDistance } from "../helpers/util";
import { filterPayload } from "../components/Filter";

export type image = {
  url: string;
  caption: string;
};

export type deal = {
  headline: string;
  details: string;
};

export type payload = {
  id?: number;
  lang?: string;
  name?: string;
};

export interface Hotel {
  id: number;
  minPrice: number;
  currencyCode: string;
  distanceToCenterKm: number;
  name: string;
  address: string;
  city: string;
  description: string;
  firstImage?: image;
  firstDeal?: deal;
  images?: image[];
  deals?: deal[];
}

export interface InitialState {
  lang: string;
  hotels: Hotel[];
  searchState: Hotel[];
  hotelDetails: Hotel[];
  tempState: Hotel[];
}

const hotels: Hotel[] = [];
let searchState: Hotel[] = [];
let lang: string = "en-US";
let hotelDetails: Hotel[] = [];
let tempState: Hotel[] = [];

const initialState: InitialState = {
  lang,
  hotels,
  searchState,
  hotelDetails,
  tempState,
};

//thunks
export const fetchHotels = createAsyncThunk("fetchHotels", async (lang: string) => {
  const response: Hotel[] = await apiGetAllHotels(lang);
  return response;
});

export const fetchHotelById = createAsyncThunk("fetchHotelById", async (id: number) => {
  const response: Hotel[] = await apiGetHotelById(id);
  return response;
});

export const fetchHotelByName = createAsyncThunk("searchHotel", async (name: string) => {
  const response: Hotel[] = await apiSearchHotel(name);
  return response;
});

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    getAllHotels(state) {
      state.searchState = [];
      return state;
    },
    getHotelById(state, action: PayloadAction<number>) {
      return state;
    },
    searchHotel(state, action: PayloadAction<Hotel>) {
      return state;
    },
    clearSearchState(state) {
      state.searchState = [];
      state.hotelDetails = [];
    },
    sortHotels(state, action: PayloadAction<string>) {
      if (state.hotels.length > 0) {
        const sortableArray = [...state.hotels];
        sort(sortableArray, action.payload);
        return {
          ...state,
          hotels: sortableArray,
        };
      }
    },

    filterHotels(state, action: PayloadAction<filterPayload>) {
      const key = action.payload.key;
      // state.tempState = state.hotels;

      if (key === "price") {
        const { minPrice, maxPrice } = action.payload;
        const filteredData = filerByPrice(state.hotels, minPrice!, maxPrice!);
        return {
          ...state,
          tempState: state.hotels,
          hotels: filteredData,
        };
      } else if (key === "distance") {
        const { maxDistance } = action.payload;
        const filteredData = filterByDistance(state.hotels, maxDistance!);
        return {
          ...state,
          tempState: state.hotels,
          hotels: filteredData,
        };
      }
    },
    clearFilters(state) {
      if (state.tempState.length > 0) {
        state.hotels = state.tempState;
        state.tempState = [];
      }
      return state;
    },
    changeLanguage(state, action: PayloadAction<string>) {
      return {
        ...state,
        lang: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.hotels = action.payload;
    });
    builder.addCase(fetchHotelById.fulfilled, (state, action) => {
      state.hotelDetails = action.payload;
    });
    builder.addCase(fetchHotelByName.fulfilled, (state, action) => {
      state.searchState = action.payload;
    });
  },
});

export const {
  getAllHotels,
  getHotelById,
  searchHotel,
  sortHotels,
  filterHotels,
  clearFilters,
  clearSearchState,
  changeLanguage,
} = hotelSlice.actions;

export default hotelSlice.reducer;
