import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAllHotels } from "../helpers/apiRequests";
import type { PayloadAction } from "@reduxjs/toolkit";

export type image = {
  url: string;
  caption: string;
};

export type deal = {
  headline: string;
  details: string;
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
}

const hotels: Hotel[] = [];
let searchState: Hotel[] = [];
let lang: string = "en-US";
let hotelDetails: Hotel[] = [];

const initialState: InitialState = {
  lang,
  hotels,
  searchState,
  hotelDetails,
};

//thunks
export const fetchHotels = createAsyncThunk("fetchHotels", async (lang: string) => {
  const response: Hotel[] = await apiGetAllHotels(lang);
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

  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotels.fulfilled, (state, action) => {
      state.hotels = action.payload;
    });
  },
});



export const {
  getAllHotels,
} = hotelSlice.actions;
export default hotelSlice.reducer;