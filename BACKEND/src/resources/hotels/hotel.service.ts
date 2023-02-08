import {IDeals, IImages, IParameters, Result} from './hotel.interface';
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

    private getResponseBasedOnlanguage(obj: object, lang: string): string {
        if (Object.keys(obj).length === 0) {
            return ""
        }
        let res!: string
        const languages = ["en-US", "de-DE", "fr-FR", "es-ES"];
        res = obj[lang as keyof typeof obj] as string || ""
        if (res) {
            return res
        }
        for (const language of languages) {
            const result = obj[language as keyof typeof obj] as string || ""
            if (result !== '') {
                return result
            }
        }
        return res
    }

    private parseDeals(data: any[], lang: string): IDeals[] {
        if (data.length < 1) {
            return [{
                headline: '',
                details: ''
            }]
        }
        const res = data.map(deal => {
            let headline: string = this.getResponseBasedOnlanguage(deal.headline, lang)
            let details: string = this.getResponseBasedOnlanguage(deal.details, lang)

            let container = {
                headline,
                details
            }
            return container
        })
        return res
    }

    private parseImages(data: any[], lang: string): IImages[] {
        if (data.length < 1) {
            return [{
                url: '',
                caption: ''
            }]
        }
        const res = data.map(image => {
            const url = image.url || ""
            const caption = this.getResponseBasedOnlanguage(image.caption, lang)
            let container = {
                url,
                caption
            }
            return container
        })
        return res
    }

    private async filterHotels(
        requestParams: IParameters
    ): Promise<ResponseObject[]> {
        let {hotelId, lang = 'en-US', search} = requestParams;
        let result;
        this.finalResponse = [];

        /**
         * GET https://{HOSTNAME}/v1/recruiting/hotels/{HOTEL_ID}
         * this if block considers both hotelId and lang
         */
        if (hotelId) {

            result = await dummyData.find((hotel) => hotel.id === hotelId);

            if (result) {
                const {id, name, address, city, description, minPrice, currencyCode, deals, images, lat, lng} = result;
                const distanceToCenterKm: number = this.calculateHaversineDistance(lat, lng)
                let tempResponse = {
                    id,
                    minPrice,
                    currencyCode,
                    distanceToCenterKm,
                    name: this.getResponseBasedOnlanguage(name, lang),
                    address: this.getResponseBasedOnlanguage(address, lang),
                    city: this.getResponseBasedOnlanguage(city, lang),
                    description: this.getResponseBasedOnlanguage(description, lang),
                    deals: this.parseDeals(deals, lang),
                    images: this.parseImages(images, lang)
                };
                this.finalResponse.push(tempResponse)
            }

        }

        /**
         *
         * This else if block considers lang provided by user
         * GET https://{HOSTNAME}/v1/recruiting/hotels/{HOTEL_ID}?lang={LANG}
         * GET https://{HOSTNAME}/v1/recruiting/hotels?lang={LANG}
         */

        else if (lang) {
            this.finalResponse = await dummyData.map(hotel => {
                let container!: ResponseObject; // TODO remove any
                const {id, name, address, city, description, minPrice, currencyCode, deals, images, lat, lng} = hotel;
                const distanceToCenterKm: number = this.calculateHaversineDistance(lat, lng)
                container = {
                    id,
                    minPrice,
                    currencyCode,
                    distanceToCenterKm,
                    name: this.getResponseBasedOnlanguage(name, lang),
                    address: this.getResponseBasedOnlanguage(address, lang),
                    city: this.getResponseBasedOnlanguage(city, lang),
                    description: this.getResponseBasedOnlanguage(description, lang),
                    firstDeal: this.parseDeals(deals, lang)[0] || "",
                    firstImage: this.parseImages(images, lang)[0] || ""
                }
                return container
            })
        }

        /**
         *
         * This if block considers search param, if provided by user, else return the result
         * this is case insensitive
         * GET https://{HOSTNAME}/v1/recruiting/hotels?search={SEARCH_TERM}&lang={LANG}
         */
        if (search) {
            this.finalResponse = this.finalResponse.filter(item => {
                return (item.name.toLowerCase()).includes(search.toLowerCase())
            })
        }

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
