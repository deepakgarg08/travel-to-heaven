import axios from "axios";
import store from "../store/store";

const URL = process.env.REACT_APP_BASE_URL;

export const apiGetAllHotels = async (language: string = "en-US") => {
  try {
    const response = await axios.get(`${URL}?lang=${language}`);
    if (response?.data?.success) {
      return response.data.result;
    }
  } catch (err) {
    console.error(err);
  }
};

export const apiSearchHotel = async (name: string) => {
  try {
    const language: string = store.getState().hotels.lang;
    const response = await axios.get(`${URL}?search=${name}&lang=${language}`);
    if (response?.data?.success) {
      return response.data.result;
    }
  } catch (err) {
    console.error(err);
  }
};

export const apiGetHotelById = async (id: number) => {
  try {
    const language: string = store.getState().hotels.lang;
    const response = await axios.get(`${URL}/${id}?lang=${language}`);
    if (response?.data?.success) {
      return response.data.result;
    }
  } catch (err) {
    console.error(err);
  }
};