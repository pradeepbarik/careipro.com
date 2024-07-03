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
    seo_url: string,
    clinic: string,
    place: string,
    city: string,
    clinic_seo_url: string,
    service_location_id: number
}
export type TPopularClinic = {
    banner: string,
    banner_message: string,
    display_location: string,
    clinic_name: string,
    clinic_location: string,
    logo: string | null,
    clinic_seo_url: string
}
export type TSuggestedCity = {
    state: string
    city: string,
    thumbIcon: string
}
export type THomePageData = {
    sections: Array<{ heading: string, name: string }>,
    nearbyCities?: TSuggestedCity[],
    specializations: Array<{ id: number, name: string, icon: string, short_description: string, seo_url: string }>,
    verticals: Array<{ label: string, icons: string, url: string }>,
    popularDoctors: TPopularDoctor[],
    popularClinics: TPopularClinic[],
}