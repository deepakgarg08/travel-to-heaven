export interface RawData {
  id: number
  minPrice: number
  currencyCode: string
  countryCode: string
  name: Name
  address: Address
  city: City
  description: Description
  benefits: Benefit[]
  deals: Deal[]
  images: Image[]
  lat: number
  lng: number
}

export interface Name {
  "en-US": string
  "es-ES"?: string
  "de-DE"?: string
  "fr-FR"?: string
  "sp-SP"?: string
}

export interface Address {
  "en-US": string
  "es-ES"?: string
  "de-DE"?: string
  "fr-FR"?: string
  "sp-SP"?: string
}

export interface City {
  "en-US": string
  "de-DE"?: string
  "es-ES"?: string
  "fr-FR"?: string
}

export interface Description {
  "de-DE"?: string
}

export interface Benefit {
  text: Text
}

export interface Text {
  "de-DE": string
  "fr-FR": string
  "es-ES": string
  "en-US": string
}

export interface Deal {
  expireTime: string
  headline: Headline
  details: Details
}

export interface Headline {
  "de-DE": string
  "es-ES": string
  "fr-FR": string
  "en-US"?: string
}

export interface Details {
  "de-DE": string
  "es-ES": string
  "fr-FR": string
  "en-US"?: string
}

export interface Image {
  url: string
  caption: Caption
}

export interface Caption {
  "de-DE"?: string
  "en-US"?: string
}
