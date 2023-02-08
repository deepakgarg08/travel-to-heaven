import {IDeals, IImages, IParameters, Result} from "../../interfaces/hotel.interface";
import dummyData from "../../data/hotels.json";
import {ResponseObject} from "../../interfaces/hotel.interface";
import haversineDistance from "haversine-distance";

class HotelService {
    // stores final response result
    private finalResponse: ResponseObject[] = []

    private calculateHaversineDistance(
        latitude: number,
        longitude: number
    ): number {
        let haversineDist!: number;
        try {
            const berlinCordinates: { latitude: number; longitude: number } = {
                latitude: 37.8136,
                longitude: 144.9631,
            };
            const hotelLocation: { latitude: number; longitude: number } = {
                latitude,
                longitude,
            };
            haversineDist = haversineDistance(berlinCordinates, hotelLocation);
        } catch (error) {
            throw new Error("Haversine Distance calculation failed")
        }
        return haversineDist;
    }

    /**
     * Handles language fallbacks
     * this gets different types of object values, which can have different structure
     */

    private getResponseBasedOnlanguage(obj: object, lang: string): string {
        if (Object.keys(obj).length === 0) {
            return ""
        }
        let res!: string
        const languages = ["en-US", "de-DE", "fr-FR", "es-ES"];
        res = obj[lang as keyof typeof obj] as string || ""
        if (res) return res

        for (const language of languages) {
            const result = obj[language as keyof typeof obj] as string || ""
            if (result !== '') {
                return result
            }
        }
        return res
    }

    /**
     * structure deals object array based on IDeals interface
     */
    private parseDeals(data: { headline: {}, details: {} }[], lang: string): IDeals[] {
        if (data.length < 1) {
            return [{
                headline: '',
                details: ''
            }]
        }
        return data.map(dl => {
            let headline: string = this.getResponseBasedOnlanguage(dl.headline, lang)
            let details: string = this.getResponseBasedOnlanguage(dl.details, lang)
            return {headline, details}
        })

    }

    /**
     * structure images object array based on IImages interface
     */
    private parseImages(data: { url: string, caption: {} }[], lang: string): IImages[] {
        if (data.length < 1) {
            return [{
                url: '',
                caption: ''
            }]
        }
        return data.map(image => {
            const url = image.url || ""
            const caption: string = this.getResponseBasedOnlanguage(image.caption, lang)
            return {url, caption}
        })

    }

    /**
     * create final ResponseObject
     */
    private buildResponseObject(result: any, lang: string, isHotelId: boolean): ResponseObject {
        try {
            const {id, name, address, city, description, minPrice, currencyCode, deals, images, lat, lng} = result;
            const distanceToCenterKm: number = this.calculateHaversineDistance(lat, lng)
            let respObj: ResponseObject =
                {
                    id,
                    minPrice,
                    currencyCode,
                    distanceToCenterKm,
                    name: this.getResponseBasedOnlanguage(name, lang),
                    address: this.getResponseBasedOnlanguage(address, lang),
                    city: this.getResponseBasedOnlanguage(city, lang),
                    description: this.getResponseBasedOnlanguage(description, lang),
                }
            if ( isHotelId ) {
                respObj.deals = this.parseDeals(deals, lang)
                respObj.images = this.parseImages(images, lang)
            } else {
                respObj.firstDeal = this.parseDeals(deals, lang)[0] || ""
                respObj.firstImage = this.parseImages(images, lang)[0] || ""
            }
            return respObj
        } catch (error: any) {
            throw new Error("Something went wrong: " + error.message)
        }


    }


    /**
     * This below request will filterHotels basesd on path params and query params provided by user
     * If none is provided, by default fallback language value is used as "en-us" to get hotel list
     *
     * Here async await is not required, just kept for the purpose of when using Database in future
     */

    private async filterHotels(requestParams: IParameters): Promise<ResponseObject[]> {

        let {hotelId, lang = "en-US", search} = requestParams;
        let result;
        this.finalResponse = []
        let isHotelId = true
        /**
         * GET https://{HOSTNAME}/v1/recruiting/hotels/{HOTEL_ID}?lang={LANG}
         * this if block considers both hotelId and lang
         */
        if (hotelId) {
            result = await dummyData.find((hotel) => hotel.id === hotelId);

            if (result) {
                const tempResponse = this.buildResponseObject(result, lang, isHotelId)
                this.finalResponse.push(tempResponse)
            }
        }

        /**
         *
         * This else if block considers lang provided by user, if not using default fallback language set "en-US"
         * in other words this will always run
         * GET https://{HOSTNAME}/v1/recruiting/hotels/{HOTEL_ID}?lang={LANG}
         * GET https://{HOSTNAME}/v1/recruiting/hotels?lang={LANG}
         */
        else if (lang) {
            this.finalResponse = await dummyData.map(result => {
                return this.buildResponseObject(result, lang, !isHotelId)
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

        return this.finalResponse
    }

    /***
     * Act as starting point
     * accepts path and query params
     * and then filter result based on requestparams
     * return the result according to Result interface
     */
    public async getHotels(requestParams: IParameters): Promise<Result> {
        try {
            const result = await this.filterHotels(requestParams)
            return {success: true, error: "", result};
        } catch (error: any) {
            console.error('error: ', error.message);
            throw new Error(error.message);
        }
    }
}

export default HotelService;
