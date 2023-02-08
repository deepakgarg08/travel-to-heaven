import {IParameters, Result} from './hotel.interface';
import dummyData from '../../data/hotels.json';
import {ResponseObject} from './hotel.interface';
import haversineDistance from "haversine-distance";


class HotelService {
    // stores final response result
    private finalResponse: ResponseObject[] = [];

    private calculateHaversineDistance(
        latitude: number,
        longitude: number
    ): number {
        const berlinCordinates: { latitude: number; longitude: number } = {
            latitude: 37.8136,
            longitude: 144.9631,
        };
        const hotelLocation: { latitude: number; longitude: number } = {
            latitude,
            longitude,
        };
        return haversineDistance(berlinCordinates, hotelLocation);
    }

    private getResponseBasedOnlanguage(obj: any, lang: string): string {
        // console.log('lang: ', lang);
        // console.log('obj: ', obj); 
        const languages = ["en-US", "de-DE", "fr-FR", "es-ES"];
        let res: string = obj[lang as keyof typeof obj] as string
        if (res) {
            return res
        }
        for (const language of languages) {
            const result = obj[language as keyof typeof obj] as string
            if (result !== null) {
                return result
            }
        }
        return res
    }

    private async filterHotels(
        requestParams: IParameters
    ): Promise<ResponseObject[]> {
        let {hotelId, lang = 'en-US', search} = requestParams;
        let result;
        this.finalResponse = [];
        let responseObject!: ResponseObject;

        /**
         * GET https://{HOSTNAME}/v1/recruiting/hotels/{HOTEL_ID}
         * this if block considers both hotelId and lang
         */
        if (hotelId) {
            result = await dummyData.find((hotel) => hotel.id === hotelId);

            if (result) {
                const {id, name, address, city, description, minPrice, currencyCode, deals, images, lat, lng} = result;
                const distanceToCenterKm: number = this.calculateHaversineDistance(lat, lng)

                responseObject = {
                    id,
                    name: this.getResponseBasedOnlanguage(name, lang),
                    address: this.getResponseBasedOnlanguage(address, lang),
                    city: this.getResponseBasedOnlanguage(city, lang),
                    description: this.getResponseBasedOnlanguage(description, lang),
                    minPrice,
                    distanceToCenterKm,
                    currencyCode,
                    deals: [{
                        headline: deals.map(deal => deal.headline[lang as keyof typeof deal.headline])[0] || "",
                        details: deals.map(deal => deal.details[lang as keyof typeof deal.details])[0] || ""
                    }],
                    images: [{
                        url: '',
                        caption: ''
                    }]
                };
                this.finalResponse.push(responseObject)
            }

        }

        /**
         *
         * This else if block considers lang provided by user
         * GET https://{HOSTNAME}/v1/recruiting/hotels/{HOTEL_ID}?lang={LANG}
         * GET https://{HOSTNAME}/v1/recruiting/hotels?lang={LANG}
         */

        // else if (lang) {

        //     await dummyData.map(result => {
        //         // TODO
        //     });
        // }

        /**
         *
         * This if block considers search param, if provided by user, else return the result
         * this is case insensitive
         * GET https://{HOSTNAME}/v1/recruiting/hotels?search={SEARCH_TERM}&lang={LANG}
         */
        // if (search) {
        //     // this.finalResponse.filter(item => {});
        // }

        return this.finalResponse;
    }

    /***
     * Act as starting point
     * accepts path and query params
     * and then filter result based on requestparams
     * return the result according to Result interface
     */
    public async getHotels(requestParams: IParameters): Promise<Result> {
        try {
            const result = await this.filterHotels(requestParams);

            return {success: true, error: '', result};
        } catch (error: any) {

            throw new Error(error.message);
        }
    }
}

export default HotelService;
