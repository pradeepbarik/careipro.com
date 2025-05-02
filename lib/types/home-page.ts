import { TPopularClinic } from "./clinic"

export type TPopularDoctor = {
    id: number
    name: string,
    email: string
    mobile: string,
    gender: string,
    image: string,
    position: string,
    rating: string,
    experience: number,
    specialization:string|null,
    seo_url: string,
    clinic_id:number,
    market_name:string,
    clinic: string,
    place: string,
    city: string,
    state:string,
    clinic_seo_url: string,
    service_location_id: number,
    availability:string,
}
export type TSuggestedCity = {
    state: string
    city: string,
    thumbIcon: string
}
export type TSpecility = {
    id: number, name: string, icon: string, short_description: string, seo_url: string
}
export type THomePageData = {
    sections: Array<{ heading: string, name: string,viewType?:string,itemViewType?:string,specialist_ids?:number[] }>,
    nearbyCities?: TSuggestedCity[],
    specializations: Record<number,TSpecility>,
    verticals: Array<{ label: string, icons: string, url: string }>,
    popularDoctors: TPopularDoctor[],
    popularClinics: TPopularClinic[],
    doctorCategory?: Array<{
        name: string,
        bgColor: string,
        image: string,
        url: string,
        btnText: string
    }>,
    petCareInfo:Array<{
      banner: string,
      url: string
    }>
}