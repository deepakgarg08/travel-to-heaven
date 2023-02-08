import { IParameters} from "./hotel.interface";
import dummyData from "../../data/hotels.json";
import {ResponseObject} from "./hotel.interface";

class HotelService {
    // stores final response result
    private finalResponse: ResponseObject[] = []

    /***
     * Act as starting point
     * accepts path and query params
     * and then filter result based on requestparams
     * return the result according to Result interface
     */
    public async getHotels(requestParams: IParameters) {
 
        return "hello from the Deepak Garg - endpoint...'vi/recruiting/hotels"
        // TODO write logic here
    }
}

export default HotelService;