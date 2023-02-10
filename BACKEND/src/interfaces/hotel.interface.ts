export interface ResponseObject {
    id: number;
    name: string;
    address: string;
    city: string;
    description: string;
    minPrice: number;
    currencyCode: string;
    distanceToCenterKm: number;
    firstDeal?: {
        headline: string;
        details: string;
    };
    firstImage?: {
        url: string;
        caption: string;
    };

    deals?: {
        headline: string;
        details: string;
    }[];

    images?: {
        url: string;
        caption: string;
    }[];
}
export interface Result {
    success: boolean;
    error: string;
    result: Array<ResponseObject>;
}

export interface IParameters {
    hotelId: number;
    lang: string;
    search: string;
}

export interface IDeals {
    headline: string;
    details: string;
}

export interface IImages {
    url: string;
    caption: string;
}
