import { IParameters, Result } from './hotel.interface';
import dummyData from '../../data/hotels.json';
import { ResponseObject } from './hotel.interface';

class HotelService {
    // stores final response result
    private finalResponse: ResponseObject[] = [];

    private async filterHotels(
        requestParams: IParameters
    ): Promise<ResponseObject[]> {
        let { hotelId, lang = 'en-US', search } = requestParams;
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
                const { id, name, address, city, description, minPrice, currencyCode, deals, images, lat, lng } = result;
                responseObject = {
                    id,
                    name: name[lang as keyof typeof name] as string,
                    address: address[
                        lang as keyof typeof address
                    ] as string,
                    city: city[lang as keyof typeof city] as string,
                    description: description[
                        lang as keyof typeof description
                    ] as string,
                    minPrice,
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
            
            return { success: true, error: '', result };
        } catch (error: any) {
            
            throw new Error(error.message);
        }
    }
}

export default HotelService;
