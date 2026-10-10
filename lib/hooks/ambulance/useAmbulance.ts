import { fetchJson, IResponse } from "@/lib/services/http-server";

export type TAmbulanceVehicle = {
    id: number,
    clinic_id: number,
    vehicle_no: string,
    vehicle_type: string,
    title: string,
    photo: string,
    driver_name: string,
    driver_mobile: string,
    base_fare: string,
    per_km_charge: string,
    facilities: string,
    /** json array of {from,to,distance_km,fare,note} */
    service_routes: string,
    available_24x7: number,
}

export type TAmbulanceProvider = {
    id: number,
    name: string,
    mobile: string,
    alt_mob_no: string | null,
    whatsapp_number: string | null,
    location: string,
    city: string,
    locality: string,
    state: string,
    market_name: string,
    logo: string | null,
    rating: number,
    rating_cnt: number | null,
    review_cnt: number | null,
    seo_url: string,
    bid: string | null,
    partner_type: string,
    verified: number,
    /** derived by the api from the provider's fleet */
    categories: string[],
    facilities: string[],
    fleet_size: number,
    base_fare: number,
    available_24x7: number,
    vehicles: TAmbulanceVehicle[],
}

export type TAmbulanceHomePageData = {
    state: string,
    city: string,
    providers: TAmbulanceProvider[],
}

const slug = (value: string) => value.replace(" ", "-").toLowerCase();

/* Same shape as the other verticals: read the json the api wrote, and if it is not there yet ask
   the api to build it, which both returns the data and writes the cache file for the next hit. */
export const fetchAmbulanceHomePageData = async (state: string, city: string): Promise<TAmbulanceHomePageData> => {
    try {
        return await fetchJson<TAmbulanceHomePageData>(`/cache/${slug(state)}/${slug(city)}/ambulance-home-page.json`);
    } catch (err: any) {
        try {
            const { data } = await fetchJson<IResponse<TAmbulanceHomePageData>>(
                `/init-cache/ambulance-home-page-data?state=${slug(state)}&city=${slug(city)}`
            );
            return data;
        } catch (e: any) {
            /* the hero, the ambulance type guide and the 108 number still render, which is the part
               that matters in an emergency, so a failed listing is empty rather than fatal */
            return { state, city, providers: [] };
        }
    }
}

/* The city cache already carries every provider together with its vehicles, which is everything a
   detail page shows, so this reads that one file instead of adding a second cache to keep in step.
   A city holds a handful of ambulance providers, not thousands, so the scan is cheap. */
export const fetchAmbulanceProvider = async (state: string, city: string, provider_id: number): Promise<TAmbulanceProvider | null> => {
    const { providers } = await fetchAmbulanceHomePageData(state, city);
    return providers.find((p) => Number(p.id) === Number(provider_id)) || null;
}
